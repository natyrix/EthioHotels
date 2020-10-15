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
import RoomType from "./RoomType";
import AddRoomType from "./AddRoomType";

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

export default function RoomTypes() {
  const classes = useStyles();
  const {room_types,message, loading, error, deleted } = useStoreState(state => state.hotel);
  const {getRoomType, setDeleteRoomTypes, deleteRoomType} = useStoreActions(actions => actions.hotel);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState();
  const [addDialogContent, setAddDialogContent] = React.useState();
  const [editRoomType, setEditRoomType] = React.useState('');
  React.useEffect(()=>{
    getRoomType();
  }, []);
  const EditRoomTypeDialog = ()=>{
    return (
      <>
        <div className='container'>
          <div className="card">
            <div className="card-header bg-light">
              <div className={classes.floatLeft}>
                <Button onClick={handleClose}><CancelIcon/></Button>
              </div>
              <h6>Edit Room Type</h6>
            </div>
            {dialogContent}
          </div>
        </div>
      </>
    );
  };
  const AddRoomTypeDialog = ()=>{
    return (
      <>
        <div className='container'>
          <div className="card">
            <div className="card-header bg-light">
              <div className={classes.floatLeft}>
                <Button onClick={handleAddRoomTypeClose}><CancelIcon/></Button>
              </div>
              <h6>Add Room Type</h6>
            </div>
            {addDialogContent}
          </div>
        </div>
      </>
    );
  };

  const handleClickOpen = (roomType) => {
    setEditRoomType(roomType);
    setDialogContent(<RoomType room_type={roomType} handleClose={handleClose}/>);
    setOpenEditDialog(true);
  };
  const handleClose = () => {
    setOpenEditDialog(false);
  };

  function handleDelete(roomType) {
    let answer = window.confirm(`Are you sure you want to delete this room type? All rooms related with it will be removed`);
    if(answer){
      deleteRoomType(roomType.id);
      if(deleted){
        setDeleteRoomTypes(roomType.id);
      }
    }
  }

  const RoomTypeComponent = ()=>{
    return(
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Room Type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {room_types.map((rt) => (
              <TableRow key={rt.id}>
                <TableCell>{rt.room_type}</TableCell>
                <TableCell>{rt.price}</TableCell>
                <TableCell>
                  <Button color='primary' onClick={()=>handleClickOpen(rt)}><EditIcon titleAccess='Edit'/></Button>
                  <Button color='secondary' onClick={()=> handleDelete(rt)}><DeleteIcon titleAccess='Delete'/></Button></TableCell>
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


  function handleAddRoomType() {
    setAddDialogContent(<AddRoomType handleAddClose={handleAddRoomTypeClose}/>);
    setOpenAddDialog(true);
  }
  function handleAddRoomTypeClose() {
    setOpenAddDialog(false);
  }
  return (
    <div className=''>
      { (openAddDialog) && <AddRoomTypeDialog/>}
      {(!openEditDialog && !openAddDialog) && <button onClick={handleAddRoomType} className='btn btn-outline-info'><AddIcon/> Add Room Type</button>}
      { (room_types.length !== 0 ) &&
      <>
        {(editRoomType.length!==0 && openEditDialog)&&<EditRoomTypeDialog/>}
        <hr/>
        {message.length !== 0 && <ErrorMessage error={message} severity='info'/>}
        <hr/>
        <div className="row">
          <RoomTypeComponent/>
        </div>
      </>}
      {(!loading && room_types.length === 0)&&
      <ErrorMessage error='No room type is registered under this hotel'/>
      }
    </div>
  );
}
