import twilio from 'twilio'

let configuredClient = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
const sendMessage = (body, to) => {
  return configuredClient.messages.create({
    body,
    to,
    from: `${process.env.TWILIO_PHONE_NUMBER}`
  })
}

const txtMessageClient = { sendMessage }

export default txtMessageClient
