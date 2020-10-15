import {LOAD_HOTEL_FAILURE, LOAD_HOTEL_REQUEST, LOAD_HOTEL_SUCCESS} from "./loadHotelTypes";

const initialState = {
  loading: false,
  success: 0,
  hotel: {},
  message: '',
  error: ''
}

const loadHotelReducer = (state=initialState, action) =>{
  switch (action.type) {
    case LOAD_HOTEL_REQUEST:
      return{
        ...state,
        loading: true
      }
    case LOAD_HOTEL_SUCCESS:
      return {
        loading: false,
        success: action.success,
        hotel: action.hotel,
        message: action.message,
        error: ''
      }
    case LOAD_HOTEL_FAILURE:
      return {
        loading: false,
        success: 0,
        message: '',
        hotel: {},
        error: action.payload
      }
    default: return state
  }
}
export default loadHotelReducer
