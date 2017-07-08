import db from '../../sequelize/models/db_connection'
import authHandler from './authHandler'
import shortId from 'shortid'
import { mailClient, emailDefaults } from '../../../lib/mail_client'

const executeSignUpUser = (args) => {
  console.log('executeSignUpUser')
  let nonce = shortId.generate()
  let date = new Date()
  date.setHours(date.getHours()+1)
  return db.User.findOrCreate(
    {
      where: {
        $or: {
          activationNonce: nonce,
          email: args.email
        }
      },
      defaults: {
        ...args,
        active: false,
        activationNonce: nonce,
        activationExpiry: date,
      }
    },
  ).then(async (users, newRecord) => {
    let user = users[0]
    if(user.active) {
      return { err: true, response: 'There is already an active user with that email.' }
    }
    if(!newRecord) {
      user.set('activationExpiry', date)
      user.set('activationNonce', nonce)
    }
    return user.save().then( async () => {
      return await sendMail(args.url, args.email, nonce)
    }).catch((err) => {
      return { err: true, response: err.message }
    })
  }).catch((err) => {
    console.error(`SEQUELIZE ERROR ${err}`)
    return { err: true, response: err.message }
  })
}

const sendMail = async (preUrl, email, nonce) => {
  try {
    let url = preUrl + `?verify=${nonce}`
    let sent = await mailClient.sendMail(mailClient.createMail({
      ...emailDefaults,
      to: email,
      subject: 'Verify Aura User Account',
      content: `Please click <a href=${url}>here</a> to verify your account and finish signing up. <br />Or copy and paste: ${url} into your address bar on your browser.<br/>If you did not sign-up for please contact us at aura+support@pibrain.io`,
      customArgs: { type: 'auraUserSignUpConfirmation' },
    }, true))
    return { err: false, response: `An email has been sent to ${email}, please click the link to confirm your account. It will expire 1 hour from now.` }
  } catch(err) {
    console.log(err)
    console.log(err.message, err.response.status, err.response.body, err.response.headers)
    return { err: true, response: err.message }
  }
}

const signUpUser = (_, args, context) => {
  console.log('signUpUser')
  return executeSignUpUser(args)
}


export default signUpUser
