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
    this.defineRequestBox = this.defineRequestBox.bind(this)
    this.acceptValidation = this.acceptValidation.bind(this)
    this.updateParsedRequest = this.updateParsedRequest.bind(this)
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
        width: '80%',
        marginLeft: '7.5%',
      },
      controlLabel: {
      },
    }
  }

  dataBoxStyle() {
    return {
      topLevelWell: {
        width: '80%',
        marginLeft: '7.5%',
      },
    }
  }

  validationButtonStyle() {
    return  {
      topLevelButton: {
        width: '50%',
        marginLeft: '25%'
      },
    }
  }

  qaEntryStyle() {
    return {
      topLevelDiv: {
        marginTop: '2.5%',
        flex: '1 0 0',
        order: 1,
      }
    }
  }

  webpageBoxStyle() {
    return {
      topLevelDiv: {
        flex: '1 0 0',
        order: 2,
      },
      iFrame: {
        width: '100%',
        height: '100%',
      },
    }
  }

  wrapperStyle() {
    return {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignIterms: 'space-around',
      width: '100%',
      height: '100%',
    }
  }

  acceptValidation() {
    this.props.persistChangesAndValidate(this.props.intermediateRecord)
      .then(() => {
        this.props.CurrentRecord.refetch()
          .then(() => {
            this.props.toggleNewRecord()
            this.props.closeAcceptModal()
          })
          .catch((err) => {
            debugger
          })
      })
      .catch((err) => {
        debugger
      })
  }

  acceptModal() {
    return (
        <Modal
          isOpen={ this.props.is_accept_open }
          onRequestClose={ this.props.closeAcceptModal }
          contentLabel='Validation Confirmation'
        >
          <p>{'Please double check that the record is indeed valid before continuing'}.</p>
          <button onClick={this.acceptValidation}>{'Validate!'}</button>
          <button onClick={this.props.closeAcceptModal}>Cancel</button>
        </Modal>
        )
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.CurrentRecord.loading && nextProps.isNewRecord) {
      let { id, parsed_request, method, data, form, found_at } = nextProps.CurrentRecord.firstNonValidatedRecord
      this.props.toggleNewRecord()
      this.props.updateIntermediate( id, parsed_request, found_at, method, data, form)
    }
  }

  shouldComponentUpdate(nextProps, _) {
    return true
  }

  updateParsedRequest(target) {
    let newParsedRequestValue = target.value
    let intermediateRecord = this.props.intermediateRecord
    this.props.updateIntermediate(
        intermediateRecord.id,
        newParsedRequestValue,
    )
  }

  defineRequestBox() {
    let inValidation = this.props.in_validation
    let intermediateRecord = this.props.intermediateRecord
    return (
      <RestRequestBox
        onRequestChange={this.updateParsedRequest}
        onMethodChange={this.updateMethod}
        methodValue={ intermediateRecord.method }
        requestValue={ intermediateRecord.request }
        disabled={ inValidation } 
        style={ this.restRequestBoxStyle() }
      />
    )
  }

  updateData(target, key) {

  }

  updateForm(target, key) {

  }

  setUpComponents() {
    if(this.props.CurrentRecord.loading) { return (<div>{'LOADING'}</div>) }
    let intermediateRecord = this.props.intermediateRecord
    let inValidation = this.props.in_validation
    return (
      <div style={this.wrapperStyle()}>
        <div style={ this.qaEntryStyle().topLevelDiv }>
          { this.acceptModal() }
          { this.defineRequestBox() }
          <DataBox labelName='Request Inputs' disabled={inValidation} dataField={intermediateRecord.data} style={ this.dataBoxStyle() }/>
          <DataBox labelName='Request Form Fields' disabled={inValidation} dataField={intermediateRecord.form} style={ this.dataBoxStyle() }/>
          <ValidationButton buttonText='Valid' style={ this.validationButtonStyle() } onClick={ this.props.openAcceptModal }/>
          <ValidationButton buttonText='Invalid' style={ this.validationButtonStyle() } onClick={ this.props.rejectInvalid }/>
        </div>
        <div style={ this.webpageBoxStyle().topLevelDiv }>
          <iframe src={intermediateRecord.found_at}  style={this.webpageBoxStyle().iFrame}></iframe>
        </div>
      </div>
    );
  }
}
