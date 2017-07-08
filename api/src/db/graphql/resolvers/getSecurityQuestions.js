import db from '../../sequelize/models/db_connection'

const executeGetSecurityQuestions = async ({ email, nonce }) => {
  try {
    var user = await db.User.findOne(
      {
        where: { email },
        attributes: ['secQuestion1', 'secQuestion2']
      }
    )
  } catch(err) { return { err: true, response: err.message, data: {}} }
  if(!user) { return { err: true, response: 'We couldn\'t find a user with that email.', data: {}} }
  try {
    var session = await db.Session.findOne(
      {
        where: { nonce: nonce }
      }
    )
  } catch(err) {
    return { err: true, response: err.message, data: {} }
  }
  session.set('suppliedResetEmail', email)
  return session.save().then(() => {
    return { err: false, response: '', data: { secQuestion1: user.secQuestion1, secQuestion2: user.secQuestion2 } }
  }).catch((err) => {
    return { err: true, response: err.message, data: {} }
  })
}

const getSecurityQuestions = (_, args, context) => {
  console.log('getSecurityQuestions')
  return executeGetSecurityQuestions(args)
}

export default getSecurityQuestions
