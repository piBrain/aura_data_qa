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
      <form>
        <FormGroup className='restDataEntry'>
          <ControlLabel>'Rest request from database.'</ControlLabel>
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
