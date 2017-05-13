import ValidationButton from './validation_button'
import React from 'react'
import GoogleLogin from 'react-google-login'


export default class LoginBox extends React.Component {

  constructor(props) {
    super(props)
    this.processLogin = this.processLogin.bind(this)
  }

  processLogin( googleResponse ) {
    this.props.requestNonceFromServer( googleResponse, "/" )
  }

  render() {
   return (
    <div>
      <GoogleLogin
        clientId="490447248487-367u8f0drevjtgajlslp4inc8ch2s8f0.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={ this.processLogin }
        onFailure={ this.props.rejectLogin }
      />
    </div>
   )
  }
}
