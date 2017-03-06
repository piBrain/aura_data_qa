import React from 'react';
import { Button } from 'react-bootstrap';

export default class ValidationButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  render() {
    return (
      <Button style={ this.props.style.topLevelButton } onClick={ this.handleClick } block>
      {this.props.buttonText}
      </Button>
    );
  }

  handleClick(e) {
    this.props.onClick(e)
  }
};
