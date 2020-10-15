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

export default function AddRoom({handleAddClose}) {
  const classes = useStyles();
  const {filter_room_types, add_loading, error, add_message} = useStoreState(state => state.hotel);
  const [addroom, setRoom] = React.useState({
    room_no:'',
    room_type:filter_room_types[0]
  });
  const [valErrMsg, setValErrMsg] = React.useState('');
  const {AddRoom, getRooms} = useStoreActions(actions => actions.hotel);
  function handleSubmit(e) {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append('room_no', addroom.room_no);
    form_data.append('room_type', addroom.room_type);
    const data = {
      form_data: form_data
    };
    AddRoom(data);
    getRooms()
  }

  function handleChange(e) {
    const value = e.target.value;
    setRoom({
      ...addroom,
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
                  id="room_no"
                  name="room_no"
                  label="Room Number"
                  type="number"
                  defaultValue={addroom.room_no}
                  required={true}
                  fullWidth
                  onChange={(e)=>handleChange(e)}
                />
                <label>Room Type: </label>
                <select onChange={(e)=>handleChange(e)} className='form-control' name='room_type' defaultValue={addroom.room_type}>
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
