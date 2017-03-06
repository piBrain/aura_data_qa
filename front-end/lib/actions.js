export const TOGGLE_MODE = 'TOGGLE_VALIDATION'

export const ACCEPT_VALID = 'ACCEPT_VALID'

export const REJECT_INVALID = 'REJECT_INVALID'

export const OPEN_ACCEPT_MODAL = 'OPEN_ACCEPT_MODAL'

export const CLOSE_ACCEPT_MODAL = 'CLOSE_ACCEPT_MODAL'

export const toggleValidation = () => ( { type: TOGGLE_MODE } )

export const acceptValid = () => ( { type: ACCEPT_VALID } )

export const rejectInvalid = () => ( { type: REJECT_INVALID } )

export const openAcceptModal = () => ( { type: OPEN_ACCEPT_MODAL } )

export const closeAcceptModal = () => ( { type: CLOSE_ACCEPT_MODAL } )

