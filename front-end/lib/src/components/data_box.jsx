import React from 'react';
import { Well,ListGroup,ListGroupItem,Label } from 'react-bootstrap';

export default class DataBox extends React.Component {
  render(props) {
    return (
      <Well className = 'dataBox'>
        <Label>'User Inputs:'</Label>
        <ListGroup>
         {this.enumerateData(this.props)}
        </ListGroup>
      </Well>
    );
  }

  handleChange(e) {
    this.props.onChange(e.target);
  }

  enumerateData(props) {
    let fields = [];
    for(let key in props.dataField) {
      fields.push(<ListGroupItem>key:props.dataField[key]</ListGroupItem>)
    }
    return fields
  }
};
