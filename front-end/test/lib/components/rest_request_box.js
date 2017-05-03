import React from 'react';
import RestRequestBox from '../../../lib/src/components/rest_request_box';
import { shallow, mount, render  } from 'enzyme';
import { expect } from 'chai';
import { FormGroup,ControlLabel,FormControl } from 'react-bootstrap';
import sinon from 'sinon';


describe('<RestRequestBox />', () => {
  it('exists', () => {
    const wrapper = shallow(<RestRequestBox disabled={true}/>)
    expect(wrapper).to.exist;
  });

  it('Contains the expected sub-components with default state', () => {
    const wrapper = shallow(<RestRequestBox disabled={true} value='' />)
    expect(wrapper.matchesElement(
      <form>
        <FormGroup class='restDataEntry'>
          <ControlLabel>'Rest request from database.'</ControlLabel>
          <FormControl />
        </FormGroup>
      </form>
    )).to.equal(true);
  });

  it('it executes the function passed to it for handleChange', () => {
    const testChange = sinon.spy();
    const wrapper = shallow(<RestRequestBox disabled={false} value='' onChange={testChange} />);
    wrapper.instance().handleChange('')
    expect(testChange.calledOnce).to.equal(true);
  });

});

