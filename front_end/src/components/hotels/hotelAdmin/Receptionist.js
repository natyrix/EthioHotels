import React from 'react';
import TextField from '@material-ui/core/TextField';
import {useStoreActions, useStoreState} from "easy-peasy";
import ErrorMessage from "../ErrorMessage";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Receptionist({rec, handleClose}) {
  const classes = useStyles();
  const [editRec, setEditRec] = React.useState(rec);
  const [editPass, setEditPass] = React.useState({
    id: rec.id,
    old_pass: '',
    pass: '',
    con_pass: ''
  });
  const {edit_loading, error, message} = useStoreState(state => state.hotel);
  const [unameVal, setunameVal] = React.useState('');
  const [valErrMsg, setValErrMsg] = React.useState('');
  const [passValErrMsg, setPassValErrMsg] = React.useState('');
  const {updateReceptionist, getReceptionists, updateReceptionistPass} = useStoreActions(actions => actions.hotel);
  const unameValidator = (username) => {
    return /^[A-Z._%+-]+[A-Z0-9.-]$/i.test(username);
  };
  function handleSubmit(e) {
    e.preventDefault();
    if(unameValidator(editRec.username)){
      setunameVal('');
    }
    else {
      setunameVal('Invalid User name, should start with letter');
      setValErrMsg('validation error');
    }
    if(unameVal.length === 0 ){
      const form_data = new FormData();
      form_data.append('id', editRec.id);
      form_data.append('first_name', editRec.first_name);
      form_data.append('last_name', editRec.last_name);
      form_data.append('email', editRec.email);
      form_data.append('username', editRec.username);
      const data = {
        form_data: form_data
      };
      updateReceptionist(data);
      getReceptionists();
      setTimeout(()=>{
        handleClose();
      },2000);
    }
  }

  function handleChange(e) {
    const value = e.target.value;
    setEditRec({
      ...editRec,
      [e.target.name]: value
    })
  }

  function handlePassSubmit(e) {
    e.preventDefault();
    if(editPass.pass === editPass.con_pass ){
      if(editPass.pass !== editPass.old_pass){
        setPassValErrMsg('');
        const form_data = new FormData();
        form_data.append('id', editPass.id);
        form_data.append('old_pass', editPass.old_pass);
        form_data.append('new_pass', editPass.pass);
        form_data.append('con_pass', editPass.con_pass);
        const data = {
          id: editPass.id,
          form_data: form_data
        };
        updateReceptionistPass(data);
      }
      else {
        setPassValErrMsg('Old password is the same as new password!')
      }
    }

    else {
      setPassValErrMsg('Passwords do not match')
    }
  }

  function handlePassChange(e) {
    const value = e.target.value;
    setEditPass({
      ...editPass,
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
            {error.length !== 0 && <ErrorMessage error={error}/>}
            {message.length !== 0 && <ErrorMessage error={message} severity='info'/>}
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h6>Update Info</h6>
                  {valErrMsg.length!==0&& <ErrorMessage error={valErrMsg}/>}
                  <form onSubmit={(e)=>handleSubmit(e)}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="first_name"
                      name="first_name"
                      label="First Name"
                      type="text"
                      defaultValue={editRec.first_name}
                      required={true}
                      fullWidth
                      onChange={(e)=>handleChange(e)}
                    />
                    <TextField
                      margin="dense"
                      id="last_name"
                      name="last_name"
                      label="Last Name"
                      type="text"
                      defaultValue={editRec.last_name}
                      required={true}
                      fullWidth
                      onChange={(e)=>handleChange(e)}
                    />
                    <TextField
                      margin="dense"
                      id="email"
                      name="email"
                      label="Email"
                      type="email"
                      defaultValue={editRec.email}
                      required={true}
                      fullWidth
                      onChange={(e)=>handleChange(e)}
                    />
                    <TextField
                      margin="dense"
                      id="username"
                      name="username"
                      label="Username"
                      type="text"
                      defaultValue={editRec.username}
                      required={true}
                      error={unameVal.length !== 0}
                      helperText={unameVal}
                      fullWidth
                      onChange={(e)=>handleChange(e)}
                    />
                    <input className='btn btn-outline-primary mt-3' type='submit' value='Save'/>
                  </form>
                </div>
                <div className="col">
                  <h6>Update password</h6>
                  {passValErrMsg.length!==0&& <ErrorMessage error={passValErrMsg}/>}
                  <form onSubmit={(e)=>handlePassSubmit(e)}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="old_pass"
                      name="old_pass"
                      label="Old Password"
                      type="password"
                      defaultValue={editPass.old_pass}
                      required={true}
                      fullWidth
                      onChange={(e)=>handlePassChange(e)}
                    />
                    <TextField
                      margin="dense"
                      id="pass"
                      name="pass"
                      label="New Password"
                      type="password"
                      defaultValue={editPass.pass}
                      required={true}
                      fullWidth
                      onChange={(e)=>handlePassChange(e)}
                    />
                    <TextField
                      margin="dense"
                      id="con_pass"
                      name="con_pass"
                      label="Confirm Password"
                      type="password"
                      defaultValue={editPass.con_pass}
                      required={true}
                      fullWidth
                      onChange={(e)=>handlePassChange(e)}
                    />
                    <input className='btn btn-outline-primary mt-3' type='submit' value='Change Password'/>
                  </form>
                </div>
              </div>
            </div>
          </>}
    </>
  )
}
