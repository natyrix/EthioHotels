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
import CheckIn from "./CheckIn";

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
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

export default function RecCheckIns() {
  const classes = useStyles();
  const { checkins, message, loading, error } = useStoreState(state => state.rec);
  const {getCheckIns} = useStoreActions(actions => actions.rec);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState();
  const [editChkIn, setChkIn] = React.useState('');
  React.useEffect(()=>{
    getCheckIns()
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
  const handleClickOpen = (chkin) => {
    setChkIn(chkin);
    setDialogContent(<CheckIn checkin={chkin} handleClose={handleClose}/>);
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
              <TableCell>Check In at:</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {checkins.map((chkin) => (
              <TableRow key={chkin.id} onClick={()=>handleClickOpen(chkin)} style={{cursor: 'pointer'}}>
                <TableCell>{chkin.room.room_no}</TableCell>
                <TableCell>{chkin.room.room_type.room_type}</TableCell>
                <TableCell>{chkin.guest.first_name} {chkin.guest.last_name}</TableCell>
                <TableCell>{new Date(chkin.start_date).toDateString()}</TableCell>
                <TableCell>{new Date(chkin.end_date).toDateString()}</TableCell>
                <TableCell>{chkin.receptionist.username}</TableCell>
                <TableCell>{new Date(chkin.created_at).toDateString()}</TableCell>
                <TableCell>
                  <Button color='primary' onClick={()=>handleClickOpen(chkin)}><MoreHorizIcon titleAccess='more info'/></Button>
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
      { (checkins.length ) &&
      <>
        {(checkins.length!==0 && openEditDialog)&&<EditRoomDialog/>}
        <hr/>
        {message.length !== 0 && <ErrorMessage error={message} severity='info'/>}
        <div className="row">
          <ChkInComponent/>
        </div>
      </>}
      {(!loading && checkins.length === 0)&&
      <ErrorMessage error='No check-ins'/>
      }
    </div>
  );
}
