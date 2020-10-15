import { combineReducers } from "redux";
import loginReducer from './login/loginReducer'
import registerHotelReducer from './register/registerReducer'
import loadHotelReducer from './loadHotels/loadHotelReducer'


const rootReducer = combineReducers({
  login: loginReducer,
  register: registerHotelReducer,
  loadHotel: loadHotelReducer
})

export default rootReducer
