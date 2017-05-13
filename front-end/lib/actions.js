import { apiUrl } from '../config'
import { push } from 'react-router-redux';

export const TOGGLE_MODE = 'TOGGLE_VALIDATION'

export const ACCEPT_VALID = 'ACCEPT_VALID'

export const TOGGLE_NEW_RECORD = 'TOGGLE_NEW_RECORD'

export const UPDATE_INTERMEDIATE = 'UPDATE_INTERMEDIATE'

export const REJECT_INVALID = 'REJECT_INVALID'

export const OPEN_ACCEPT_MODAL = 'OPEN_ACCEPT_MODAL'

export const CLOSE_ACCEPT_MODAL = 'CLOSE_ACCEPT_MODAL'

export const ACCEPT_LOGIN = 'ACCEPT_LOGIN'

export const REJECT_LOGIN = 'REJECT_LOGIN'

export const LOGGING_IN = 'LOGGING_IN'

export const toggleValidation = () => ( { type: TOGGLE_MODE } )

export const toggleNewRecord = () => ( { type: TOGGLE_NEW_RECORD } )

export const updateIntermediate = ({
  id,
  request,
  foundAt=null,
  method=null,
  data=null,
  form=null,
  commandEx1=null,
  commandEx2=null,
  notes=null,
  tags=null
}) => {
  return { type: UPDATE_INTERMEDIATE, id, request, foundAt, method, data, form, commandEx1, commandEx2, notes, tags  }
}

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
  

