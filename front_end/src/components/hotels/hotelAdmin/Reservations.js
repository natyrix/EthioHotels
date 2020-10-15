import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Button from "@material-ui/core/Button";
import ErrorMessage from "../ErrorMessage";
import {useStoreActions, useStoreState} from "easy-peasy";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import CancelIcon from '@material-ui/icons/Cancel';
import Reservation from "./Reservation";

const useStyles = makeStyles({
  table: {

  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatLeft:{
    display: 'flex',
    alignItems: 'right',
    justifyContent: 'right',
  }
});

export default function Reservations() {
  const classes = useStyles();
  const { reservations, message, loading, error } = useStoreState(state => state.hotel);
  const {getReservations} = useStoreActions(actions => actions.hotel);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState();
  React.useEffect(()=>{
    getReservations();
  }, []);
  const EditRoomDialog = ()=>{
    return (
      <>
        <div className='container'>
          <div className="card">
            <div className="card-header bg-light">
              <div className={classes.floatLeft}>
                <Button onClick={handleClose}><CancelIcon/></Button>
              </div>
              <h6>More Information</h6>
            </div>
            {dialogContent}
          </div>
        </div>
      </>
    );
  };
  const handleClickOpen = (res) => {
    setDialogContent(<Reservation reservation={res}/>);
    setOpenEditDialog(true);
  };
  const handleClose = () => {
    setOpenEditDialog(false);
  };


  const ChkInComponent = ()=>{
    return(
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Room Number</TableCell>
              <TableCell>Room Type</TableCell>
              <TableCell>Guest Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Receptionist</TableCell>
              <TableCell>Reserved In at:</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((res) => (
              <TableRow key={res.id} onClick={()=>handleClickOpen(res)} style={{cursor: 'pointer'}}>
                <TableCell>{res.room.room_no}</TableCell>
                <TableCell>{res.room.room_type.room_type}</TableCell>
                <TableCell>{res.guest.first_name} {res.guest.last_name}</TableCell>
                <TableCell>{new Date(res.start_date).toDateString()}</TableCell>
                <TableCell>{new Date(res.end_date).toDateString()}</TableCell>
                <TableCell>{res.receptionist.username}</TableCell>
                <TableCell>{new Date(res.created_at).toDateString()}</TableCell>
                <TableCell>
                  <Button color='primary' onClick={()=>handleClickOpen(res)}><MoreHorizIcon titleAccess='more info'/></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  if(loading){
    return (
      <div className={classes.alignCenter}>
        <CircularProgress/>
      </div>
    );
  }

  return (
    <div className=''>
      { (reservations.length !== 0) &&
      <>
        {(reservations.length!==0 && openEditDialog)&&<EditRoomDialog/>}
        <hr/>
        {message.length !== 0 && <ErrorMessage error={message} severity='info'/>}
        <div className="row">
          <ChkInComponent/>
        </div>
      </>}
      {(!loading && reservations.length === 0)&&
      <ErrorMessage error='No receptionist is registered under this hotel'/>
      }
    </div>
  );
}
