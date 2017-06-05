import { apiUrl } from 'config'
import { push } from 'react-router-redux';

export const TOGGLE_MODE = 'TOGGLE_VALIDATION'

export const ACCEPT_VALID = 'ACCEPT_VALID'

export const TOGGLE_NEW_RECORD = 'TOGGLE_NEW_RECORD'

export const UPDATE_REQUEST = 'UPDATE_REQUEST'

export const UPDATE_SITE = 'UPDATE_SITE'

export const REJECT_INVALID = 'REJECT_INVALID'

export const OPEN_ACCEPT_MODAL = 'OPEN_ACCEPT_MODAL'

export const CLOSE_ACCEPT_MODAL = 'CLOSE_ACCEPT_MODAL'

export const ACCEPT_LOGIN = 'ACCEPT_LOGIN'

export const ADD_REQUEST = 'ADD_REQUEST'

export const REMOVE_REQUEST = 'REMOVE_REQUEST'

export const REJECT_LOGIN = 'REJECT_LOGIN'

export const RESET = 'RESET'

export const SKIP = 'SKIP'

export const LOGGING_IN = 'LOGGING_IN'

export const toggleValidation = () => ( { type: TOGGLE_MODE } )

export const toggleNewRecord = () => ( { type: TOGGLE_NEW_RECORD } )

export const updateRequest = ({
  requestId,
  foundRequest,
  foundAt=null,
  method=null,
  data=null,
  form=null,
  commandEx1=null,
  commandEx2=null,
  notes=null,
  tags=null
}) => {
  return { type: UPDATE_REQUEST, requestId, foundRequest, foundAt, method, data, form, commandEx1, commandEx2, notes, tags  }
}

export const updateSite = ({
  id,
  url,
  requestIds
}) => {
  return { type: UPDATE_SITE, id, url, requestIds }
}

export const reset = () => ( { type: RESET } )

export const skip = () => ( { type: SKIP } )

export const addRequest = () => ( { type: ADD_REQUEST } )

export const removeRequest = (requestId) => ( { type: REMOVE_REQUEST, requestId } )

export const rejectInvalid = () => ( { type: REJECT_INVALID } )

export const openAcceptModal = () => ( { type: OPEN_ACCEPT_MODAL } )

export const closeAcceptModal = () => ( { type: CLOSE_ACCEPT_MODAL } )

export const loggingIn = () => ( { type: LOGGING_IN } )

export const acceptLogin = (token) => ({type: ACCEPT_LOGIN, token})

export const rejectLogin = (err) => ({type: REJECT_LOGIN, err})



export const requestNonceFromServer = ( googleResponse, route ) => {
  return ( dispatch ) => {
    fetch( `${apiUrl}/auth`, { method: 'POST', headers: { 'google-access-token': googleResponse.tokenId } } )
    .then(( response ) => {
      response.text()
        .then((body) => {
          dispatch(acceptLogin(body))
          dispatch(push(route))
        })
    })
    .catch(( err ) => {
      rejectLogin(err)
    })
  }
}

