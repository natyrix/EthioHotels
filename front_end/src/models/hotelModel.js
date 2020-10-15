import { action,thunk } from "easy-peasy";
import axios from 'axios'

const HotelModel = {
  loading: false,
  edit_loading: false,
  add_loading: false,
  deleted: false,
  error: '',
  message: '',
  add_message: '',
  ratings: [],
  reviews: [],
  gallery: [],
  checkins: [],
  reservations: [],
  receptionists: [],
  room_types: [],
  filter_room_types: [],
  selected_filter_room_types: [],
  rooms: [],
  account: {
    id: '',
    name: '',
    email: '',
    cover_img_location: "/media/photos/default-logo.png",
    phone: '',
    city: '',
    description: '',
  },
  getReservations: thunk(async (actions) => {
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.get(
        'http://localhost:8000/api/hotels/hotel_reservations',{
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
  getCheckIns: thunk(async (actions) => {
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.get(
        'http://localhost:8000/api/hotels/hotel_checkins',{
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
  AddReceptionist: thunk(async (actions, data)=>{
    actions.setAddLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.post(
        `http://localhost:8000/api/hotels/hotel_receptionists/`,data.form_data,{
          headers:{
            Authorization: `Token ${token}`
          }
        });
      actions.setAddMessage(response.data);
    }catch (error) {
      console.log(error);
      console.log(error.response);
      const errMsg = error.message;
      actions.setError(errMsg)
    }
  }),
  deleteReceptionist: thunk(async (actions, id)=>{
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.delete(
        `http://localhost:8000/api/hotels/hotel_receptionists/${id}/`,{
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
  getReceptionists: thunk(async (actions) => {
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.get(
        'http://localhost:8000/api/hotels/hotel_receptionists',{
          headers:{
            Authorization: `Token ${token}`
          }
        });
      actions.setReceptionists(response.data);
    }catch (error) {
      const errMsg = error.message;
      actions.setError(errMsg)
    }
  }),
  updateReceptionistPass: thunk(async (actions, data)=>{
    actions.setEditLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.patch(
        `http://localhost:8000/api/hotels/hotel_receptionists/${data.id}/`,data.form_data,{
          headers:{
            Authorization: `Token ${token}`
          }
        });
      actions.setMessage(response.data);
    }catch (error) {
      console.log(error.response);
      const errMsg = error.message;
      actions.setError(errMsg)
    }
  }),
  updateReceptionist: thunk(async (actions, data)=>{
    actions.setEditLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.patch(
        `http://localhost:8000/api/hotels/hotel_receptionists/`,data.form_data,{
          headers:{
            Authorization: `Token ${token}`
          }
        });
      actions.setMessage(response.data);
    }catch (error) {
      console.log(error.response);
      const errMsg = error.message;
      actions.setError(errMsg)
    }
  }),
  updateRoomType: thunk(async (actions, data)=>{
    actions.setEditLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.patch(
        `http://localhost:8000/api/hotels/hotel_room_types/`,data.form_data,{
          headers:{
            Authorization: `Token ${token}`
          }
        });
      actions.setMessage(response.data);
    }catch (error) {
      console.log(error.response);
      const errMsg = error.message;
      actions.setError(errMsg)
    }
  }),
  getRoomType: thunk(async (actions) => {
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.get(
        'http://localhost:8000/api/hotels/hotel_room_types',{
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
  getRooms: thunk(async (actions) => {
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.get(
        'http://localhost:8000/api/hotels/hotel_rooms',{
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
  deleteRoomType: thunk(async (actions, id)=>{
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.delete(
        `http://localhost:8000/api/hotels/hotel_room_types/${id}/`,{
          headers:{
            Authorization: `Token ${token}`
          }
        });
      actions.setDRTMessage(response.data);
    }catch (error) {
      const errMsg = error.message;
      actions.setError(errMsg)
    }
  }),
  AddRoomType: thunk(async (actions, data)=>{
    actions.setAddLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.post(
        `http://localhost:8000/api/hotels/hotel_room_types/`,data.form_data,{
          headers:{
            Authorization: `Token ${token}`
          }
        });
      actions.setAddMessage(response.data);
    }catch (error) {
      console.log(error);
      console.log(error.response);
      const errMsg = error.message;
      actions.setError(errMsg)
    }
  }),
  updateRoom: thunk(async (actions, data)=>{
    actions.setEditLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.patch(
        `http://localhost:8000/api/hotels/hotel_rooms/`,data.form_data,{
          headers:{
            Authorization: `Token ${token}`
          }
        });
      actions.setMessage(response.data);
    }catch (error) {
      console.log(error.response);
      const errMsg = error.message;
      actions.setError(errMsg)
    }
  }),
  AddRoom: thunk(async (actions, data)=>{
    actions.setAddLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.post(
        `http://localhost:8000/api/hotels/hotel_rooms/`,data.form_data,{
          headers:{
            Authorization: `Token ${token}`
          }
        });
      actions.setAddMessage(response.data);
    }catch (error) {
      console.log(error);
      console.log(error.response);
      const errMsg = error.message;
      actions.setError(errMsg)
    }
  }),
  deleteRoom: thunk(async (actions, id)=>{
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    try{
      const response = await axios.delete(
        `http://localhost:8000/api/hotels/hotel_rooms/${id}/`,{
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
  getAccount: thunk((actions)=>{
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    axios.get(
      'http://localhost:8000/api/hotels/hotel_account',{
        headers:{
          Authorization: `Token ${token}`
        }
      }).then(response=>{
      actions.setAccount(response.data)
    }).catch(error=>{
      const errMsg = error.message;
      actions.setError(errMsg)
    })
  }),
  updateAccount: thunk((actions, data)=>{
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    axios.patch(`http://localhost:8000/api/hotels/hotel_account/${data.id}/`,data.form_data,{
      headers:{
        Authorization: `Token ${token}`,
        'content-type': 'multipart/form-data'
      }
    }).then(response=>{
        actions.setAccount(response.data);
      }
    ).catch(error=>{
      const errMsg = error.message;
      actions.setError(errMsg)
    })
  }),
  updateAccountPass: thunk((actions, data)=>{
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    axios.patch(`http://localhost:8000/api/hotels/hotel_account/pw/${data.id}/`,data.form_data,{
      headers:{
        Authorization: `Token ${token}`,
        'content-type': 'multipart/form-data'
      }
    }).then(response=>{
        actions.setMessage(response.data);
      }
    ).catch(error=>{
      const errMsg = error.message;
      actions.setError(errMsg)
    })
  }),
  uploadImage: thunk((actions, form_data)=>{
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    axios.post('http://localhost:8000/api/hotels_with_api/hotel_gallery/',form_data,{
      headers:{
        Authorization: `Token ${token}`,
        'content-type': 'multipart/form-data'
      }
    }).then(response=>{
      actions.setMessage(response.data);
      }
    ).catch(error=>{
      const errMsg = error.message;
      actions.setError(errMsg)
    })
  }),
  deleteImage: thunk((actions, pk) => {
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    axios.delete(`http://localhost:8000/api/hotels/hotel_gallery/${pk}/`,{
      headers:{
        Authorization: `Token ${token}`
      }
    }).then(response=>{
      const msg = {
        'message': "Deleted successfully!",
        'pk':pk
      };
      actions.setDMessage(msg);
    })
      .catch(error=>{
        const errMsg = error.message;
        actions.setError(errMsg)
      })
  }),
  getGallery: thunk((actions)=>{
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    axios.get(
      'http://localhost:8000/api/hotels/hotel_gallery',{
        headers:{
          Authorization: `Token ${token}`
        }
      }).then(response=>{
        actions.setGallery(response.data)
    }).catch(error=>{
      const errMsg = error.message;
      actions.setError(errMsg)
      })
  }),
  getRatingAndReviews: thunk((actions)=>{
    actions.setLoading(true);
    const token = localStorage.getItem('Tok');
    axios.all([
      axios.get(
        'http://localhost:8000/api/hotels/ratings',{
          headers:{
            Authorization: `Token ${token}`
          }
        }
      ),
      axios.get(
        'http://localhost:8000/api/hotels/reviews',{
          headers:{
            Authorization: `Token ${token}`
          }
        }
      ),
    ]).then(responseArr=>{
      actions.setRating(responseArr[0].data);
      actions.setReviews(responseArr[1].data);
    }).catch(error =>{
      const errMsg = error.message;
      actions.setError(errMsg)
    })
  }),
  setReceptionists: action((state, data)=>{
    state.loading = false;
    state.error = '';
    state.receptionists = data
  }),
  setCheckIns: action((state, data)=>{
    state.loading = false;
    state.error = '';
    state.checkins = data
  }),
  setReservations: action((state, data)=>{
    state.loading = false;
    state.error = '';
    state.reservations = data
  }),
  setDeleteReceptionist: action((state,id)=>{
    state.receptionists = state.receptionists.filter(r=>{
      return r.id !== id
    })
  }),
  setEditRoomTypes: action((state, data)=>{
    const index = state.room_types.findIndex(r=>r.id===data.id);
    let newRoomTypes = [...state.room_types];
    newRoomTypes[index] = {
      ...newRoomTypes[index],
      price: data.price,
      room_type: data.room_type
    };
    state.room_types = newRoomTypes;
  }),
  setDeleteRoomTypes: action((state,id)=>{
    state.room_types = state.room_types.filter(r=>{
      return r.id !== id
    })
    state.deleted = false;
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
  setRooms: action((state, data)=>{
    state.loading = false;
    state.error = '';
    state.rooms = data;
  }),
  setEditRooms: action((state, data)=>{
    const index = state.rooms.findIndex(r=>r.id===data.id);
    let newRooms = [...state.rooms];
    const rtt = state.room_types.filter(rt=>{
      return rt.room_type === data.room_type
    });
    newRooms[index] = {
      ...newRooms[index],
      room_no:data.room_no,
      room_type: rtt[0]
    };
    state.rooms = newRooms;
  }),
  setDeleteRooms: action((state, id)=>{
    state.rooms = state.rooms.filter(r=>{
      return r.id !== id
    });
  }),
  setDMessage: action((state, payload) => {
    state.loading = false;
    state.error = '';
    state.message = payload.message;
    state.gallery = state.gallery.filter((g)=>{
      return g.id !== payload.pk
    })
  }),
  setMessage: action((state, payload) => {
    state.loading = false;
    state.edit_loading = false;
    state.add_loading = false;
    state.error = '';
    state.message = payload.message;
  }),
  setDRTMessage: action((state, payload) => {
    state.loading = false;
    state.edit_loading = false;
    state.add_loading = false;
    state.error = '';
    state.deleted = '';
    state.message = payload.message;
  }),
  setAddMessage: action((state, payload) => {
    state.loading = false;
    state.edit_loading = false;
    state.add_loading = false;
    state.error = '';
    state.add_message = payload.message;
  }),
  setLoading: action((state, x)=>{
    state.loading = x;
  }),
  setEditLoading: action((state, x)=>{
    state.edit_loading = x;
  }),
  setAddLoading: action((state, x)=>{
    state.add_loading = x;
  }),
  setRating: action((state,ratings)=>{
    state.loading = false;
    state.ratings = ratings;
    state.error = '';
    state.message = '';
  }),
  setReviews: action((state,reviews)=>{
    state.loading = false;
    state.reviews = reviews;
    state.error = '';
    state.message = '';
  }),
  setGallery: action((state,gallery)=>{
    state.loading = false;
    state.gallery = gallery;
    state.error = '';
    state.message = '';
  }),
  setAccount: action((state,account)=>{
    state.loading = false;
    state.account = account;
    state.error = '';
    state.message = '';
  }),
  setClear: action(state => {
    state.message = '';
    state.add_message = '';
  }),
  setError: action( (state,error)=>{
    state.loading = false;
    state.error = error;
    state.edit_loading = false;
    state.add_loading = false;
    state.message = '';
    state.add_message = '';
  }),
};
export default HotelModel