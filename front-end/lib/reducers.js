import {
  TOGGLE_VALIDATION,
  REJECT_INVALID,
  OPEN_ACCEPT_MODAL,
  CLOSE_ACCEPT_MODAL,
  TOGGLE_NEW_RECORD,
  UPDATE_INTERMEDIATE,
  ACCEPT_LOGIN,
  REJECT_LOGIN,
  LOGGING_IN,
} from './actions.js';

import assign from 'assign-deep';

const toggleValidation = ( _, state ) => {
  let changes = { in_validation: !state.in_validation }
  return assign({}, state, changes)
}

const reject = ( _, state ) => {
  return {
    ...state,
    in_validation: !state.in_validation
  }
}

const updateIntermediate = ( action, state ) => {
  return {
    ...state,
    intermediateRecord: {
      id: action.id,
      request: action.request,
      method: (action.method || state.intermediateRecord.method),
      data: (action.data || state.intermediateRecord.data),
      form: (action.form || state.intermediateRecord.form),
      commandEx1: (action.commandEx1 || state.intermediateRecord.commandEx1),
      commandEx2: (action.commandEx2 || state.intermediateRecord.commandEx2),
      foundAt: (action.foundAt || state.intermediateRecord.foundAt),
    }
  }
}

const toggleNewRecord = ( _, state ) => ({ ...state, isNewRecord: !state.isNewRecord })

const openAcceptModal = ( _, state ) => ({ ...state, is_accept_open: true })

const closeAcceptModal = ( _, state ) => ({ ...state, is_accept_open: false  })

const acceptLogin = ( action, state ) => {
  document.cookie = `piBrainQASessionNonce=${action.token};`
  return { ...state, serverNonce: action.token, loading: false }
}

const rejectLogin = ( action, state ) => {
  return { ...state, serverNonce: '', loading: false }
} 

const loggingIn = ( _, state ) => {
  return { ...state, loading: true }
}

const initial_state = {
  in_validation: true,
  completed_count: 0,
  is_accept_open: false,
  isNewRecord: true,
  intermediateRecord: {
    id: null,
    request: '',
    method: '',
    data: {},
    form: {},
    commandEx1: '',
    commandEx2: '',
    foundAt: null,
  },
  loading: false,
}


const loginInitialState = {
  serverNonce: '',
  loading: false
}




export const qa_reducer = ( state = initial_state, action ) => {
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
  return qa_lookup[action.type]( action, state )
}

export const login_reducer = ( state=loginInitialState, action ) => {
  let login_lookup = {
    ACCEPT_LOGIN: acceptLogin,
    REJECT_LOGIN: rejectLogin,
    LOGGING_IN: loggingIn,
  }
  if(typeof login_lookup[action.type] == 'undefined') {
    return state
  }
  return login_lookup[action.type]( action, state )

}
