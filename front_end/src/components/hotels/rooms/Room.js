import React from 'react';
import TextField from '@material-ui/core/TextField';
import {useStoreActions, useStoreState} from "easy-peasy";
import ErrorMessage from "../ErrorMessage";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Room({room, handleClose}) {
  let rrt = room.room_type.room_type;
  room = {
    ...room,
    room_type:room.room_type.room_type
  };
  const classes = useStyles();
  const [editRoom, setEditRoom] = React.useState(room);
  const {filter_room_types, edit_loading, error, message} = useStoreState(state => state.hotel);
  const [valErrMsg, setValErrMsg] = React.useState('');
  const {updateRoom, setEditRooms} = useStoreActions(actions => actions.hotel);
  function handleSubmit(e) {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append('id', editRoom.id);
    form_data.append('room_no', editRoom.room_no);
    form_data.append('room_type', editRoom.room_type);
    const data = {
      id: editRoom.id,
      form_data: form_data
    };
    updateRoom(data);
    setEditRooms({id:editRoom.id, room_no: editRoom.room_no, room_type: editRoom.room_type});
    setTimeout(()=>{
      handleClose();
    },2000);
  }

  function handleChange(e) {
    const value = e.target.value;
    setEditRoom({
      ...editRoom,
      [e.target.name]: value
    })
  }
  return (
    <>
      {
        edit_loading?
          <div className={classes.alignCenter}>
            <CircularProgress/>
          </div>
      :<>
        {error.length !== 0 && <ErrorMessage error={error}/>}
        {message.length !== 0 && <ErrorMessage error={message} severity='info'/>}
        <div className="card-body">
          {valErrMsg.length!==0&& <ErrorMessage error={valErrMsg}/>}
          <form onSubmit={(e)=>handleSubmit(e)}>
            <TextField
              autoFocus
              margin="dense"
              id="room_no"
              name="room_no"
              label="Room Number"
              type="number"
              defaultValue={room.room_no}
              required={true}
              fullWidth
              onChange={(e)=>handleChange(e)}
            />
            <label>Room Type: </label>
            <select onChange={(e)=>handleChange(e)} className='form-control' name='room_type' defaultValue={rrt}>
              {filter_room_types.map((rt,i)=>{
                return <option value={rt} key={i}>{rt}</option>
              })}
            </select>
            <input className='btn btn-outline-primary mt-3' type='submit' value='Save'/>
          </form>
        </div>
      </>}
    </>
  )
}
