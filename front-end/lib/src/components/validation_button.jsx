import React from 'react';
import { Button } from 'react-bootstrap';

export default class ValidationButton extends React.Component {
  render() {
    return (
      <Button bsStyle={this.props.bsStyle} bsSize={this.props.bsSize} onClick={this.handleClick} block>
      {this.props.buttonText}
      </Button>
    );
  }

  handleClick(e) {
    this.props.onClick(e)
  }

  handleChange(e) {
    this.props.onChange(e.target)
  }

};
