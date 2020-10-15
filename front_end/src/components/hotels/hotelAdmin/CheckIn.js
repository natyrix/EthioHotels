import React from 'react';
import TextField from "@material-ui/core/TextField/TextField";

export default function CheckIn({checkin}) {
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
  return (
    <>
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
      </div>
    </>
  )
}
