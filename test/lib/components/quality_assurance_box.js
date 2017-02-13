import React from 'react'
import QualityAssuranceBox from '../../../lib/src/components/quality_assurance_box'
import { shallow, mount, render  } from 'enzyme'
import { expect } from 'chai'
import RestRequestBox from '../../../lib/src/components/rest_request_box'
import DataBox from '../../../lib/src/components/data_box'
import ValidationButton from '../../../lib/src/components/validation_button'
import sinon from 'sinon'

describe('<QualityAssuranceBox/>', function() {
  const setUpStub = sinon.stub().returns(null)
  it('Contains the the required components', function() {
    const wrapper = shallow(<QualityAssuranceBox setUp={setUpStub}/>)
    expect(wrapper.matchesElement(
      <div>
        <RestRequestBox/>
        <DataBox/>
        <ValidationButton/>
        <ValidationButton/>
      </div>
    )).to.equal(true)
  })

  it('sets the props on RestRequestBox', function() {
    const wrapper = mount(<QualityAssuranceBox setUp={setUpStub} active_rest_request='REST_REQUEST' in_validation={true}/>)
    expect(wrapper.find(RestRequestBox).first().props().value).to.equal('REST_REQUEST')
    expect(wrapper.find(RestRequestBox).first().props().disabled).to.equal(true)
  })

  it('sets the props on DataBox', function() {
    let data_fields = {
      'FOO_FIELD' : 1,
      'BAR_FIELD' : 2
    }
    const wrapper = mount(<QualityAssuranceBox setUp={setUpStub} active_data_fields={data_fields}/>)
    expect(wrapper.find(DataBox).first().props().dataField).to.equal(data_fields)
  })

  describe('#componentWillMount', function() {
      it('should call setUp', function() {
        const dummySetUp = sinon.spy()
        const wrapper = mount(<QualityAssuranceBox setUp={dummySetUp}/>)
        expect(dummySetUp.calledOnce).to.equal(true)
      })
  })

  describe('non-editable validation state.', function() {
    // const wrapper = mount(<QualityAssuranceBox setUp={setUpStub} active_rest_request='' disabled={true}/>)
    // it('has immutability on the request', function() {
    //   expect(wrapper.find(RestRequestBox).first().props().disabled).to.equal(true)
    // })

    // describe('when approved', function() {
    //     it('should pop the next record in the validation queue')
    //     it('should present the continuation modal when the validation queue is empty')
    // })
    // describe('when rejected', function() {
    //     it('should transition to the editable correction state')
    // })
  })

  describe('editable correction state.', function() {

  })
})

