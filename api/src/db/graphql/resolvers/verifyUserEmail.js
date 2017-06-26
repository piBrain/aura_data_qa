import db from '../../sequelize/models/db_connection'

const executeVerifyUserEmail = async ({ nonce, url }) => {
  try {
    var user = await db.User.findOne(
      { where: { activationNonce: nonce } },
    )
  } catch(err) { return { err: true, response: err.message } }
  let resendUrl = `${url}?verify=${nonce}&resend=true&type=userSignUp`
  if(!user) { return { err: false, response: 'Whoops, something went wrong.', noUser: true } }
  if(user.active) { return { err: false, response: "User already verified. Click <a href='pibrain.io'>here</a> to login.", noUser: false } }
  if((new Date()) > (new Date(user.activationExpiry))) {
    return { err: false, response: `Sorry, the link has expired. Click <a href=${resendUrl}>here</a> to resend.`, noUser: false }
  }
  user.set('active', true)
  try { await user.save() }
  catch(err) { return { err: true, response: err.message } }
  return { err: false, response: `Thank you for verifying your email! Click <a href=${process.env.PB_DOMAIN}>here</a> to login.` }
}

const verifyUserEmail = (_, args, context) => {
  console.log('verifyUserEmail')
  return executeVerifyUserEmail(args)
}

export default verifyUserEmail
