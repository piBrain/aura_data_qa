import React from 'react';
import Modal from 'react-modal'
import RestRequestBox from './rest_request_box';
import DataBox from './data_box';
import ValidationButton from './validation_button';

export default class QualityAssuranceBox extends React.Component {
  constructor(props) {
    super(props)
    this.componentWillMount = this.componentWillMount.bind(this)
    this.acceptModal = this.acceptModal.bind(this)
  }
  componentWillMount() {
    // this.props.setUp()
  }
  render() {
    return(this.setUpComponents());
  }

  restRequestBoxStyle() {
    return {
      topLevelForm: {
        width: '50%',
        marginLeft: '25%',
      },
      controlLabel: {
      }
    }
  }

  dataBoxStyle() {
    return {
      topLevelWell: {
        width: '50%',
        marginLeft: '25%',
      }
    }
  }

  validationButtonStyle() {
    return  {
      topLevelButton: {
        width: '50%',
        marginLeft: '25%'
      }
    }
  }

  selfStyle() {
    return {
      topLevelDiv: {
       marginTop: '15%',
      }
    }
  }

  acceptModal() {
    return (
        <Modal
          isOpen={ this.props.is_accept_open }
          onRequestClose={ this.props.toggleAcceptModal }
          contentLabel='Validation Confirmation'
        >
          <p>Please double check that the record is indeed valid before continuing.</p>
          <button onClick={this.props.acceptValid}>Validate!</button>
          <button onClick={this.props.closeAcceptModal}>Cancel</button>
        </Modal>
        )
  }

  setUpComponents() {
    if(this.props.data.loading) { return (<div>{'LOADING'}</div>) }
    let parsedRequest = this.props.data.firstNonValidatedRecord.parsed_request
    let inValidation = this.props.in_validation
    return (
      <div style={ this.selfStyle().topLevelDiv }>
        { this.acceptModal() }
        <RestRequestBox value={ parsedRequest } disabled={ inValidation } style={ this.restRequestBoxStyle() } />
        <DataBox dataField={this.props.active_data_fields} style={ this.dataBoxStyle() }/>
        <ValidationButton buttonText='Valid' style={ this.validationButtonStyle() } onClick={ this.props.openAcceptModal }/>
        <ValidationButton buttonText='Invalid' style={ this.validationButtonStyle() } onClick={ this.props.rejectInvalid }/>
      </div>
    );
  }
}
