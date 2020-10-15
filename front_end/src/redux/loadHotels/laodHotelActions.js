import {LOAD_HOTEL_FAILURE, LOAD_HOTEL_SUCCESS, LOAD_HOTEL_REQUEST} from "./loadHotelTypes";
import axios from 'axios'

export const loadHotelRequest = () => {
  return {
    type: LOAD_HOTEL_REQUEST
  }
}

const loadHotelSuccess = (success, hotel, message) => {
  return{
    type: LOAD_HOTEL_SUCCESS,
    success: success,
    hotel: hotel,
    message: message,
  }
}

const loadHotelFailure = (error) => {
  return{
    type: LOAD_HOTEL_FAILURE,
    payload: error
  }
}


export const loadHotel = (token) => {
  return(dispatch) => {
    dispatch(loadHotelRequest())
    axios.get(
        'http://localhost:8000/accounts/loadHotel',{
          headers: {
            Authorization: `Token ${token}`
          }
        })
        .then(response =>{
          const success = response.data.success
          const hotel = response.data.hotel
          const message = response.data.message
          dispatch(loadHotelSuccess(success, hotel, message))
        })
        .catch(error =>{
          const errMsg = error.message
          dispatch(loadHotelFailure(errMsg))
        })
  }
}

