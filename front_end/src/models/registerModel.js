import {action, thunk} from "easy-peasy";
import axios from "axios";

const registerModel = {
    loading: false,
    success: 0,
    message: '',
    error: '',
    registerHotel: thunk(  (actions,data) => {
        actions.setLoading(true);
        const hotel = data.hotel;
        const clerk = data.clerk;
        axios.post('http://localhost:8000/accounts/hotels',{
            "hotel": hotel,
            "clerk": clerk
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
export default registerModel