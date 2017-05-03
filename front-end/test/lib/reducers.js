import { expect } from 'chai';
import sinon from 'sinon';
import { qa_reducer } from '../../lib/reducers.js';
import { TOGGLE_MODE, TOGGLE_LOADING, ACCEPT_VALID, REJECT_INVALID, SET_UP, CYCLE_REQUEST } from '../../lib/actions.js';


describe('#toggleValidation', function() {
  it('sucessfully toggles the in_validation flag', function() {
    let state = { not_touched: 'ARBITRARY', in_validation: true }
    expect(qa_reducer(state,TOGGLE_MODE)).to.deep.equal( { not_touched: 'ARBITRARY', in_validation: false } )
  });
});

describe('#toggleLoading', function() {
  it('sucessfully toggles the in_validation flag', function() {
    let state = { not_touched: 'ARBITRARY', loading_records: true }
    expect(qa_reducer(state,TOGGLE_LOADING)).to.deep.equal( { not_touched: 'ARBITRARY', loading_records: false } )
  });
});

describe('#accept', function() {

});

describe('#reject', function() {

});

describe('#cycle', function() {
  let state = {
    records: {
      activeRecord: 1,
      byId: {
        1: {
          name: 'record_1'
        },
        2: {
          name: 'record_2'
        }
      },
      allIds: [1,2]
    }
  }
  let updated_state = {
    records: {
      activeRecord: 2,
      byId: {
        2: {
          name: 'record_2'
        }
      },
      allIds: [2]
    }
  }
  expect(qa_reducer(state,CYCLE_REQUEST)).to.deep.equal(updated_state)
});


