const configs = {
  local: {
    DATABASE_URL: 'postgres://127.0.0.1:5432/aura_qa_development',
    GOOGLE_CLIENT_ID: '490447248487-367u8f0drevjtgajlslp4inc8ch2s8f0.apps.googleusercontent.com',
    GSUITE_DOMAIN: 'pibrain.io',
    LISTEN_PORT: '4200',
    AWS_ACCESS_KEY_ID: 'AKIAJMMUKXNKT7GKGOWQ',
    AWS_SECRET_KEY: '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',
    S3_BUCKET_NAME: 'pibrain.dev.general'
  },
}

const { NODE_ENV } = process.env

module.exports = () => {
  process.env = Object.assign(process.env, configs[NODE_ENV])
}
