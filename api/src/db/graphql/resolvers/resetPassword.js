import db from '../../sequelize/models/db_connection'
import { mailClient, emailDefaults } from '../../../lib/mail_client'

const executeResetPassword = ({ nonce, resetToken, newPassword }) => {
  console.log('executeResetPassword')
  return db.User.findOne({
    where: { resetToken, locked: true, inPasswordReset: true }
  }).then(async (user) => {
    if(!user) { return { err: true, response: 'Incorrect code entered, please try again.' } }
    clearResetMetaUser(user)
    const expired = isExpired(user.get('resetExpiry'))
    if(!expired) { user.set('password', newPassword) }
    return user.save().then( async () => {
      return processSave(nonce, expired)
    }).catch((err) => {
      if(err.name == 'SequelizeValidationError') {
        return { err: true, response: err.errors.map((error) => error.message) }
      }
      console.error(err)
      return { err: true, response: 'Whoops something went wrong.' }
    })
  }).catch((err) => {
    console.error(err)
    return { err: true, response: err.message }
  })
}

const processSave = async (nonce, isExpired) => {
  try {
    await clearSessionPasswordResetMetaData(nonce)
  } catch(err) {
    console.error(err)
  }
  if(isExpired) {
    return { err: true, response: 'The password reset has expired please try the process again if you still need to reset your password.' }
  } else {
    try {
      // await sendMail(user.email)
    } catch(err) {
      console.error(err)
    }
    return { err: false, response: 'Success! Please try logging in.' }
  }
}

const isExpired = (expiry) => {
  const currentTimestamp = new Date()
  const expiryTimestamp = new Date(expiry)
  return currentTimestamp > expiryTimestamp
}

const clearResetMetaUser = (user) => {
  user.set('locked', false)
  user.set('inPasswordReset', false)
  user.set('resetToken', null)
  user.set('resetExpiry', null)
}

const sendMail = async (email) => {
  try {
    const sent = await mailClient.sendMail(mailClient.createMail({
      ...emailDefaults,
      to: email,
      subject: 'Your password has been reset.',
      content: 'Just letting you know your account has had its password reset. If this was not you, please contact support+aura@pibrain.io.',
      customArgs: { type: 'passwordResetNotification' }
    }))
  } catch(err) {
    console.log(err)
    console.log(err.message, err.response.status, err.response.body, err.response.headers)
    throw 'Sending mail failed.'
  }
}

const clearSessionPasswordResetMetaData = (nonce) => {
  return db.Session.findOne( { where: { nonce } } ).then((session) => {
    if(!session) { throw 'Session not found.' }
    session.set('passwordResetAttempts', 0)
    session.set('suppliedResetEmail', null)
    session.save()
  })
}

const resetPassword = (_, args, context) => {
  console.log('resetPassword')
  return executeResetPassword(args)
}

export default resetPassword
