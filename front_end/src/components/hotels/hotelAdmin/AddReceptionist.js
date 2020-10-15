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

export default function AddReceptionist() {
  const classes = useStyles();
  const { add_loading, error, add_message} = useStoreState(state => state.hotel);
  const [user, setUser] = React.useState({
    username:'',
    email:'',
    password:'',
    repeat_pass:'',
    first_name:'',
    last_name:'',
  });
  const [valErrMsg, setValErrMsg] = React.useState('');
  const [unameVal, setunameVal] = React.useState('');
  const [passVal, setpassVal] = React.useState('');
  const {AddReceptionist} = useStoreActions(actions => actions.hotel);
  const unameValidator = (username) => {
    return /^[A-Z._%+-]+[A-Z0-9.-]$/i.test(username);

  };
  function handleSubmit(e) {
    e.preventDefault();
    if(unameValidator(user.username)){
      setunameVal('');
    }
    else {
      setunameVal('Invalid User name, should start with letter');
      setValErrMsg('validation error');
    }
    if(user.password === user.repeat_pass){
      setpassVal('');
    }
    else {
      setpassVal('Passwords do not match');
    }
    if(unameVal.length === 0 && passVal.length === 0){
      setValErrMsg('');
      const form_data = new FormData();
      form_data.append('username', user.username);
      form_data.append('email', user.email);
      form_data.append('password', user.password);
      form_data.append('first_name', user.first_name);
      form_data.append('last_name', user.last_name);
      const data = {
        form_data: form_data
      };
      AddReceptionist(data);
      setUser({
        username:'',
        email:'',
        password:'',
        repeat_pass:'',
        first_name:'',
        last_name:'',
      });
    }
  }

  function handleChange(e) {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value
    })
  }
  return (
    <>
      <div className='container'>
        <div className="card">
          <div className="card-header bg-light">
            <h6>Add Receptionist</h6>
          </div>
      {
        add_loading?
          <div className={classes.alignCenter}>
            <CircularProgress/>
          </div>
          :<>
            {error.length !== 0 && <ErrorMessage error={error}/>}
            {add_message.length !== 0 && <ErrorMessage error={add_message} severity='info'/>}
            <div className="card-body">
              {valErrMsg.length!==0&& <ErrorMessage error={valErrMsg}/>}
              <form onSubmit={(e)=>handleSubmit(e)}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  type="text"
                  defaultValue={user.first_name}
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
                  defaultValue={user.last_name}
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
                  defaultValue={user.email}
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
                  defaultValue={user.username}
                  required={true}
                  error={unameVal.length !== 0}
                  helperText={unameVal}
                  fullWidth
                  onChange={(e)=>handleChange(e)}
                />
                <TextField
                  margin="dense"
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  defaultValue={user.password}
                  required={true}
                  fullWidth
                  onChange={(e)=>handleChange(e)}
                />
                <TextField
                  margin="dense"
                  id="repeat_pass"
                  name="repeat_pass"
                  label="Confirm Password"
                  type="password"
                  defaultValue={user.repeat_pass}
                  required={true}
                  error={passVal.length !== 0}
                  helperText={passVal}
                  fullWidth
                  onChange={(e)=>handleChange(e)}
                />
                <input className='btn btn-outline-primary mt-3' type='submit' value='Add'/>
              </form>
            </div>

          </>}
        </div>
      </div>
    </>
  )
}
