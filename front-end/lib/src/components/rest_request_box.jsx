import React from 'react';
import { FormGroup,ControlLabel,FormControl } from 'react-bootstrap'

export default class RestRequestBox extends React.Component {

  constructor(props) {
    super(props)
    this.handleRequestChange = this.handleRequestChange.bind(this);
    this.handleMethodChange = this.handleMethodChange.bind(this);
    this.handleCommandEx1Change =  this.handleCommandEx1Change.bind(this);
    this.handleCommandEx2Change = this.handleCommandEx2Change.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this)
    this.handleTagsChange = this.handleTagsChange.bind(this)
  }

  handleRequestChange(e) {
    this.props.onRequestChange(e.target);
  }

  handleMethodChange(e) {
    this.props.onMethodChange(e.target)
  }


  handleNotesChange({ target }) {
    this.props.onNotesChange(target)
  }

  handleTagsChange({ target }) {
    this.props.onTagsChange(target)
  }

  handleCommandEx1Change(e) {
    this.props.onCommandEx1Change(e.target)
  }

  handleCommandEx2Change(e) {
    this.props.onCommandEx2Change(e.target)
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
          <ControlLabel style={ this.props.style.controlLabel }>Command Example 1:</ControlLabel>
          <FormControl
            type='text'
            value={this.props.commandEx1Value}
            disabled={this.props.disabled}
            onChange={this.handleCommandEx1Change}
          />
          <ControlLabel style={ this.props.style.controlLabel }>Command Example 2:</ControlLabel>
          <FormControl
            type='text'
            value={this.props.commandEx2Value}
            disabled={this.props.disabled}
            onChange={this.handleCommandEx2Change}
          />
          <ControlLabel style={ this.props.style.controlLabel }>Notes:</ControlLabel>
          <FormControl
            type='text'
            value={this.props.notes}
            disabled={this.props.disabled}
            onChange={this.handleNotesChange}
          />
          <ControlLabel style={ this.props.style.controlLabel }>Tags:</ControlLabel>
          <FormControl
            type='text'
            value={this.props.tags}
            disabled={this.props.disabled}
            onChange={this.handleTagsChange}
          />
        </FormGroup>
      </form>
    );
  };
};
