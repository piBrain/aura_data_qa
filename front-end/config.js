const configs = {
  local: {
    apiUrl: 'http://127.0.0.1:4200',
  },
  production: {
    apiUrl: 'https://2dusz11q81.execute-api.us-east-1.amazonaws.com/prod',
  },
}

const { NODE_ENV } = process.env

module.exports = () => (configs[NODE_ENV])
