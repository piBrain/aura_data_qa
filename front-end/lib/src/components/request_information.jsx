import React from 'react'
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
  addFieldWrapperStyle,
  requestListStyle
} from '../qa_styles'

export default class RequestInformation extends React.Component {
  constructor(props) {
    super(props)
    this.defineRequestBox = this.defineRequestBox.bind(this)
    this.updateFoundRequest = this.updateFoundRequest.bind(this)
    this.updateData = this.updateData.bind(this)
    this.updateForm = this.updateForm.bind(this)
    this.updateDataKey = this.updateDataKey.bind(this)
    this.updateFormKey = this.updateFormKey.bind(this)
    this.updateMethod = this.updateMethod.bind(this)
    this.updateCommandEx1 = this.updateCommandEx1.bind(this)
    this.updateCommandEx2 = this.updateCommandEx2.bind(this)
    this.updateNotes = this.updateNotes.bind(this)
    this.updateTags = this.updateTags.bind(this)
  }
  updateFoundRequest({ value }) {
    let request = this.props.request
    this.props.updateRequest({
      requestId: this.props.requestId,
      foundRequest: value,
    })
  }

  updateMethod({ value }) {
    let request = this.props.request
    this.props.updateRequest({
      requestId: this.props.requestId,
      foundRequest: request.request,
      method: value
    })
  }

  updateNotes({ value }) {
    const { request } = this.props
    this.props.updateRequest({
      requestId: this.props.requestId,
      foundRequest: request.request,
      notes: value,
    })
  }

  updateTags({ value }) {
    const { request } = this.props
    this.props.updateRequest({
      requestId: this.props.requestId,
      foundRequest: request.request,
      tags: value,
    })
  }

  updateCommandEx1({ value }) {
    let request = this.props.request
    this.props.updateRequest({
      requestId: this.props.requestId,
      foundRequest: request.request,
      commandEx1: value,
    })
  }

  updateCommandEx2({ value }) {
    let request = this.props.request
    this.props.updateRequest({
      requestId: this.props.requestId,
      foundRequest: request.request,
      commandEx2: value,
    })
  }

  updateData(target, key) {
    let request = this.props.request
    let update = target.value
    let data = { ...request.data }

    data[key]['val'] = update

    this.props.updateRequest({ requestId: this.props.requestId, foundRequest: request.request, data })
  }

  updateDataKey(target, key) {
    let request = this.props.request
    let update = target.value
    let data = { ...request.data }

    data[key]['key'] = update

    this.props.updateRequest({ requestId: this.props.requestId, foundRequest: request.request, data })
  }

  updateFormKey(target, key) {
    let request = this.props.request
    let update = target.value
    let form = { ...request.form }

    form[key]['key'] = update

    this.props.updateRequest({ requestId: this.props.requestId, foundRequest: request.request, form })
  }

  updateForm(target, key) {
    let request = this.props.request
    let update = target.value
    let form = { ...request.form }

    form[key]['val'] = update

    this.props.updateRequest({ requestId: this.props.requestId, foundRequest: request.request, form })
  }

  addDataField() {
    let request = this.props.request
    let updatedData = {
      ...request.data,
      [`${uuid()}`]: { key: '', val: '' }
    }
    this.props.updateRequest({ requestId: this.props.requestId, foundRequest: request.request, data: updatedData })
  }

  addFormField() {
    let request = this.props.request
    let updatedForm = {
      ...request.form,
      [`${uuid()}`]: { key: '', val: '' }
    }
    this.props.updateRequest({ requestId: this.props.requestId, foundRequest: request.request, form: updatedForm })
  }

  defineRequestBox() {
    let inValidation = this.props.inValidation
    let request = this.props.request
    return (
      <RestRequestBox
        onRequestChange={this.updateFoundRequest}
        onMethodChange={this.updateMethod}
        onNotesChange={this.updateNotes}
        onTagsChange={this.updateTags}
        onFoundAtChange={this.updateFoundAt}
        onCommandEx1Change={this.updateCommandEx1}
        onCommandEx2Change={this.updateCommandEx2}
        methodValue={ request.method }
        requestValue={ request.request }
        foundAtValue={ request.foundAt }
        commandEx1Value={ request.commandEx1 }
        commandEx2Value={ request.commandEx2 }
        notes={ request.notes }
        tags={ request.tags }
        disabled={ inValidation }
        style={ restRequestBoxStyle }
      />
    )
  }

  setUpComponents() {
    let inValidation = this.props.inValidation
    let request = this.props.request
    return (
      <div key={ this.props.requestId } style={ { ...requestListStyle.listElement, order: this.props.requestId } }>
        {this.defineRequestBox()}
        <DataBox onChange={this.updateData} onKeyChange={this.updateDataKey} labelName='Request Inputs' disabled={inValidation} dataField={request.data} style={ dataBoxStyle }/>
        <DataBox onChange={this.updateForm} onKeyChange={this.updateFormKey} labelName='Request Form Fields' disabled={inValidation} dataField={request.form} style={ dataBoxStyle }/>
        <div style={addFieldWrapperStyle('15%')} >
          <ValidationButton buttonText='Add Data Field' style={ addFieldStyle(0) } onClick={ this.addDataField.bind(this) }/>
          <ValidationButton buttonText='Add Form Field' style={ addFieldStyle(1) } onClick={ this.addFormField.bind(this) }/>
        </div>
      </div>
    )
  }

  render() {
    return(this.setUpComponents());
  }
}
