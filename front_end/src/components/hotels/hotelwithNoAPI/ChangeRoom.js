import React from 'react';
import TextField from '@material-ui/core/TextField';
import {useStoreActions, useStoreState} from "easy-peasy";
import ErrorMessage from "../ErrorMessage";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/core/SvgIcon/SvgIcon";

const useStyles = makeStyles({
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function ChangeRoom({room, handleClose, action}) {
  const classes = useStyles();
  const [editRoom, setEditRoom] = React.useState(room);
  const [guest, setGuest] = React.useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    identification_card_info: ''
  });
  const [cDates, setCDates] = React.useState({
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date().toISOString().split("T")[0]
  });
  const {edit_loading, error, message} = useStoreState(state => state.rec);
  const [valErrMsg, setValErrMsg] = React.useState('');
  const {setUpdateRooms, updateRoom} = useStoreActions(actions => actions.rec);
  function chkdate(s, e) {
    console.log(s);
    console.log(e);
    if(parseInt(s[0])<=parseInt(e[0])){
      if(parseInt(s[0])<parseInt(e[0])){
        return true;
      }
      else {
        if(parseInt(s[1])<=parseInt(e[1])){
          if(parseInt(s[1])<parseInt(e[1])){
            return true;
          }
          else {
            if(parseInt(s[2])<parseInt(e[2])){
              return true;
            }
          }
        }else {
          return false;
        }
      }
    }else {
      return false;
    }
    return false;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const s_d = cDates.start_date.toString().split('-');
    const e_d = cDates.end_date.toString().split('-');
    if(chkdate(s_d, e_d)){
      setValErrMsg('');
      const form_data = new FormData();
      form_data.append('id', editRoom.id);
      form_data.append('action', action);
      form_data.append('first_name', guest.first_name);
      form_data.append('last_name', guest.last_name);
      form_data.append('phone_number', guest.phone_number);
      form_data.append('identification_card_info',guest.identification_card_info);
      form_data.append('start_date',cDates.start_date);
      form_data.append('end_date',cDates.end_date);
      const data = {
        id: editRoom.id,
        form_data: form_data
      };
      updateRoom(data);
      setUpdateRooms({id:editRoom.id, action:action});
      setTimeout(()=>{
        handleClose();
      },2000);
    }
    else {
      setValErrMsg(`${action} end date must be after check in start date`);
    }
  }

  function handleChange(e) {
    const value = e.target.value;
    setGuest({
      ...guest,
      [e.target.name]: value
    })
  }
  function handleDateChange(e) {
    const value = e.target.value;
    setCDates({
      ...cDates,
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
            <div className="card-header bg-light">
              <div className={classes.floatLeft}>
                <Button onClick={handleClose}><CancelIcon/></Button>
              </div>
              <h6>Make {action} on room {room.room_no}</h6>
            </div>
            {error.length !== 0 && <ErrorMessage error={error}/>}
            {message.length !== 0 && <ErrorMessage error={message} severity='info'/>}
            <div className="card-body">
              {valErrMsg.length!==0&& <ErrorMessage error={valErrMsg}/>}
              <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="row">
                  <div className="col">
                    <h6>Room Info</h6>
                    <TextField
                      margin="dense"
                      id="room_no"
                      name="room_no"
                      label="Room Number"
                      type="number"
                      value={room.room_no}
                      required={true}
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      id="room_type"
                      name="room_type"
                      label="Room Type"
                      type="text"
                      value={room.room_type.room_type}
                      required={true}
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      id="price"
                      name="price"
                      label="Room Price"
                      type="text"
                      value={room.room_type.price}
                      required={true}
                      fullWidth
                    />
                  </div>
                  <div className="col">
                    <h6>Enter Guest Information</h6>
                    <TextField
                      margin="dense"
                      id="first_name"
                      name="first_name"
                      label="First Name"
                      type="text"
                      defaultValue={guest.first_name}
                      required={true}
                      onChange={(e)=>handleChange(e)}
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      id="last_name"
                      name="last_name"
                      label="Last Name"
                      type="text"
                      defaultValue={guest.last_name}
                      required={true}
                      onChange={(e)=>handleChange(e)}
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      id="phone_number"
                      name="phone_number"
                      label="Phone Number"
                      type="text"
                      DefaultValue={guest.phone_number}
                      required={true}
                      onChange={(e)=>handleChange(e)}
                      fullWidth
                    />
                    <br/>
                    <div className="form-group">
                      <label>Identity card Info</label>
                      <textarea className='form-control' name='identification_card_info' required value={guest.identification_card_info} onChange={(e)=> handleChange(e)}></textarea>
                    </div>
                  </div>
                  <div className="col">
                    <h6>{action} Information</h6>
                    <br/>
                    <label>Start Date:<sup className='text-danger'>*</sup></label>
                    <input
                      type='date'
                      min={new Date().toISOString().split("T")[0]}
                      className='form-control'
                      value={cDates.start_date}
                      onChange={(e)=>handleDateChange(e)}
                      name='start_date'
                      required
                    />
                    <label>End Date:<sup className='text-danger'>*</sup></label>
                    <input
                      type='date'
                      min={new Date().toISOString().split("T")[0]}
                      className='form-control'
                      value={cDates.end_date}
                      onChange={(e)=>handleDateChange(e)}
                      name='end_date'
                      required
                    />
                  </div>
                </div>
                <input className='btn btn-outline-primary mt-3' type='submit' value='Save'/>
              </form>
            </div>
          </>}
    </>
  )
}
