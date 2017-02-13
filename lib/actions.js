export const TOGGLE_MODE = 'TOGGLE_MODE'
export const ACCEPT_VALID = 'ACCEPT_INVALID'
export const REJECT_INVALID = 'REJECT_INVALID'
export const SET_UP = 'SET_UP'
export const CYCLE_REQUEST = 'CYCLE_REQUEST'

export const toggleMode = () => {
  return { type: TOGGLE_MODE }
}

export const acceptValid = () => {
  return { type: ACCEPT_VALID, true }
}

export const rejectInvalid = () => {
  return { type: REJECT_INVALID, true }
}

export const setUp = (active_request, in_validation = true, request_queue = []) => {
  return { type: SET_UP, request_queue, active_request, in_validation }
}

export const cycleRequest = () => {
  return { type: CYCLE_REQUEST, true }
}
