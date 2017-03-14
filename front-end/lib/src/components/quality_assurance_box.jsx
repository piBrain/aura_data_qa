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
    this.updateData = this.updateData.bind(this)
    this.updateForm = this.updateForm.bind(this)
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
        marginBottom: '0',
        flex: '1 0 0',
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
        flex: '1.4 0 0',
        overflowY: 'scroll',
      },
      listGroup: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }
    }
  }

  validationButtonStyle() {
    return  {
      topLevelButton: {
        width: '80%',
        marginLeft: '7.5%',
        flex: '0.1 0 0',
      },
    }
  }

  qaEntryStyle() {
    return {
      topLevelDiv: {
        marginTop: '1%',
        flex: '1 0 0',
        height: '90%',
        order: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignIterms: 'center',
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
      alignItems: 'space-around',
      width: '100%',
      height: '100%',
    }
  }

  addDataFieldStyle(props) {
    let visibility = props.in_validation ? 'hidden' : 'visible'
    return  {
      topLevelButton: {
        margin: '0',
        flex: '0.95 0 0',
        fontSize: '0.65em',
        order: 1,
        visibility,
      },
    }
  }

  addFormFieldStyle(props) {
    let visibility = props.in_validation ? 'hidden' : 'visible'
    return  {
      topLevelButton: {
        margin: '0',
        flex: '0.95 0 0',
        fontSize: '0.65em',
        order: 2,
        visibility
      },
    }
  }

  addFieldWrapperStyle() {
    return {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'space-around',
      width: '80%',
      height: '5%',
      marginLeft: '7.5%',
      marginBottom: '1%',
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

  setUpComponents() {
    if(this.props.CurrentRecord.loading) { return (<div>{'LOADING'}</div>) }
    let intermediateRecord = this.props.intermediateRecord
    let inValidation = this.props.in_validation
    return (
      <div style={this.wrapperStyle()}>
        <div style={ this.qaEntryStyle().topLevelDiv } className='qaBox'>
          { this.acceptModal() }
          { this.defineRequestBox() }
          <DataBox onChange={this.updateData} labelName='Request Inputs' disabled={inValidation} dataField={intermediateRecord.data} style={ this.dataBoxStyle() }/>
          <DataBox onChange={this.updateForm} labelName='Request Form Fields' disabled={inValidation} dataField={intermediateRecord.form} style={ this.dataBoxStyle() }/>
          <div style={this.addFieldWrapperStyle()} >
            <ValidationButton buttonText='Add Data Field' style={ this.addDataFieldStyle(this.props) } onClick={ this.addDataField }/>
            <ValidationButton buttonText='Add Form Field' style={ this.addFormFieldStyle(this.props) } onClick={ this.addFormField }/>
          </div>
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
