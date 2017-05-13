import React from 'react';
import { Well,ListGroup,ListGroupItem,Label,FormControl } from 'react-bootstrap';

export default class DataBox extends React.Component {

  constructor(props) {
    super(props)
    this.enumerateData = this.enumerateData.bind(this)
    this.buildFormControl = this.buildFormControl.bind(this)
  } 
  render(props) {
    return (
      <Well className = 'dataBox' style={ this.props.style.topLevelWell }>
        <Label>{`${this.props.labelName}:`}</Label>
        <ListGroup style={ this.props.style.listGroup }>
         {this.enumerateData(this.props)}
        </ListGroup>
      </Well>
    );
  }

  handleFieldChange(key, e) {
    this.props.onChange(e.target, key);
  }

  handleFieldNameChange(key, e){
    this.props.onKeyChange(e.target, key)
  }

  enumerateData() {
    let fields = []
    let order = 0
    for(let key in this.props.dataField) {
      order++
      fields.push(
        <ListGroupItem key={`${key}-LGI`} style={this.listElementStyle(order)}>
          {this.buildFormControl(key, this.handleFieldNameChange, key)}----{this.buildFormControl(key,this.handleFieldChange,this.props.dataField[key])}
        </ListGroupItem>
      )
    }
    return fields
  }

  listElementStyle(order) {
    return {
      order,
      flex: '1 0 0',
    }
  }

  buildFormControl(key, changeFunction, value) {
    return (
        <FormControl 
          type='text'
          value={value}
          disabled={this.props.disabled}
          onChange={changeFunction.bind(this, key)}
        />
    )
  }
};
