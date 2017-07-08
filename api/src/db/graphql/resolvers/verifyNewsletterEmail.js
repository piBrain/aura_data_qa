import { mailClient, emailDefaults } from '../../../lib/mail_client'

const executeVerifyNewsletterEmail = async ({ url, timestamp, email, firstName, lastName  }) => {
  let resendUrl = `${url}?resend=true&type=newsletterSignUp&email=${email}&firstName=${firstName}&lastName=${lastName}`
  if((new Date()) > (new Date(timestamp))) {
    return { err: false, response: `Sorry, the link has expired. Click <a href=${resendUrl}>here</a> to resend.`, }
  }
  try { await mailClient.addNewContact({email: email, first_name: firstName, last_name: lastName, }, process.env.SENDGRID_NEWSLETTER_LIST_ID ) }
  catch(err) {
    if(Array.isArray(err)) {
      return handleErrArray(err)
    } else {
      return handleHttpOrStandardError(err)
    }
  }
  return { err: false, response: `Thank you for verifying your email!` }
}

const handleErrArray = (errs) => {
  const errMessages = errs.map((err) => err.message)
  console.error(errMessages)
  return { err: true, response: errMessages }
}

const handleHttpOrStandardErrors = (err) => {
  if(err.response) {
    console.error(err.message, err.response.status, err.response.body, err.response.headers)
  } else {
    console.error(err.message)
  }
  return { err: true, response: err.message }
}

const verifyNewsletterEmail = (_, args, context) => {
  console.log('verifyNewsletterEmail')
  return executeVerifyNewsletterEmail(args)
}

export default verifyNewsletterEmail
