import {LOGIN_USERS_SUCCESS, LOGIN_USERS_FAILURE, LOGIN_USERS_REQUEST} from "./loginTypes";
import axios from 'axios'

export const loginUserRequest = () => {
  return {
    type: LOGIN_USERS_REQUEST
  }
}

const loginUserSuccess = (token, message, success) => {
  return {
    type: LOGIN_USERS_SUCCESS,
    payload: token,
    message: message,
    success: success
  }
}

const loginUserFailure = (error) => {
  return {
    type: LOGIN_USERS_FAILURE,
    payload: error
  }
}

export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatch(loginUserRequest())
    axios.post('http://127.0.0.1:8000/accounts/login',{
      "username": username,
      "password": password
    })
        .then(response => {
          const tok = response.data.token
          const message = response.data.message
          const success = response.data.success
          dispatch(loginUserSuccess(tok, message, success))
        })
        .catch(error=>{
          const errMsg = error.message
          dispatch(loginUserFailure(errMsg))
        })
  }
}

