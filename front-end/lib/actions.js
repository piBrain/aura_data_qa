export const TOGGLE_MODE = 'TOGGLE_VALIDATION'

export const ACCEPT_VALID = 'ACCEPT_VALID'

export const TOGGLE_NEW_RECORD = 'TOGGLE_NEW_RECORD'

export const UPDATE_INTERMEDIATE = 'UPDATE_INTERMEDIATE'

export const REJECT_INVALID = 'REJECT_INVALID'

export const OPEN_ACCEPT_MODAL = 'OPEN_ACCEPT_MODAL'

export const CLOSE_ACCEPT_MODAL = 'CLOSE_ACCEPT_MODAL'

export const toggleValidation = () => ( { type: TOGGLE_MODE } )

export const toggleNewRecord = () => ( { type: TOGGLE_NEW_RECORD } )

export const updateIntermediate = ( id, request, found_at, method=null, data=null, form=null ) => {
  return { type: UPDATE_INTERMEDIATE, id, request, method, data, form, found_at }
}

export const rejectInvalid = () => ( { type: REJECT_INVALID } )

export const openAcceptModal = () => ( { type: OPEN_ACCEPT_MODAL } )

export const closeAcceptModal = () => ( { type: CLOSE_ACCEPT_MODAL } )

