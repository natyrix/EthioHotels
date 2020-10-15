import {action, thunk} from "easy-peasy";
import axios from "axios";

const loginModel = {
  loading: false,
  success: 0,
  token: '',
  message: '',
  error: '',
  slug:'',
  loginHotel:thunk((actions, data) => {
    actions.setLoading();
    const username = data.username;
    const password = data.password;
    axios.post('http://127.0.0.1:8000/accounts/login',{
      "username": username,
      "password": password
    })
      .then(response =>{
        const payload = {
          token: response.data.token,
          message: response.data.message,
          success: response.data.success,
          slug: response.data.slug
        };
        actions.loginActionSuccess(payload);
      })
      .catch(error =>{
        const errorMsg = error.message;
        actions.loginActionFailure(errorMsg)
      })
  }),
  setLoading: action(state => {
      state.loading = true
  }),
  loginActionSuccess: action((state, payload) => {
      state.loading = false;
      state.success = payload.success;
      state.token = payload.token;
      state.message = payload.message;
      state.slug = payload.slug;
      state.error = ''
  }),
  loginActionFailure: action((state, error)=>{
      state.loading = false;
      state.success = 0;
      state.token = '';
      state.message = '';
      state.error = error
  }),
  setSuccess: action((state, error='')=>{
    state.success = 0;
    state.message = error;
  })
};
export default loginModel