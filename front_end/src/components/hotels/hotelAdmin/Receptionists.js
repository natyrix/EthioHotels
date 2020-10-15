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
import Receptionist from "./Receptionist";

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

export default function Receptionists() {
  const classes = useStyles();
  const {receptionists, message, loading, error, } = useStoreState(state => state.hotel);
  const {setDeleteReceptionist, deleteReceptionist,getReceptionists} = useStoreActions(actions => actions.hotel);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState();
  const [editRec, setEditRec] = React.useState('');
  React.useEffect(()=>{
    getReceptionists();
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
  const handleClickOpen = (rec) => {
    setEditRec(rec);
    setDialogContent(<Receptionist handleClose={handleClose} rec={rec}/>);
    setOpenEditDialog(true);
  };
  const handleClose = () => {
    setOpenEditDialog(false);
  };

  function handleDelete(rec) {
    let answer = window.confirm(`Are you sure you want to delete this receptionist from this hotel?`);
    if(answer){
      deleteReceptionist(rec.id);
      setDeleteReceptionist(rec.id)
    }
  }

  const RecComponent = ()=>{
    return(
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date Joined</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receptionists.map((rec) => (
              <TableRow key={rec.id}>
                <TableCell>{rec.receptionist.first_name}</TableCell>
                <TableCell>{rec.receptionist.last_name}</TableCell>
                <TableCell>{rec.receptionist.username}</TableCell>
                <TableCell>{rec.receptionist.email}</TableCell>
                <TableCell>{new Date(rec.receptionist.date_joined).toDateString()}</TableCell>
                <TableCell>
                  <Button color='primary' onClick={()=>handleClickOpen(rec.receptionist)}><EditIcon titleAccess='Edit'/></Button>
                  <Button color='secondary' onClick={()=> handleDelete(rec)}><DeleteIcon titleAccess='Delete'/></Button></TableCell>
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
      { (receptionists.length ) &&
      <>
        {(editRec.length!==0 && openEditDialog)&&<EditRoomDialog/>}
        <hr/>
        {message.length !== 0 && <ErrorMessage error={message} severity='info'/>}
        <div className="row">
          <RecComponent/>
        </div>
      </>}
      {(!loading && receptionists.length === 0)&&
      <ErrorMessage error='No receptionist is registered under this hotel'/>
      }
    </div>
  );
}
