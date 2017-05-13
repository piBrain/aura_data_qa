import React from 'react';
import ValidationButton from '../../../lib/src/components/validation_button';
import { shallow, mount, render  } from 'enzyme';
import { expect } from 'chai';
import { Button } from 'react-bootstrap';
import sinon from 'sinon';


describe('<ValidationButton />', () => {
  it('exists', () => {
    const wrapper = shallow(<ValidationButton disabled={true}/>)
    expect(wrapper).to.exist;
  });

  it('Contains the expected sub-components passed in with no props.', () => {
    const wrapper = shallow(<ValidationButton />)
    expect(wrapper.matchesElement(
      <Button block>
      </Button>
    )).to.equal(true);
  });

  it('it executes the function passed to it for handleChange', () => {
    const testChange = sinon.spy();
    const wrapper = shallow(<ValidationButton disabled={false} value='' onChange={testChange} />);
    wrapper.instance().handleChange('')
    expect(testChange.calledOnce).to.equal(true);
  });

  it('it executes the function passed to it for handleClick', () => {
    const testChange = sinon.spy();
    const wrapper = shallow(<ValidationButton disabled={false} value='' onClick={testChange} />);
    wrapper.instance().handleClick('')
    expect(testChange.calledOnce).to.equal(true);
  });


});

