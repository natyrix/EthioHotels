import {REGISTER_HOTEL_FAILURE, REGISTER_HOTEL_SUCCESS, REGISTER_HOTEL_REQUEST} from "./registerTypes";

const initialState = {
  loading: false,
  success: 0,
  message:'',
  error: ''
}


const registerHotelReducer = (state=initialState, action) => {
  switch (action.type) {
    case REGISTER_HOTEL_REQUEST:
      return{
        ...state,
        loading: true
      }
    case REGISTER_HOTEL_SUCCESS:
      return {
        loading: false,
        success: action.success,
        message: action.message,
        error: ''
      }
    case REGISTER_HOTEL_FAILURE:
      return {
        loading: false,
        success: 0,
        message: '',
        error: action.payload
      }
    default: return state
  }
}

export default registerHotelReducer


