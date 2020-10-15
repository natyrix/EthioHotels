import {action, thunk} from "easy-peasy";
import axios from 'axios'

const completeRegisterModel = {
  loading: false,
  success: 0,
  message: '',
  error: '',
  registerHotel: thunk(  (actions,data) => {
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    axios.post(
      'http://localhost:8000/accounts/complete_register',{
        "website": data.website,
        "has_website": data.has_website,
        "api": data.api,
        "has_api": data.has_api,
        "latitude": data.latitude,
        "longitude": data.longitude,
    },{
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(response =>{
        const payload = {
          success: response.data.success,
          message: response.data.message
        };
        actions.registerSuccess(payload)
      })
      .catch(error =>{
        const errMsg = error.message;
        actions.registerFailure(errMsg)
      })
  }),
  setLoading: action((state, x) => {
    state.loading = x;
  }),
  registerSuccess:action((state, payload)=>{
    state.loading = false;
    state.success = payload.success;
    state.message = payload.message;
    state.error = '';
  }),
  registerFailure:action((state, error)=>{
    state.loading = false;
    state.success = 0;
    state.message = '';
    state.error = error;
  }),
};
export default completeRegisterModel