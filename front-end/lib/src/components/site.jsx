import React from 'react'
import { FormGroup,ControlLabel,FormControl } from 'react-bootstrap'
import {
  siteStyle,
  docBox
} from '../qa_styles'

export default class Site extends React.Component {
  constructor(props) {
    super(props)
    this.handleURLChange = this.handleURLChange.bind(this)
  }

  handleURLChange(e) {
    this.props.updateURL(e.target.value)
  }

  render() {
    return (
      <div style={ docBox }>
      <ControlLabel style={ siteStyle }>Doc Address:</ControlLabel>
      <FormControl
        type='text'
        value={this.props.url}
        disabled={this.props.disabled}
        onChange={this.handleURLChange}
      />
      <br />
      <ControlLabel style={ siteStyle }>Requests:</ControlLabel>
     </div>
    )
  }
}
