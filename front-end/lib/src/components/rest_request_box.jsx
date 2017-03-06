import React from 'react';
import { FormGroup,ControlLabel,FormControl } from 'react-bootstrap'

export default class RestRequestBox extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target);
  }

  render() {
    return (
      <form style={ this.props.style.topLevelForm }>
        <FormGroup className='restDataEntry'>
          <ControlLabel style={ this.props.style.controlLabel }>Rest Request:</ControlLabel>
          <FormControl
            type='text'
            value={this.props.value}
            disabled={this.props.disabled}
            onChange={this.handleChange}
          />
        </FormGroup>
      </form>
    );
  };
};
