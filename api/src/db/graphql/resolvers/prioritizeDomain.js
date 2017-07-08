import db from '../../sequelize/models/db_connection'
import authHandler from './authHandler'

const executePrioritizeDomain = ({ domain }) => {
  console.log('executePrioritizeDomain')
  const domainLike = { $like: `%${domain}%` }
  return db.Site.update(
    { priority_domain: true },
    { where:
      { $or: [
        { url: domainLike },
      ]},
    },
  ).then((something) => {
    console.log('SEQUELIZE RESPONSE', something)
    return `${something[0]} site samples prioritized for domain "${domain}"`;
  }).catch((err) => {
    console.error(`SEQUELIZE ERROR ${err}`)
  })
}

const prioritizeDomain = (_, args, context) => {
  console.log('prioritizeDomain')
  return authHandler(context, executePrioritizeDomain, args)
}


export default prioritizeDomain
