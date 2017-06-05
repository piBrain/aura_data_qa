const { NODE_ENV } = process.env
import config from '../config'

config()

import AWS from 'aws-sdk';
import db from './db/sequelize/models/db_connection'

class FailedImport extends Error {
  constructor(message) {
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
  }
}
var s3 = new AWS.S3()
async function listObjects() {
  return await s3.listObjects({Bucket: process.env.S3_BUCKET_NAME}).promise().then((data) => {
    return data;
  }).catch((err) => {
    console.error(err)
    return []
  })
}

function importData(objectList) {
  objectList.Contents.forEach((obj) => {
    try {
      s3.getObject({ Bucket: process.env.S3_BUCKET_NAME, Key: obj.Key}, (err, data) => {
        if(err) {
          throw new FailedImport(err)
        }
        let body = data.Body
        let dataLines = body.toString().split('\n')
        dataLines.forEach((line) => {
          try {
            let jsonifiedLine = JSON.parse(line)
            db.Site.upsert({ url: jsonifiedLine['api_url'], quantcast_rank: 0})
          } catch(e) {
            console.error(e.message)
            return
          }
        })
      })
    }
    catch(e) {
      console.log(e.message)
      return
    }
  })
}
listObjects().then((objects => {
  importData(objects)
}))




