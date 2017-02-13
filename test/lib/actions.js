import { expect } from 'chai';
import sinon from 'sinon';
import { TOGGLE_MODE, ACCEPT_VALID, REJECT_INVALID, SET_UP, CYCLE_REQUEST } from '../../lib/actions'
import { toggleMode, acceptValid, rejectInvalid, cycleRequest, setUp } from '../../lib/actions'

describe('TOGGLE_MODE', function() {
  it('returns the correctly configured object', function() {
     expect(toggleMode().type).to.equal(TOGGLE_MODE)
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

describe('SET_UP', function() {
  it('returns the correctly configured object', function() {
    expect(setUp('').type).to.equal(SET_UP)
    expect(setUp('FOO').active_request).to.equal('FOO')
    expect(setUp('', false).in_validation).to.equal(false)
    expect(setUp('', true, ['FOO']).request_queue.length).to.equal(1)
    expect(setUp('', true, ['FOO']).request_queue[0]).to.equal('FOO')
  })
})

describe('CYCLE_REQUEST', function() {
  it('returns the correctly configured object', function() {
     expect(cycleRequest().type).to.equal(CYCLE_REQUEST)
  })
})

