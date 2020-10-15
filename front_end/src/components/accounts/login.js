import React, {useState, useEffect} from 'react'
import { useStoreState, useStoreActions } from "easy-peasy";
import { connect } from 'react-redux'
import { useForm } from "react-hook-form";
import { loginUser } from '../../redux'
import Nav from "./nav";
import {Redirect} from "react-router";


function Login(props) {
  let alert
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(()=>{
    const tok = localStorage.getItem('Tok')
    if (tok) {
      setIsLoggedIn(true)
    }

  }, [isLoggedIn])

  const { handleSubmit, register, errors } = useForm()
  const handleLogin = (values) => {
    props.loginUser(values.username, values.password)
  }
  const [showingAlert, setShowingAlert] = useState(true)
  try {
    alert = showingAlert ? (
        <div className="alert alert-success">
          <h6 className="text-success"><strong>{props.location.state.msg}</strong></h6>
        </div>
    ): '';
  }
  catch (e) {
    alert = ''
  }


  setTimeout(() => {
    setShowingAlert(false)
  }, 3000)
  let x;
  x = props.loginState.success

  if(x === 1) {
    localStorage.setItem('Tok', props.loginState.token)
    return <Redirect to='/loadhotels'/>
  }
  if(isLoggedIn){
    // return <Redirect to='/loadhotels'/>
  }
  const { loading, success, token, message, error} = useStoreState(state => state.login);

  return(
      <>
        <Nav/>
        <div className="container col-md-5 mt-5">
          <div className="card">
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
                <span className="text-danger" id="massage">{props.loginState.message}</span>
                <button className="btn btn-block btn-primary" type="submit">Submit</button>
              </form>
            </div>
          </div>
          <div>
            <p>Token: {props.loginState.token}</p>
            <p className="text-danger">Message: {props.loginState.message}</p>
            <p className="text-danger">error: {props.loginState.error}</p>
            <p className="text-success">Success: {props.loginState.success}</p>
          </div>
        </div>
      </>
  )
}


const mapStateToProps = state => {
  return{
    loginState: state.login
  }
}

const mapDispatchToProps = dispatch => {
  return{
    loginUser: (username, password) => dispatch(loginUser(username,password))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
