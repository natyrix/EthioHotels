import axios from 'axios'
import {action, thunk} from "easy-peasy";

const HelperModel = {
  loading: false,
  error: '',
  is_reg_completed: '',
  has_api:'',
  is_admin: '',
  slug:'',
  getIsRegCompleted: thunk(async (actions) => {
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.get(
        'http://127.0.0.1:8000/accounts/is_completed',{
          headers:{
            Authorization: `Token ${token}`
          }
        });
      actions.setIsRegCompleted(response.data);
    }catch (error) {
      const errMsg = error.message;
      actions.setError(errMsg)
    }
  }),
  getHasAPI: thunk(async (actions) => {
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.get(
        'http://127.0.0.1:8000/accounts/has_api',{
          headers:{
            Authorization: `Token ${token}`
          }
        });
      actions.setHasAPI(response.data);
    }catch (error) {
      const errMsg = error.message;
      actions.setError(errMsg)
    }
  }),
  getIsAdmin: thunk(async (actions) => {
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.get(
        'http://127.0.0.1:8000/accounts/is_admin',{
          headers:{
            Authorization: `Token ${token}`
          }
        });
      actions.setIsAdmin(response.data);
    }catch (error) {
      const errMsg = error.message;
      actions.setError(errMsg)
    }
  }),
  setIsAdmin: action((state, data)=>{
    state.loading = false;
    state.is_admin = data.is_admin;
  }),
  setLoading: action((state, x)=>{
    state.loading = x;
  }),
  setIsRegCompleted: action((state, data)=>{
    state.loading = false;
    state.is_reg_completed = data[0].is_reg_completed;
  }),
  setHasAPI: action((state, data)=>{
    state.loading = false;
    state.has_api = data[0].API !== null;
    state.slug = data[0].slug;
  }),
  setLogout: action(state => {
    state.has_api = '';
    state.is_admin = '';
    state.slug = '';
    state.is_reg_completed = '';
    state.error = '';

  }),
  setError: action( (state,error)=>{
    state.loading = false;
    state.error = error;
  }),
};
export default HelperModel