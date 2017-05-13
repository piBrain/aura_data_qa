const configs = {
  development: {
    apiUrl: 'http://localhost:4200',
  },
  production: {
    apiUrl: 'https://2dusz11q81.execute-api.us-east-1.amazonaws.com/prod',
  },
}
let { NODE_ENV } = process.env || { 'NODE_ENV': 'development' }

if(typeof NODE_ENV === 'undefined') {
  NODE_ENV = 'development'
}

console.log(NODE_ENV)
module.exports = configs[NODE_ENV]
