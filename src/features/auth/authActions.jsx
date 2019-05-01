import { LOGIN_USER, SIGN_OUT_USER } from './authConstants'
import { closeModal } from '../modals/modalActions'


//在action中return function (在function中直接dispatch)
// return的function做了兩件事情 1. dispatch login  2.closeModal
export const login = (creds) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER, payload: { creds }})
    dispatch(closeModal())
  }
}


// export const login = (creds) => {
//   return {
//     type: LOGIN_USER,
//     payload: {creds}
//   }
// }

export const logout = () => {
  return {
    type: SIGN_OUT_USER
  }
}