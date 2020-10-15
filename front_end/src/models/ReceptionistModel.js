import {action, thunk} from "easy-peasy";
import axios from "axios";

const ReceptionistModel = {
  rooms: [],
  edit_loading: false,
  error: '',
  message: '',
  room_types: [],
  checkins: [],
  reservations: [],
  filter_room_types: [],
  selected_filter_room_types: [],
  loading: false,
  getReservations: thunk(async (actions) => {
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.get(
        'http://localhost:8000/api/hotels/rec/hotel_reservations/',{
          headers:{
            Authorization: `Token ${token}`
          }
        });
      actions.setReservations(response.data);
    }catch (error) {
      const errMsg = error.message;
      actions.setError(errMsg)
    }
  }),
  releaseReservations: thunk(async (actions, data) => {
    actions.setEditLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.patch(
        'http://localhost:8000/api/hotels/rec/hotel_reservations/',data.form_data,{
          headers:{
            Authorization: `Token ${token}`
          }
        });
      actions.setMessage(response.data);
    }catch (error) {
      const errMsg = error.message;
      actions.setError(errMsg)
    }
  }),
  releaseCheckIns: thunk(async (actions, data) => {
    actions.setEditLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.patch(
        'http://localhost:8000/api/hotels/rec/hotel_checkins/',data.form_data,{
          headers:{
            Authorization: `Token ${token}`
          }
        });
      actions.setMessage(response.data);
    }catch (error) {
      const errMsg = error.message;
      actions.setError(errMsg)
    }
  }),
  getCheckIns: thunk(async (actions) => {
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.get(
        'http://localhost:8000/api/hotels/rec/hotel_checkins/',{
          headers:{
            Authorization: `Token ${token}`
          }
        });
      actions.setCheckIns(response.data);
    }catch (error) {
      const errMsg = error.message;
      actions.setError(errMsg)
    }
  }),
  getRooms: thunk(async (actions) => {
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.get(
        'http://localhost:8000/api/hotels/rec/hotel_rooms',{
          headers:{
            Authorization: `Token ${token}`
          }
        });
      actions.setRooms(response.data);
    }catch (error) {
      const errMsg = error.message;
      actions.setError(errMsg)
    }
  }),
  updateRoom: thunk(async (actions, data) => {
    actions.setEditLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.patch(
        'http://localhost:8000/api/hotels/rec/hotel_rooms/',data.form_data,{
          headers:{
            Authorization: `Token ${token}`
          }
        });
      actions.setMessage(response.data);
    }catch (error) {
      const errMsg = error.message;
      actions.setError(errMsg)
    }
  }),
  getRoomType: thunk(async (actions) => {
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.get(
        'http://localhost:8000/api/hotels/rec/hotel_room_types',{
          headers:{
            Authorization: `Token ${token}`
          }
        });
      actions.setRoomTypes(response.data);
    }catch (error) {
      const errMsg = error.message;
      actions.setError(errMsg)
    }
  }),
  setRoomTypes: action((state, data)=>{
    state.loading = false;
    state.error = '';
    state.room_types = data;
    state.filter_room_types = data.map(obj=>{
      return obj.room_type;
    });
    state.selected_filter_room_types = state.filter_room_types;
  }),
  setReservations: action((state, data)=>{
    state.loading = false;
    state.error = '';
    state.reservations = data
  }),
  setFilterRoomTypes: action((state,op)=>{
    if(op === 'all'){
      state.selected_filter_room_types = state.filter_room_types;
    }
    else {
      state.selected_filter_room_types = state.filter_room_types.filter((rt)=>{
        return rt === op
      });
    }
  }),
  setUpdateRooms: action((state, data)=>{
    const index = state.rooms.findIndex(r=>r.id===data.id);
    let newRooms = [...state.rooms];
    newRooms[index] = {
      ...newRooms[index],
      status: data.action === 'Check-In'? 'CheckedIn': 'Reserved'
    };
    state.rooms = newRooms;
  }),
  setLoading: action((state, x)=>{
    state.loading = x;
  }),
  setCheckIns: action((state, data)=>{
    state.loading = false;
    state.error = '';
    state.checkins = data
  }),
  setRooms: action((state, data)=>{
    state.loading = false;
    state.error = '';
    state.rooms = data;
  }),
  setEditLoading: action((state, x)=>{
    state.edit_loading = x;
  }),
  setMessage: action((state, payload) => {
    state.loading = false;
    state.edit_loading = false;
    state.error = '';
    state.message = payload.message;
  }),
  setReleaseRes: action((state, id)=>{
    state.reservations = state.reservations.filter((r)=>{
      return r.id !== id
    })
  }),
  setReleaseCheckIn: action((state, id)=>{
    state.checkins = state.checkins.filter((c)=>{
      return c.id !== id
    })
  }),
  setClear: action(state => {
    state.message = '';
  }),
  setError: action( (state,error)=>{
    state.loading = false;
    state.error = error;
    state.edit_loading = false;
    state.message = '';
  }),
};
export default ReceptionistModel