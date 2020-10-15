import React, {useEffect, useState} from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useForm } from "react-hook-form";
import {Redirect} from "react-router";
import Nav from "./nav";

const Login = (props)=>{
  const { message, slug, error, token, success, loading } = useStoreState( state=>state.login);
  const { loginHotel } = useStoreActions(actions => actions.login);

  let alert;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { handleSubmit, register, errors } = useForm();
  const tok = localStorage.getItem('Tok');
  useEffect(()=>{
    if(tok){
      setIsLoggedIn(true);
    }
  },[]);
  const handleLogin = (values) => {
    const data = {
      username: values.username,
      password: values.password
    };
    loginHotel(data)
  };
  const [showingAlert, setShowingAlert] = useState(true);
  try {
    alert = showingAlert ? (
      <div className="alert alert-success">
        <h6 className="text-success"><strong>{props.location.state.msg}</strong></h6>
      </div>
    ): '';
  }
  catch (e) {
    alert = '';
  }

  setTimeout(() => {
    setShowingAlert(false)
  }, 3000);
  let x;
  x = success;

  if(x === 1) {
    localStorage.setItem('Tok', token);
    return <Redirect to={{pathname: '/complete-register', state: {msg: 'Complete your registration!'}}}/>
  }
  else if(x === 2 ){
    localStorage.setItem('Tok', token);
    return <Redirect to={{pathname: '/loadhotels', state: {msg: 'Successfully logged in'}}}/>
  }
  else if(x===3 && slug.length!==0){
    localStorage.setItem('Tok', token);
    return <Redirect to={{pathname: `/hotels/${slug}`, state: {msg: 'Successfully logged in'}}}/>
  }
  if(isLoggedIn){
    return <Redirect to={{pathname: '/loadhotels', state: {msg: 'Successfully logged in'}}}/>
  }

  return(
    <>
      <Nav/>
      <div className="container col-md-5 mt-5">
        <div className="card bg-white">
          <div className="card-body">
            {alert}
            <form onSubmit={handleSubmit(handleLogin)}>
              <label >Username: <sup className="text-danger">*</sup> </label>
              <input
                required
                name="username"
                ref={register({
                  required: 'Required',
                  validate: value => value !== "admin" || "Nice try!"
                })}
                placeholder="Username"
                className="form-control"
              />
              <span className="text-danger">{errors.username && errors.username.message}</span>
              <br/>
              <label >Password: <sup className="text-danger">*</sup></label>
              <input
                type="password"
                name="password"
                required
                ref={register({
                  required: 'Required',
                  validate: value => value !== "admin" || "Nice try!"
                })}
                placeholder="Password"
                className="form-control"
              />
              <span className="text-danger">{errors.password && errors.password.message}</span>
              <br/>
              <span className="text-danger" id="massage">{message}</span>
              <button className="btn btn-block btn-primary" type="submit">
                <i className="fas fa-sign-in-alt"> </i> Login</button>
            </form>
          </div>
        </div>
        <div>
          <p>Token: {token}</p>
          <p className="text-danger">Message: {message}</p>
          <p className="text-danger">error: {error}</p>
          <p className="text-success">Success: {success}</p>
        </div>
      </div>
    </>
  )
};

export default Login