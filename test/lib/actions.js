import { expect } from 'chai';
import sinon from 'sinon';
import { TOGGLE_MODE, TOGGLE_LOADING, FETCH_RECORDS, ACCEPT_VALID, REJECT_INVALID, SET_UP, CYCLE_REQUEST } from '../../lib/actions'
import { toggleMode, acceptValid, rejectInvalid, cycleRequest, setUp } from '../../lib/actions'

describe('TOGGLE_MODE', function() {
  it('returns the correctly configured object', function() {
     expect(toggleMode().type).to.equal(TOGGLE_MODE)
  })
})

describe('TOGGLE_LOADING', function() {
  it('returns the correctly configured object', function() {
     expect(toggleLoading().type).to.equal(TOGGLE_LOADING)
  })
})

describe('ACCEPT_VALID', function() {
  it('returns the correctly configured object', function() {
     expect(acceptValid().type).to.equal(ACCEPT_VALID)
  })
})

describe('REJECT_INVALID', function() {
  it('returns the correctly configured object', function() {
     expect(rejectInvalid().type).to.equal(REJECT_INVALID)
  })
})

describe('CYCLE_REQUEST', function() {
  it('returns the correctly configured object', function() {
     expect(cycleRequest().type).to.equal(CYCLE_REQUEST)
  })
})

describe('FETCH_RECORDS', function() {
  it('returns the correctly configured object', function(done) {
    expect(fetchRecords(done))
  })
})
