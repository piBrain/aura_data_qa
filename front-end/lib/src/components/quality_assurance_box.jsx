import React from 'react'
import Modal from 'react-modal'
import RestRequestBox from './rest_request_box' 
import DataBox from './data_box'
import ValidationButton from './validation_button'
import uuid from 'uuid'
import {
  restRequestBoxStyle,
  dataBoxStyle,
  validationButtonStyle,
  qaEntryStyle,
  webpageBoxStyle,
  wrapperStyle,
  addFieldStyle,
  addFieldWrapperStyle
} from '../qa_styles'


export default class QualityAssuranceBox extends React.Component {
  constructor(props) {
    super(props)
    this.componentWillMount = this.componentWillMount.bind(this)
    this.acceptModal = this.acceptModal.bind(this)
    this.defineRequestBox = this.defineRequestBox.bind(this)
    this.acceptValidation = this.acceptValidation.bind(this)
    this.updateParsedRequest = this.updateParsedRequest.bind(this)
    this.updateData = this.updateData.bind(this)
    this.updateForm = this.updateForm.bind(this)
    this.updateMethod = this.updateMethod.bind(this)
    this.updateCommandEx1 = this.updateCommandEx1.bind(this)
    this.updateCommandEx2 = this.updateCommandEx2.bind(this)
  }
  componentWillMount() {
    // this.props.setUp()
  }
  render() {
    return(this.setUpComponents());
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
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
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
    if(nextProps.token == false) {
      this.props.CurrentRecord.refetch()
        .then(() => {
          this.props.toggleNewRecord()
          this.props.pushHistory('/login')
        })
        .catch((err) => {
          console.log(err)
        })
      return
    }
    if(!nextProps.CurrentRecord.loading && nextProps.isNewRecord) {
      let { id, parsed_request, method, data, form, found_at, commandEx1, commandEx2 } = nextProps.CurrentRecord.firstNonValidatedRecord
      this.props.toggleNewRecord()
      this.props.updateIntermediate( id, parsed_request, found_at, method, JSON.parse(data), JSON.parse(form), commandEx1, commandEx2) 
      window.open(found_at, '_blank', 'location=0')
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

  updateMethod(target) {
    let newParsedRequestValue = target.value
    let intermediateRecord = this.props.intermediateRecord
    this.props.updateIntermediate(
      intermediateRecord.id,
      intermediateRecord.request,
      null,
      target.value
    )
  }

  updateCommandEx1(target) {
    let newParsedRequestValue = target.value
    let intermediateRecord = this.props.intermediateRecord
    this.props.updateIntermediate(
        intermediateRecord.id,
        intermediateRecord.request,
        null,
        null,
        null,
        null,
        target.value
    )
  }

  updateCommandEx2(target) {
    let newParsedRequestValue = target.value
    let intermediateRecord = this.props.intermediateRecord
    this.props.updateIntermediate(
        intermediateRecord.id,
        intermediateRecord.request,
        null,
        null,
        null,
        null,
        null,
        target.value
    )
  }

  defineRequestBox() {
    let inValidation = this.props.in_validation
    let intermediateRecord = this.props.intermediateRecord
    return (
      <RestRequestBox
        onRequestChange={this.updateParsedRequest}
        onMethodChange={this.updateMethod}
        onCommandEx1Change={this.updateCommandEx1}
        onCommandEx2Change={this.updateCommandEx2}
        methodValue={ intermediateRecord.method }
        requestValue={ intermediateRecord.request }
        commandEx1Value={ intermediateRecord.commandEx1 }
        commandEx2Value={ intermediateRecord.commandEx2 }
        disabled={ inValidation } 
        style={ restRequestBoxStyle }
      />
    )
  }

  updateData(target, key) {
    let intermediateRecord = this.props.intermediateRecord
    let update = target.value
    let data = { ...intermediateRecord.data }

    data[key] = update

    this.props.updateIntermediate( intermediateRecord.id, intermediateRecord.request, null, null, data )
  }

  updateForm(target, key) {
    let intermediateRecord = this.props.intermediateRecord
    let update = target.value
    let form = { ...intermediateRecord.form }

    form[key] = update

    this.props.updateIntermediate( intermediateRecord.id, intermediateRecord.request, null, null, null, form )
  }

  addDataField() {
    let intermediateRecord = this.props.intermediateRecord
    let updatedData = {
      ...intermediateRecord.data,
      [`place-holder-${uuid()}`]: ''
    }
    this.props.updateIntermediate( intermediateRecord.id, intermediateRecord.request, null, null, updatedData, null )
  }

  addFormField() {
    let intermediateRecord = this.props.intermediateRecord
    let updatedForm = {
      ...intermediateRecord.form,
      [`place-holder-${uuid()}`]: ''
    }
    this.props.updateIntermediate( intermediateRecord.id, intermediateRecord.request, null, null, null, updatedForm )
  }

  setUpComponents() {
    if(this.props.CurrentRecord.loading) { return (<div>{'LOADING'}</div>) }
    let intermediateRecord = this.props.intermediateRecord
    let inValidation = this.props.in_validation
    return (
      <div style={wrapperStyle}>
        <div style={ qaEntryStyle.topLevelDiv } className='qaBox'>
          { this.acceptModal() }
          { this.defineRequestBox() }
          <DataBox onChange={this.updateData} labelName='Request Inputs' disabled={inValidation} dataField={intermediateRecord.data} style={ dataBoxStyle }/>
          <DataBox onChange={this.updateForm} labelName='Request Form Fields' disabled={inValidation} dataField={intermediateRecord.form} style={ dataBoxStyle }/>
          <div style={addFieldWrapperStyle} >
            <ValidationButton buttonText='Add Data Field' style={ addFieldStyle(this.props) } onClick={ this.addDataField.bind(this) }/>
            <ValidationButton buttonText='Add Form Field' style={ addFieldStyle(this.props) } onClick={ this.addFormField.bind(this) }/>
          </div>
          <ValidationButton buttonText='Valid' style={ validationButtonStyle } onClick={ this.props.openAcceptModal }/>
          <ValidationButton buttonText='Invalid' style={ validationButtonStyle } onClick={ this.props.rejectInvalid }/>
        </div>
      </div>
    );
  }
}
