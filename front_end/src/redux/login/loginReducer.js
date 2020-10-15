import { LOGIN_USERS_FAILURE, LOGIN_USERS_SUCCESS, LOGIN_USERS_REQUEST} from "./loginTypes";

const initialState= {
  loading: false,
  success: 0,
  token: '',
  message:'',
  error: ''
};

const loginReducer = (state=initialState, action) => {
  switch (action.type) {
    case LOGIN_USERS_REQUEST:
      return{
        ...state,
        loading: true
      }
    case LOGIN_USERS_SUCCESS:
      return {
        loading: false,
        token: action.payload,
        message: action.message,
        success: action.success,
        error: ''
      }
    case LOGIN_USERS_FAILURE:

      return {
        loading: false,
        token: '',
        message:'',
        success: 0,
        error:action.payload
      }
    default: return state
  }
}
export default loginReducer

