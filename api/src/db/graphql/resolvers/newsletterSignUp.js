import { mailClient, emailDefaults } from '../../../lib/mail_client'

const executeNewsletterSignUp = async ({ url, email, firstName, lastName }) => {
  const date = new Date()
  date.setHours(date.getHours()+1)
  const resendUrl = url + `?email=${email}&firstName=${firstName}&lastName=${lastName}&expiryTime=${date}`
  try {
    await mailClient.sendMail(mailClient.createMail({
      from: 'content@pibrain.io',
      to: email,
      subject: 'Confirm piBrain Newsletter Signup',
      content: `Please click <a href=${resendUrl}>here</a> to confirm your newsletter subscription. <br />If you did not sign-up for this please contact us at support@pibrain.io`,
      customArgs: { type: 'newsLetterSignupConfirmation' }
    }, true))
    return { err: false, response: 'Success! Please check your e-mail to confirm your subscription to the piBrain newsletter, it will expire in 1 hour.' }
  } catch(err) {
    console.log(err.message, err.response.status, err.response.body, err.response.headers)
    return { err: true, response: err.message }
  }
}

const newsletterSignUp = (_, args, context) => {
  console.log('newsLetterSignUp')
  return executeNewsletterSignUp(args)
}

export default newsletterSignUp
