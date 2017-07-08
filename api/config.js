const configs = {
  local: {
    DATABASE_URL: 'postgres://127.0.0.1:5432/aura_qa_development',
    GOOGLE_CLIENT_ID: '490447248487-367u8f0drevjtgajlslp4inc8ch2s8f0.apps.googleusercontent.com',
    GSUITE_DOMAIN: 'pibrain.io',
    PB_DOMAIN: 'http://localhost:4200',
    LISTEN_PORT: '4200',
    AWS_ACCESS_KEY_ID: 'AKIAJMMUKXNKT7GKGOWQ',
    AWS_SECRET_KEY: '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',
    S3_BUCKET_NAME: 'pibrain.dev.general',
    SENDGRID_API_KEY: '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',
    SENDGRID_NEWSLETTER_LIST_ID: '1570751',
    TWILIO_AUTH_TOKEN: 'a338f496c1d52cde98d98492e1fa9cba',
    TWILIO_ACCOUNT_SID: 'ACf6ed1d4c46b1d094ca9c827fb38f28e2',
    TWILIO_PHONE_NUMBER: '+12083141596',
  },
}

const { NODE_ENV } = process.env

module.exports = () => {
  process.env = Object.assign(process.env, configs[NODE_ENV])
}
