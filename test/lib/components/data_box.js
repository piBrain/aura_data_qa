import React from 'react';
import DataBox from '../../../lib/src/components/data_box';
import { shallow, mount, render  } from 'enzyme';
import { expect } from 'chai';
import { Well,Label,ListGroup } from 'react-bootstrap';
import sinon from 'sinon';


describe('<DataBox />', () => {
  it('exists', () => {
    const wrapper = shallow(<DataBox disabled={true}/>)
    expect(wrapper).to.exist;
  });

  it('Contains the expected sub-components passed in with no props.', () => {
    const wrapper = shallow(<DataBox />)
    expect(wrapper.matchesElement(
      <Well class='dataBox'>
        <Label>'User Inputs:'</Label>
        <ListGroup>
        </ListGroup>
      </Well>
    )).to.equal(true);
  });

  it('it executes the function passed to it for handleChange', () => {
    const testChange = sinon.spy();
    const wrapper = shallow(<DataBox disabled={false} value='' onChange={testChange} />);
    wrapper.instance().handleChange('')
    expect(testChange.calledOnce).to.equal(true);
  });

  it('creates a FormControl for each data field passed in via prop', () => {
    const wrapper = shallow(<DataBox dataField={{'first':'abc','second':'123'}}/>);
    expect(wrapper.find('ListGroup').children().length).to.equal(2)
  });

});

