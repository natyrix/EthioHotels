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

export default function RoomType({room_type, handleClose}) {
  const classes = useStyles();
  const [editRoomType, setEditRoomType] = React.useState(room_type);
  const {edit_loading, error, message} = useStoreState(state => state.hotel);
  const [valErrMsg, setValErrMsg] = React.useState('');
  const {setEditRoomTypes, updateRoomType} = useStoreActions(actions => actions.hotel);
  function handleSubmit(e) {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append('id', editRoomType.id);
    form_data.append('price', editRoomType.price);
    form_data.append('room_type', editRoomType.room_type);
    const data = {
      form_data: form_data
    };
    updateRoomType(data);
    setEditRoomTypes({id:editRoomType.id, price: editRoomType.price, room_type: editRoomType.room_type});
    setTimeout(()=>{
      handleClose();
    },2000);
  }

  function handleChange(e) {
    const value = e.target.value;
    setEditRoomType({
      ...editRoomType,
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
                  id="room_type"
                  name="room_type"
                  label="Room Type"
                  type="text"
                  defaultValue={room_type.room_type}
                  required={true}
                  fullWidth
                  onChange={(e)=>handleChange(e)}
                />
                <TextField
                  margin="dense"
                  id="price"
                  name="price"
                  label="Price"
                  type="number"
                  defaultValue={room_type.price}
                  required={true}
                  fullWidth
                  onChange={(e)=>handleChange(e)}
                />
                <input className='btn btn-outline-primary mt-3' type='submit' value='Save'/>
              </form>
            </div>
          </>}
    </>
  )
}
