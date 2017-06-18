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
  return await s3.listObjects({Bucket: process.env.S3_BUCKET_NAME, Prefix: "datasets/cleaned.data/"}).promise()
}

async function importData(objectList) {
  try {
    for (let obj of objectList.Contents) {
      let data = await s3.getObject({ Bucket: process.env.S3_BUCKET_NAME, Key: obj.Key}).promise()
      console.log(obj.Key)
      let body = data.Body
      let dataLines = body.toString().split('\n')
      dataLines.pop()
      let jsonLines = dataLines.map((row) => JSON.parse(row.trim()))
      for (let line of jsonLines) {
        try {
          await db.Site.upsert({ url: line['api_url'], quantcast_rank: 0})
        }
        catch(err) {
          console.log(err)
        }
      }
    }
  }
  catch(err) {
    console.log(err)
  }
}

export function runImport() {
  listObjects().then((objects) => {
    importData(objects)
      .then(() => console.log('Finished.'))
      .catch((err) => console.error(err))
  }).catch((err) => {
    console.error(err)
  })
}
