import React from 'react'
import Modal from 'react-modal'
import ValidationButton from './validation_button'
import {
  restRequestBoxStyle,
  validationButtonStyle,
  qaEntryStyle,
  webpageBoxStyle,
  wrapperStyle,
  addFieldStyle,
  addFieldWrapperStyle,
  requestListStyle
} from '../qa_styles'

import RequestInformation from './request_information'
import Site from './site'


export default class QualityAssuranceBox extends React.Component {
  constructor(props) {
    super(props)
    this.acceptModal = this.acceptModal.bind(this)
    this.acceptValidation = this.acceptValidation.bind(this)
    this.defineRequests = this.defineRequests.bind(this)
    this.skipSite = this.skipSite.bind(this)
    this.updateURL = this.updateURL.bind(this)
  }
  render() {
    return(this.setUpComponents());
  }


  acceptValidation() {
    this.props.persistChangesAndValidate({ siteId: this.props.site.id, requestData: this.props.requests })
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
      if (!nextProps.CurrentRecord.firstNonValidatedRecord) {
        console.log(new Error('No Record Found'))
        this.props.CurrentRecord.refetch()
      }
      let { id, url } = nextProps.CurrentRecord.firstNonValidatedRecord || { id: -1, url: '' }
      this.props.toggleNewRecord()
      this.props.reset()
      this.props.updateSite({ id , url, requestIds: []})
      window.open(url, '_blank', 'location=0')
    }
  }

  defineRequests() {
    return this.props.site.requestIds.map((requestId) => {
     return  (
      <RequestInformation
        key={requestId}
        totalRequests={this.props.site.requestIds.length}
        request={this.props.requests[requestId]}
        site={this.props.site}
        updateRequest={this.props.updateRequest}
        inValidation={this.props.in_validation}
        requestId={requestId}
      />
     )
    })
  }

  shouldComponentUpdate(nextProps, _) {
    return true
  }

  updateURL(value) {
    let { id, url, requestIds } = this.props.site
    this.props.updateSite({
      id,
      value,
      requestIds,
    })
  }

  skipSite() {
    this.props.CurrentRecord.refetch()
    this.props.skip()
  }

  setUpComponents() {
    if(this.props.CurrentRecord.loading) { return (<div>{'LOADING'}</div>) }
    let inValidation = this.props.in_validation
    return (
      <div style={wrapperStyle}>
        <div style={ qaEntryStyle.topLevelDiv } className='qaBox'>
          { this.acceptModal() }
          <Site disabled={this.props.in_validation} updateURL={this.updateURL} url={this.props.site.url}/>
          <div style={ requestListStyle.listContainer }>
            { this.defineRequests() }
          </div>
          <div style={{...addFieldWrapperStyle('7.5%'), marginBottom: '-4.5%'}}>
            <ValidationButton buttonText='+' style={ addFieldStyle(0) } onClick={ this.props.addRequest }/>
            <ValidationButton buttonText='Skip' style={ addFieldStyle(1) } onClick={ this.skipSite }/>
          </div>
          <div style={addFieldWrapperStyle('7.5%')} >
            <ValidationButton buttonText='Valid' style={ addFieldStyle(0) } onClick={ this.props.openAcceptModal }/>
            <ValidationButton buttonText='Invalid' style={ addFieldStyle(1) } onClick={ this.props.rejectInvalid }/>
          </div>
        </div>
      </div>
    );
  }
}
