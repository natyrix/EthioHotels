import { REGISTER_HOTEL_SUCCESS, REGISTER_HOTEL_FAILURE, REGISTER_HOTEL_REQUEST} from "./registerTypes";
import axios from 'axios'

export const registerHotelRequest = () =>{
  return {
    type: REGISTER_HOTEL_REQUEST
  }
}

const registerHotelSuccess = (message, success) =>{
  return{
    type: REGISTER_HOTEL_SUCCESS,
    message: message,
    success: success
  }
}

const registerHotelFailure = (error) =>{
  return{
    type: REGISTER_HOTEL_FAILURE,
    payload: error
  }
}

export const registerHotel = (hotel, clerk) =>{
  return (dispatch)=>{
    dispatch(registerHotelRequest())
    axios.post('http://localhost:8000/accounts/hotels',{
      "hotel": hotel,
      "clerk": clerk
    })
        .then(response => {
          console.log(response)
          const success = response.data.success
          const message = response.data.message
          dispatch(registerHotelSuccess(message, success))
        })
        .catch(error=>{
          const errMsg = error.message
          dispatch(registerHotelFailure(errMsg))
        })
  }
}


