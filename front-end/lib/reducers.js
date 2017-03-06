import { TOGGLE_VALIDATION, ACCEPT_VALID, REJECT_INVALID, OPEN_ACCEPT_MODAL, CLOSE_ACCEPT_MODAL} from './actions.js';

import assign from 'assign-deep';

const toggleValidation = (_, state) => {
  let changes = { in_validation: !state.in_validation }
  return assign({}, state, changes)
}

const accept = (_, state) => {
  dispatch(CLOSE_ACCEPT_MODAL)
}

const reject = (_, state) => {

}

const openAcceptModal = (_, state) => (assign({}, state, { is_accept_open: true }))

const closeAcceptModal = (_, state) => (assign({}, state, { is_accept_open: false }))


const initial_state = {
  in_validation: true,
  completed_count: 0,
  is_accept_open: false,
}

export const qa_reducer = (state = initial_state, action) => {
  let qa_lookup = {
    TOGGLE_VALIDATION: toggleValidation,
    ACCEPT_VALID: accept,
    REJECT_INVALID: reject,
    OPEN_ACCEPT_MODAL: openAcceptModal,
    CLOSE_ACCEPT_MODAL: closeAcceptModal
  }
  if(typeof qa_lookup[action.type] == 'undefined') {
    return state
  }
  return qa_lookup[action.type](action, state)
}
