import React from 'react';
import { FormGroup,ControlLabel,FormControl } from 'react-bootstrap'

export default class RestRequestBox extends React.Component {

  constructor(props) {
    super(props)
    this.handleRequestChange = this.handleRequestChange.bind(this);
    this.handleMethodChange = this.handleMethodChange.bind(this);
  }

  handleRequestChange(e) {
    this.props.onRequestChange(e.target);
  }

  handleMethodChange(e) {
    this.props.onMethodChange(e.target)
  }

  render() {
    return (
      <form style={ this.props.style.topLevelForm }>
        <FormGroup className='restDataEntry'>
          <ControlLabel style={ this.props.style.controlLabel }>Method:</ControlLabel>
          <FormControl
            type='text'
            value={this.props.methodValue}
            disabled={this.props.disabled}
            onChange={this.handleMethodChange}
          />
          <ControlLabel style={ this.props.style.controlLabel }>Rest Request:</ControlLabel>
          <FormControl
            type='text'
            value={this.props.requestValue}
            disabled={this.props.disabled}
            onChange={this.handleRequestChange}
          />
        </FormGroup>
      </form>
    );
  };
};
