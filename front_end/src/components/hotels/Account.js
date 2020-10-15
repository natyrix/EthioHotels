import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ErrorMessage from "./ErrorMessage";
import {useStoreActions} from "easy-peasy";
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

export default function Account({account}) {
  const classes = useStyles();
  const [severity, setSeverity] = React.useState(null);
  const [valErr, setValErr] = React.useState('');
  const [emailErr, setEmailErr] = React.useState('');
  const [phoneErr, setPhoneErr] = React.useState('');
  const [passValErrMsg, setPassValErrMsg] = React.useState('');
  const [logInInfo, setLogInInfo] = React.useState({
    id: account.id,
    username: '',
    old_pass: '',
    new_pass: '',
    con_pass: ''
  });
  const {updateAccount, updateAccountPass} = useStoreActions(actions => actions.hotel);
  const [state, setState] = React.useState({
    id: account.id,
    name: account.name,
    email: account.email,
    phone: account.phone,
    city: account.city,
    description: account.description,
  });
  const [img, setImg] = React.useState(null);
  const img_url = `http://localhost:8000${account.cover_img_location}`;
  const emailValidator = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  };
  let iseValid, ispValid = false;
  function handleSubmit(e) {
    e.preventDefault();
    if(emailValidator(state.email)){
      setEmailErr('');
      iseValid = true;
    }
    else {
      iseValid = false;
      setEmailErr('Invalid email address');
      setValErr('Check your email address');
    }
    if (/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g.test(state.phone)) {
      setPhoneErr('');
      ispValid = true
    }else {
      ispValid = false;
      setPhoneErr('Invalid phone number');
      setValErr('Check your phone number');
    }
    if(iseValid && ispValid){
      setValErr('');
      const form_data = new FormData();
      form_data.append('id',state.id);
      form_data.append('name',state.name);
      form_data.append('phone',state.phone);
      form_data.append('email',state.email);
      form_data.append('city',state.city);
      form_data.append('description',state.description);
      if(img !== null){
        form_data.append('cover_img_location', img, img.name);
      }
      const data = {
        id: state.id,
        form_data: form_data
      };
      updateAccount(data);
      console.log('updating');
    }
    else {
      setValErr('You have validation error');
    }
  }

  function handleImageChange(e) {
    let pattern = /image-*/;
    const file = e.target.files[0];
    if(!file.type.match(pattern)){
      setValErr('Only images with an extension of *.jpeg, *.jpg, *.png are supported!');
      setSeverity(null)
    }
    else{
      const fsize = file.size/1024/1024;
      if(fsize > 5){
        setValErr('Image can not exceed 5MB!');
        setSeverity(null)
      }
      else{
        setValErr('');
        setImg(e.target.files[0]);
      }
    }
  }

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  function handlePassChange(evt) {
    const value = evt.target.value;
    setLogInInfo({
      ...logInInfo,
      [evt.target.name]: value
    });
  }

  function handlePassSubmit(e) {
    e.preventDefault();
    if(logInInfo.new_pass === logInInfo.con_pass ){
      setPassValErrMsg('');
      if(logInInfo.new_pass !== logInInfo.old_pass){
        setPassValErrMsg('');
        const form_data = new FormData();
        form_data.append('id', logInInfo.id);
        form_data.append('old_pass', logInInfo.old_pass);
        form_data.append('new_pass', logInInfo.new_pass);
        form_data.append('con_pass', logInInfo.con_pass);
        const data = {
          id: logInInfo.id,
          form_data: form_data
        };
        updateAccountPass(data);
      }
      else {
        setPassValErrMsg('Old password is the same as new password!')
      }
    }

    else {
      setPassValErrMsg('Passwords do not match')
    }
  }

  return (
    <>
      <h6>Edit your account</h6>
      <hr/>
      {valErr.length !== 0 && <ErrorMessage error={valErr} severity={severity}/>}
      <div className={classes.root}>
        <div className="row">
          <div className="col">
            <h6>Update hotel's information</h6>
            <form autoComplete='off' onSubmit={(e)=>handleSubmit(e)}>

              <div>
                <TextField
                  name='name'
                  id="standard-full-width"
                  label="Name:"
                  style={{ margin: 8 }}
                  defaultValue={state.name}
                  required={true}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant='outlined'
                  onChange={handleChange}
                />
                <hr/>
                <TextField
                  name='email'
                  label="Email Address:"
                  id="margin-dense"
                  defaultValue={state.email}
                  className={classes.textField}
                  required={true}
                  error={emailErr.length !== 0}
                  helperText={emailErr}
                  variant='outlined'
                  onChange={handleChange}
                />
                <TextField
                  name='phone'
                  label="Phone number:"
                  id="margin-dense"
                  defaultValue={state.phone}
                  className={classes.textField}
                  required={true}
                  error={phoneErr.length !== 0}
                  helperText={phoneErr}
                  margin="dense"
                  variant='outlined'
                  onChange={handleChange}
                />
                <TextField
                  name='city'
                  label="City:"
                  id="margin-dense"
                  defaultValue={state.city}
                  className={classes.textField}
                  required={true}
                  margin="dense"
                  variant='outlined'
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className='mt-2'>Description: </label>
                <textarea className='form-control mb-2'
                          onChange={handleChange} required value={state.description} name='description'/>
                <h6 className='mb-2'>Current logo: </h6>
                <div>
                  <img style={{width:"200px", height:"200px"}} src={img_url} alt="" className='mb-2'/>
                </div>
                <label className='mb-2 mt-3'>Change logo: </label>
                <input
                  className='form-control mb-2'
                  type="file"
                  id="image"
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                />
              </div>
              <div className="">
                <input className='btn btn-outline-primary mt-3' type='submit' value='Save'/>
              </div>
            </form>
          </div>
          <div className="col">
            <h6>Change password</h6>
            {passValErrMsg.length!==0&& <ErrorMessage error={passValErrMsg}/>}
            <form onSubmit={(e)=>handlePassSubmit(e)}>
              <TextField
                margin="dense"
                id="old_pass"
                name="old_pass"
                label="Old Password"
                type="password"
                defaultValue={logInInfo.old_pass}
                required={true}
                fullWidth
                onChange={(e)=>handlePassChange(e)}
              />
              <TextField
                margin="dense"
                id="new_pass"
                name="new_pass"
                label="New Password"
                type="password"
                defaultValue={logInInfo.new_pass}
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
                defaultValue={logInInfo.con_pass}
                required={true}
                fullWidth
                onChange={(e)=>handlePassChange(e)}
              />
              <input className='btn btn-outline-primary mt-3' type='submit' value='Update Password'/>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
