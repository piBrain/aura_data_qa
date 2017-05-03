import db from '../../sequelize/models/db_connection'
import authHandler from './authHandler'



const executePrioritizeDomain = ({ domain }) => {
  console.log('executePrioritizeDomain')
  const domainLike = { $like: `%${domain}%` }
  return db.RequestDatum.update(
    { prioritized: true },
    { where:
      { $or: [
        { found_at: domainLike },
        { parsed_request: domainLike },
      ]},
    },
  ).then((something) => {
    console.log('SEQUELIZE RESPONSE', something)
    return `${something[0]} request samples prioritized for domain "${domain}"`;
  }).catch((err) => {
    console.log(`SEQUELIZE ERROR ${err}`)
  })
}

const prioritizeDomain = (_, args, context) => {
  console.log('prioritizeDomain')
  return authHandler(context, executePrioritizeDomain, args)
}


export default prioritizeDomain
