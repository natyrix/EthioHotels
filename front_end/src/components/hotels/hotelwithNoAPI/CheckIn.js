import React from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import {useStoreActions, useStoreState} from "easy-peasy";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import ErrorMessage from "../ErrorMessage";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function CheckIn({checkin, handleClose}) {
  const classes = useStyles();
  const [guestInfo] = React.useState({
    first_name: checkin.guest.first_name,
    last_name: checkin.guest.last_name,
    phone_number: checkin.guest.phone_number,
    identification_card_info: checkin.guest.identification_card_info,
  });
  const [roomInfo] = React.useState({
    room_no: checkin.room.room_no,
    room_type: checkin.room.room_type.room_type,
    price: checkin.room.room_type.price,
  });
  const [checkInInfo] = React.useState({
    start_date: checkin.start_date,
    end_date: checkin.end_date,
    check_in_at: `on ${new Date(checkin.created_at).toDateString()} at ${new Date(checkin.created_at).toTimeString()}`,
    check_in_by: checkin.receptionist.username,
  });
  const {message, edit_loading, error } = useStoreState(state => state.rec);
  const {releaseCheckIns, setReleaseCheckIn} = useStoreActions(actions => actions.rec);
  function handleRelease() {
    const form_data = new FormData();
    form_data.append('id', checkin.id);
    const data = {
      form_data: form_data
    };
    releaseCheckIns(data);
    setReleaseCheckIn(checkin.id);
    setTimeout(()=>{
      handleClose();
    },2000);
  }
  return (
    <>
      {
        edit_loading?
          <div className={classes.alignCenter}>
            <CircularProgress/>
          </div>:
          <>
            {error.length !== 0 && <ErrorMessage error={error}/>}
            {message.length !== 0 && <ErrorMessage error={message} severity='info'/>}
            <div className="card-body">
              <div className="row">
                <div className='col-4'>
                  <h5>Guest Information</h5>
                  <TextField
                    margin="dense"
                    label="First Name"
                    type="text"
                    value={guestInfo.first_name}
                    fullWidth
                    size='small'
                  />
                  <TextField
                    margin="dense"
                    label="Last Name"
                    type="text"
                    value={guestInfo.last_name}
                    fullWidth
                    size='small'
                  />
                  <TextField
                    margin="dense"
                    label="Phone Number"
                    type="text"
                    value={guestInfo.phone_number}
                    fullWidth
                    size='small'
                  />
                  <hr/>
                  <label className='form-group'>Identification card information:</label>
                  <textarea readOnly className='form-control' value={guestInfo.identification_card_info}></textarea>
                </div>
                <div className='col-4'>
                  <h5>Room Information</h5>
                  <TextField
                    margin="dense"
                    label="Room Number"
                    type="text"
                    value={roomInfo.room_no}
                    fullWidth
                    size='small'
                  />
                  <TextField
                    margin="dense"
                    label="Room Type"
                    type="text"
                    value={roomInfo.room_type}
                    fullWidth
                    size='small'
                  />
                  <TextField
                    margin="dense"
                    label="Price"
                    type="text"
                    value={roomInfo.price}
                    fullWidth
                    size='small'
                  />
                </div>
                <div className='col-4'>
                  <h5>CheckIn Info</h5>
                  <TextField
                    margin="dense"
                    label="Start Date"
                    type="text"
                    value={new Date(checkInInfo.start_date).toDateString()}
                    fullWidth
                    size='small'
                  />
                  <TextField
                    margin="dense"
                    label="End Date"
                    type="text"
                    value={new Date(checkInInfo.end_date).toDateString()}
                    fullWidth
                    size='small'
                  />
                  <TextField
                    margin="dense"
                    label="CheckIn at"
                    type="text"
                    value={checkInInfo.check_in_at}
                    fullWidth
                    size='small'
                  />
                  <TextField
                    margin="dense"
                    label="Receptionist"
                    type="text"
                    value={checkInInfo.check_in_by}
                    fullWidth
                    size='small'
                  />
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col">
                  <button onClick={handleRelease} className='btn btn-outline-success'>Release <i
                    className='fa fa-sign-out-alt'></i></button>
                </div>
              </div>
             </div>
          </>
      }
    </>
  )
}
