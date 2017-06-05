import {
  ACCEPT_LOGIN,
  ADD_REQUEST,
  CLOSE_ACCEPT_MODAL,
  LOGGING_IN,
  OPEN_ACCEPT_MODAL,
  REJECT_INVALID,
  REJECT_LOGIN,
  REMOVE_REQUEST,
  RESET,
  SKIP,
  TOGGLE_NEW_RECORD,
  TOGGLE_VALIDATION,
  UPDATE_REQUEST,
  UPDATE_SITE,
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

const updateRequest = ( action, state ) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      [action['requestId']]: {
        commandEx1: action.commandEx1 == "" ? "" : (action.commandEx1 || state.requests[action.requestId].commandEx1),
        commandEx2: action.commandEx2 == "" ? "" : (action.commandEx2 || state.requests[action.requestId].commandEx2),
        data: (action.data || state.requests[action.requestId].data),
        form: (action.form || state.requests[action.requestId].form),
        foundAt: action.foundAt == "" ? "" : (action.foundAt || state.requests[action.requestId].foundAt),
        method: action.method == "" ? "" : (action.method || state.requests[action.requestId].method),
        notes: action.notes == "" ? "" : (action.notes || state.requests[action.requestId].notes),
        request: action.foundRequest == "" ? "" : (action.foundRequest || state.requests[action.requestId].foundRequest),
        tags: action.tags == "" ? "" : (action.tags || state.requests[action.requestId].tags),
      }
    }
  }
}

const skip = ( _, state ) => {
  return toggleNewRecord( null, reset( null, state ) )
}

const reset = ( _, state ) => {
  return {
    ...state,
    site: {
      id: null,
      requestIds: [],
      url: '',
    },
    requests: {

    }
  }
}

const updateSite = ( action, state ) => {
  return {
    ...state,
    site: {
      id: action.id == null ? null : (action.id || state.site.id),
      requestIds: action.requestIds == [] ? [] : (action.requestIds || state.site.requestIds),
      url: action.url == "" ? "" : (action.url || state.url),
    }
  }
}

const addRequest = ( action, state ) => {
  let newRequestId = state.site.requestIds.length == 0 ? 0 : Math.max(...state.site.requestIds) + 1
  return {
    ...state,
    site: {
      ...state.site,
      requestIds: state.site.requestIds.slice(0).concat([newRequestId])
    },
    requests: {
      ...state.requests,
      [newRequestId]: {
        commandEx1: '',
        commandEx2: '',
        data: {},
        form: {},
        foundAt: '',
        method: '',
        notes: '',
        request: '',
        tags: '',
      },
    },
  }
}

const removeRequest = ( action, state ) => {
  let updatedRequests = assign({}, state.requests)
  let updatedSiteRequestIds = state.site.requestIds.filter((val) => val != action.requestId)
  delete updatedRequests[action.requestId]
  return {
    ...state,
    site: {
      ...state.site,
      requestIds: updatedSiteRequestIds,
    },
    updatedRequests
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
  completed_count: 0,
  in_validation: true,
  isNewRecord: true,
  is_accept_open: false,
  loading: false,
  requests: {
  },
  site: {
    id: null,
    url: '',
    requestIds: []
  },
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
    ADD_REQUEST: addRequest,
    REMOVE_REQUEST: removeRequest,
    UPDATE_REQUEST: updateRequest,
    UPDATE_SITE: updateSite,
    SKIP: skip,
    RESET: reset,
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
