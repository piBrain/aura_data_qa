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
        <ListGroup>
         {this.enumerateData(this.props)}
        </ListGroup>
      </Well>
    );
  }

  handleChange(e) {
    let key = e.target.id
    this.props.onDataChange(e.target, key);
  }

  enumerateData() {
    let fields = [];
    for(let key in this.props.dataField) {
      fields.push(
        <ListGroupItem key={`${key}-LGI`}>
          {key}:  {this.buildFormControl(key)}
        </ListGroupItem>
      )
    }
    return fields
  }

  buildFormControl(key) {
    return (
        <FormControl 
          type='text'
          key={key} 
          value={this.props.dataField[key]}
          disabled={this.props.disabled}
          onChange={this.handleChange}
        />
    )
  }
};
