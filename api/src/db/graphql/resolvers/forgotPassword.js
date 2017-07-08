import db from '../../sequelize/models/db_connection'
import shortId from 'shortid'
import { mailClient, emailDefaults } from '../../../lib/mail_client'
import txtMessageClient from '../../../lib/txt_message_client'

const executeForgotPassword = ({ nonce, secQuestionResponse1, secQuestionResponse2 }) => {
  console.log('executeForgotPassword')
  const date = new Date()
  return db.Session.findOne( { where: { nonce } } ).then((session) => {
    if(!session) { return { err: true, response: "Whoops something went wrong." } }
    const prevDate = new Date(session.lastPasswordResetAttempt)
    if(prevDate.setDate(prevDate.getDate()+1) <= date) {
      session.set('passwordResetAttempts', 0)
    }
    if(session.passwordResetAttempts >= 3) { return { err: true, response: "Sorry. You have exceeded the maximum reset attempts allowed. Please try again in a few hours." }  }
    session.set('passwordResetAttempts', session.passwordResetAttempts+1)
    session.set('lastPasswordResetAttempt', date)
    return session.save().then(() => {
      return verifyAndEmailUser(session.suppliedResetEmail, secQuestionResponse1, secQuestionResponse2)
    })
  })
}

const verifyAndEmailUser = (email, secQuestionResponse1, secQuestionResponse2) => {
  return db.User.findOne(
    {
      where: {
        $and: {
          email,
          secQuestionResponse1,
          secQuestionResponse2,
        }
      },
    },
  ).then(async (user) => {
    if(!user) { return { err: false, response: 'Sorry that doesn\'t seem to match up.' } };
    const resetToken = shortId.generate()
    const expiryDate = new Date()
    user.set('locked', true)
    user.set('inPasswordReset', true)
    user.set('resetToken', resetToken)
    user.set('resetExpiry', expiryDate.setDate(expiryDate.getDate()+1))
    await txtMessageClient.sendMessage(`Your Aura password reset token is: ${resetToken}`, user.phoneNumber)
    return user.save().then(() => {
      return { err: false, response: `A text with a reset code has been sent to the number ending in ${user.phoneNumber.substring(7)}` }
    })
  }).catch((err) => {
    console.error(err)
    return { err: true, response: 'Whoops something went wrong.' }
  })
}

const forgotPassword = (_, args, context) => {
  console.log('forgotPassword')
  return executeForgotPassword(args)
}


export default forgotPassword
