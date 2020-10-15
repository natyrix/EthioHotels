import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import ErrorMessage from "../ErrorMessage";
import {useStoreActions, useStoreState} from "easy-peasy";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PausePresentationIcon from '@material-ui/icons/PausePresentation';
import ChangeRoom from "./ChangeRoom";


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

export default function RecRooms() {
  const classes = useStyles();
  const {rooms,message,room_types, loading, error, filter_room_types, selected_filter_room_types} = useStoreState(state => state.rec);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [roomState, setRoomState] = React.useState(rooms);
  const {getRoomType, getRooms, setFilterRoomTypes} = useStoreActions(actions => actions.rec);
  const [dialogContent, setDialogContent] = React.useState();
  const [editRoom, setEditRoom] = React.useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = React.useState('all');
  const [selectedRTFilter, setSelectedRTFilter] = React.useState('all');
  const [filterStatus, setFilterStatus] = React.useState(['CheckedIn', 'Free', 'Reserved']);
  React.useEffect(()=>{
    getRoomType();
    getRooms();
  }, []);
  const EditRoomDialog = ()=>{
    return (
      <>
        <div className='container'>
          <div className="card">
            {dialogContent}
          </div>
        </div>
      </>
    );
  };

  const handleClickOpen = (room, action) => {
    setEditRoom(room);
    setDialogContent(<ChangeRoom room={room} handleClose={handleClose} action={action}/>);
    setOpenEditDialog(true);
  };
  const handleClose = () => {
    setOpenEditDialog(false);
  };

  const RoomComponent = ()=>{
    return(
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Room Number</TableCell>
              <TableCell>Room Type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              (filterStatus.includes(room.status) && selected_filter_room_types.includes(room.room_type.room_type)) &&
              <TableRow key={room.id}>
                <TableCell>{room.room_no}</TableCell>
                <TableCell>{room.room_type.room_type}</TableCell>
                <TableCell>{room.room_type.price}</TableCell>
                <TableCell>{room.status}</TableCell>
                {room.status === 'Free' &&
                <TableCell>
                  <Button color='primary' onClick={()=>handleClickOpen(room, 'Check-In')}><CheckCircleIcon  titleAccess='Check-In'/></Button>
                  <Button color='default' onClick={()=>handleClickOpen(room, 'Reservation')}><PausePresentationIcon titleAccess='Reserve'/></Button></TableCell>}
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

  function handleRTFChange(e) {
    const rt = e.target.value;
    setSelectedRTFilter(rt);
    setFilterRoomTypes(rt);
  }



  function handleRSChange(e) {
    const st = e.target.value;
    setSelectedStatusFilter(st);
    switch (st) {
      case 'all':
        setFilterStatus(['CheckedIn', 'Free', 'Reserved']);
        break;
      case 'Free':
        setFilterStatus(['Free']);
        break;
      case 'CheckedIn':
        setFilterStatus(['CheckedIn']);
        break;
      case 'Reserved':
        setFilterStatus(['Reserved']);
        break;
    }
  }
  return (
    <div className=''>
      { (rooms.length !== 0 && filter_room_types.length !== 0) &&
      <>
        {(editRoom.length!==0 && openEditDialog)&&<EditRoomDialog/>}
        <hr/>
        {message.length !== 0 && <ErrorMessage error={message} severity='info'/>}
        {error.length !== 0 && <ErrorMessage error={error}/>}
        <div className='row'>
          <div className='col-4'>
            <h6>Filter with Room Type</h6>
            <select onChange={(e)=>handleRTFChange(e)} className='form-control' value={selectedRTFilter}>
              <option value='all'>All</option>
              {filter_room_types.map((rt,i)=>{
                return <option value={rt} key={i}>{rt}</option>
              })}
            </select>
          </div>
          <div className='col-4'>
            <h6>Filter with Room Status</h6>
            <select onChange={(e)=>handleRSChange(e)} className='form-control' value={selectedStatusFilter}>
              <option value='all'>All</option>
              <option value='Free'>Free</option>
              <option value='CheckedIn'>Checked In</option>
              <option value='Reserved'>Reserved</option>
            </select>
          </div>
        </div>
        <hr/>
        <div className="row">
          <RoomComponent/>
        </div>
      </>}
      {(!loading && rooms.length === 0 && room_types.length === 0)&&
      <ErrorMessage error='No room is registered under this hotel'/>
      }
    </div>
  );
}
