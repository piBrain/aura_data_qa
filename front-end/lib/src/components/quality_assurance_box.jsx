import React from 'react';
import RestRequestBox from './rest_request_box';
import DataBox from './data_box';
import ValidationButton from './validation_button';

export default class QualityAssuranceBox extends React.Component {
  constructor(props) {
    super(props)
    this.componentWillMount = this.componentWillMount.bind(this)
  }
  componentWillMount() {
    // this.props.setUp()
  }
  render() {
    return(this.setUpComponents());
  }

  setUpComponents() {
    debugger;
    return (
      <div>
        <RestRequestBox value={this.props.active_rest_request} disabled={this.props.in_validation} />
        <DataBox dataField={this.props.active_data_fields}/>
        <ValidationButton buttonText='Valid'/>
        <ValidationButton buttonText='Invalid'/>
      </div> 
    );
  }
}
