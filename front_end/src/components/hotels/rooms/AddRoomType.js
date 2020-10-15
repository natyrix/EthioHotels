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

export default function AddRoomType({handleAddClose}) {
  const classes = useStyles();
  const {add_loading, error, add_message} = useStoreState(state => state.hotel);
  const [addroomType, setRoomType] = React.useState({
    room_type:'',
    price:''
  });
  const [valErrMsg, setValErrMsg] = React.useState('');
  const {AddRoomType, getRoomType} = useStoreActions(actions => actions.hotel);
  function handleSubmit(e) {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append('price', addroomType.price);
    form_data.append('room_type', addroomType.room_type);
    const data = {
      form_data: form_data
    };
    AddRoomType(data);
    getRoomType();
  }

  function handleChange(e) {
    const value = e.target.value;
    setRoomType({
      ...addroomType,
      [e.target.name]: value
    })
  }
  return (
    <>
      {
        add_loading?
          <div className={classes.alignCenter}>
            <CircularProgress/>
          </div>
          :<>
            {error.length !== 0 && <ErrorMessage error={error}/>}
            {add_message.length !== 0 && <ErrorMessage error={add_message} severity='info'/>}
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
                  defaultValue={addroomType.room_type}
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
                  defaultValue={addroomType.price}
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
