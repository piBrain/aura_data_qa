import db from '../../sequelize/models/db_connection'


async function authHandler(context, callback, callback_args) {
  const session = await db.Session.findOne({ where: { nonce: context.token } })
  if( session == null ) {
    console.log('no session found - skipping execution')
    return
  }
  const user = await db.User.findOne({ where: { id: session && session.user_id } })
  if ( typeof user === "undefined" || user == null) {
    console.log('no user found - skipping execution')
    return
  }
  return callback({...callback_args, userId: user.id })
}


export default authHandler
