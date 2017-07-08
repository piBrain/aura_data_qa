import { mail } from 'sendgrid'
import sendgrid from 'sendgrid'

let configuredClient = sendgrid(process.env.SENDGRID_API_KEY)

const createMail = ({ from, to, subject, content, customArgs }, html=false) => {
  let mailFrom = new mail.Email(from)
  let mailTo = new mail.Email(to)
  let type = html == false ? 'text/plain' : 'text/html'
  let mailContent = new mail.Content(type, content)
  let mailObject = new mail.Mail(mailFrom, subject, mailTo, mailContent)
  for(let key of Object.keys(customArgs)) {
    mailObject.addCustomArg(new mail.CustomArgs(key, customArgs[key]))
  }
  return mailObject
}

const addNewContact = (fields, listId=null) => {
  let request = configuredClient.emptyRequest({
    method: 'POST',
    path: '/v3/contactdb/recipients',
    body: [fields]
  });

  return configuredClient.API(request).then( async (response) => {
    if(listId == null) { return };
    if(response.body.error_count > 0) { throw response.body.errors }
    let contactId = response.body.persisted_recipients[0];
    let request = configuredClient.emptyRequest({
      method: 'POST',
      path: '/v3/contactdb/lists/' + listId + '/recipients/' + contactId,
      body: [fields]
    });

    try {
      return await configuredClient.API(request)
    } catch(err) {
      console.log(response.statusCode)
      console.log(response.body)
      console.log(response.headers)
    }
  })
}

const sendMail = (mail) => {
  let request = configuredClient.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  })
  return configuredClient.API(request)
}

export const mailClient = { createMail, sendMail, addNewContact }

export const emailDefaults = {
  from: 'aura@pibrain.io'
}
