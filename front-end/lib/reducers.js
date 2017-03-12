import {
  TOGGLE_VALIDATION,
  REJECT_INVALID,
  OPEN_ACCEPT_MODAL,
  CLOSE_ACCEPT_MODAL,
  TOGGLE_NEW_RECORD,
  UPDATE_INTERMEDIATE,
} from './actions.js';

import assign from 'assign-deep';

const toggleValidation = (_, state) => {
  let changes = { in_validation: !state.in_validation }
  return assign({}, state, changes)
}

const reject = (_, state) => {
  return {
    ...state,
    in_validation: !state.in_validation
  }
}

const updateIntermediate = (action, state) => {
  return {
    ...state,
    intermediateRecord: {
      id: action.id,
      request: action.request,
      method: (action.method || state.intermediateRecord.method),
      data: (action.data || state.intermediateRecord.data),
      form: (action.form || state.intermediateRecord.form),
      found_at: (action.found_at || state.intermediateRecord.found_at),
    }
  }
}

const toggleNewRecord = (_, state) => ({ ...state, isNewRecord: !state.isNewRecord })

const openAcceptModal = (_, state) => ({ ...state, is_accept_open: true })

const closeAcceptModal = (_, state) => ({ ...state, is_accept_open: false  })


const initial_state = {
  in_validation: true,
  completed_count: 0,
  is_accept_open: false,
  isNewRecord: true,
  intermediateRecord: {
    id: null,
    request: '',
    method: '',
    data: {
      test1: 'I am a field',
      test2: 'I am a field',
      test3: 'I am a field',
      test4: 'I am a field',
    },
    form: {
      test1: 'I am a field',
      test2: 'I am a field',
      test3: 'I am a field',
      test4: 'I am a field',
    },
    found_at: null,
  }
}

export const qa_reducer = (state = initial_state, action) => {
  let qa_lookup = {
    TOGGLE_VALIDATION: toggleValidation,
    REJECT_INVALID: reject,
    OPEN_ACCEPT_MODAL: openAcceptModal,
    CLOSE_ACCEPT_MODAL: closeAcceptModal,
    TOGGLE_NEW_RECORD: toggleNewRecord,
    UPDATE_INTERMEDIATE: updateIntermediate,
  }
  if(typeof qa_lookup[action.type] == 'undefined') {
    return state
  }
  return qa_lookup[action.type](action, state)
}
