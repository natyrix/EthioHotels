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
import Room from "./Room";
import AddIcon from '@material-ui/icons/Add';
import AddRoom from "./AddRoom";

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

export default function Rooms() {
  const classes = useStyles();
  const {room_types,rooms,message, loading, error, filter_room_types, selected_filter_room_types} = useStoreState(state => state.hotel);
  const {getRoomType, getRooms, setFilterRoomTypes, deleteRoom, setDeleteRooms} = useStoreActions(actions => actions.hotel);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [roomState, setRoomState] = React.useState(rooms);
  const [dialogContent, setDialogContent] = React.useState();
  const [addDialogContent, setAddDialogContent] = React.useState();
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
            <div className="card-header bg-light">
              <div className={classes.floatLeft}>
                <Button onClick={handleClose}><CancelIcon/></Button>
              </div>
              <h6>Edit Room</h6>
            </div>
            {dialogContent}
          </div>
        </div>
      </>
    );
  };
  const AddRoomDialog = ()=>{
    return (
      <>
        <div className='container'>
          <div className="card">
            <div className="card-header bg-light">
              <div className={classes.floatLeft}>
                <Button onClick={handleAddRoomClose}><CancelIcon/></Button>
              </div>
              <h6>Add Room</h6>
            </div>
            {addDialogContent}
          </div>
        </div>
      </>
    );
  };

  const handleClickOpen = (room) => {
    setEditRoom(room);
    setDialogContent(<Room room={room} handleClose={handleClose}/>);
    setOpenEditDialog(true);
  };
  const handleClose = () => {
    setOpenEditDialog(false);
  };

  function handleDelete(room) {
    let answer = window.confirm(`Are you sure you want to delete room with room number ${room.room_no}?`);
    if(answer){
      deleteRoom(room.id);
      setDeleteRooms(room.id);
    }
  }

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
                  <Button color='primary' onClick={()=>handleClickOpen(room)}><EditIcon titleAccess='Edit'/></Button>
                  <Button color='secondary' onClick={()=> handleDelete(room)}><DeleteIcon titleAccess='Delete'/></Button></TableCell>}
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

  function handleAddRoom() {
    setAddDialogContent(<AddRoom handleAddClose={handleAddRoomClose}/>);
    setOpenAddDialog(true);
  }
  function handleAddRoomClose() {
    setOpenAddDialog(false);
  }
  return (
    <div className=''>
      { (openAddDialog) && <AddRoomDialog/>}
      {(!openEditDialog && !openAddDialog) && <button onClick={handleAddRoom} className='btn btn-outline-info'><AddIcon/> Add Room</button>}
      { (rooms.length !== 0 && filter_room_types.length !== 0) &&
        <>
          {(editRoom.length!==0 && openEditDialog)&&<EditRoomDialog/>}
          <hr/>
          {message.length !== 0 && <ErrorMessage error={message} severity='info'/>}
          <div className='row'>
            <div className='col-4'>
              <select onChange={(e)=>handleRTFChange(e)} className='form-control' value={selectedRTFilter}>
                <option value='all'>All</option>
                {filter_room_types.map((rt,i)=>{
                  return <option value={rt} key={i}>{rt}</option>
                })}
              </select>
            </div>
            <div className='col-4'>
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
