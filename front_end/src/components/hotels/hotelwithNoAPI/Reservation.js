import React from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import {useStoreActions, useStoreState} from "easy-peasy";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import ErrorMessage from "../ErrorMessage";

const useStyles = makeStyles({
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Reservation({reservation, handleClose}) {
  const classes = useStyles();
  const [guestInfo] = React.useState({
    first_name: reservation.guest.first_name,
    last_name: reservation.guest.last_name,
    phone_number: reservation.guest.phone_number,
    identification_card_info: reservation.guest.identification_card_info,
  });
  const [roomInfo] = React.useState({
    room_no: reservation.room.room_no,
    room_status: reservation.room.status,
    room_type: reservation.room.room_type.room_type,
    price: reservation.room.room_type.price,
  });
  const [reservationInInfo] = React.useState({
    start_date: reservation.start_date,
    end_date: reservation.end_date,
    reservation_at: `on ${new Date(reservation.created_at).toDateString()} at ${new Date(reservation.created_at).toTimeString()}`,
    reservation_by: reservation.receptionist.username,
  });
  const {message, edit_loading, error } = useStoreState(state => state.rec);
  const {releaseReservations, setReleaseRes} = useStoreActions(actions => actions.rec);

  function handleRelease() {
    const form_data = new FormData();
    form_data.append('id', reservation.id);
    const data = {
      form_data: form_data
    };
    releaseReservations(data);
    setReleaseRes(reservation.id);
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
                  <h5>Reservation Info</h5>
                  <TextField
                    margin="dense"
                    label="Start Date"
                    type="text"
                    value={new Date(reservationInInfo.start_date).toDateString()}
                    fullWidth
                    size='small'
                  />
                  <TextField
                    margin="dense"
                    label="End Date"
                    type="text"
                    value={new Date(reservationInInfo.end_date).toDateString()}
                    fullWidth
                    size='small'
                  />
                  <TextField
                    margin="dense"
                    label="Reservation at"
                    type="text"
                    value={reservationInInfo.reservation_at}
                    fullWidth
                    size='small'
                  />
                  <TextField
                    margin="dense"
                    label="Receptionist"
                    type="text"
                    value={reservationInInfo.reservation_by}
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
