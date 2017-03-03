import { TOGGLE_MODE, TOGGLE_LOADING, ACCEPT_VALID, REJECT_INVALID, SET_UP, CYCLE_REQUEST } from './actions.js';

import assign from 'assign-deep';

const setUp = (state) => {
  var changes = {}
  return ({}, state, change) => {

  }
}

const toggleValidation = (state) => {
  let changes = { in_validation: !state.in_validation }
  return assign({}, state, changes)
}

const toggleLoading = (state) => {
  let changes = { loading_records: !state.loading_records }
  return assign({}, state, changes)
}

const accept = (state) => {

}

const reject = (state) => {

}

const cycle = (state) => {
  let changes = {
    records: {
      activeRecord: state.records.allIds.slice(1).shift(),
      allIds: state.records.allIds.slice(1),
    }
  }

  let new_state = assign({}, state, changes)
  delete new_state.records.byId[state.records.activeRecord]
  return new_state
}

export const qa_reducer = (state = {}, action) => {

  let qa_lookup = {
    TOGGLE_MODE: toggleValidation,
    TOGGLE_LOADING: toggleLoading,
    ACCEPT_VALID: accept,
    REJECT_INVALID: reject,
    SET_UP: setUp,
    CYCLE_REQUEST: cycle
  }
  if(typeof qa_lookup[action] == 'undefined') {
    return state
  }
  return qa_lookup[action](state)
}



/*
 * Normalized State Thoughts:
 *
 * {
 * in_validation: t/f,
 * loading_records: t/f,
 * records: {
 *  activeRecord: 1
 *  byId: {
 *   1: {}
 *   2: {}
 *   3: {}
 *  }
 *  allIds: [1,2,3]
 *
 * }
 * }
 */
