import React, { useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useForm } from "react-hook-form";
import {Redirect} from "react-router";
import Nav from "./nav";

const Register = (props)=> {
  const {message, error, success, loading} = useStoreState(state => state.register);
  const registerHotel = useStoreActions(actions => actions.register.registerHotel);

  const {handleSubmit, register} = useForm();
  const [hotel_email, setHotel_email] = useState("");
  const [hotel_pno, sethotel_pno] = useState("");
  const [clerk_email, setclerk_email] = useState("");
  const [clerk_con_pass, setclerk_con_pass] = useState("");
  const [valErrs, setvalErrs] = useState("");

  const errs = ["", "Username already taken", "Clerk Email already taken", "Hotel Email already taken"];

  let x, y, z;
  let isHemail_valid = false, isClemail_valid = false, isHpno_valid = false, isclConPass_valid = false;

  x = success;
  if (x === 0) {
    y = 0;
    z = 0;
  } else if (x === 1) {
    y = 0;
    z = 0;
  } else if (x === 2) {
    x = 0;
    y = 2;
    z = 0;
  } else if (x === 3) {
    x = 0;
    y = 0;
    z = 3;
  } else if (x === 5) {
    return <Redirect to={{pathname: '/login', state: {msg: 'Registration successful you can now login'}}}/>
  }
  const emailValidator = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  };
  const handleRegister = (values) => {
    if (emailValidator(values.hotel_email)) {
      setHotel_email("");
      isHemail_valid = true
    } else {
      setHotel_email("Invalid Email");
      setvalErrs("You have validation errors, check the email address you entered");
      isHemail_valid = false
    }
    if (emailValidator(values.clerk_email)) {
      setclerk_email("");
      isClemail_valid = true
    } else {
      setclerk_email("Invalid Email");
      setvalErrs("You have validation errors, check the clerk email address you entered");
      isClemail_valid = false
    }
    if (/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g.test(values.hotel_pnumber)) {
      sethotel_pno("");
      isHpno_valid = true
    } else {
      sethotel_pno("Invalid Phone number");
      setvalErrs("You have validation error");
      isHpno_valid = false
    }
    if (values.clerk_conpass === values.clerk_pass) {
      setclerk_con_pass("");
      isclConPass_valid = true
    } else {
      setclerk_con_pass("Passwords do not match");
      setvalErrs("You have validation error");
      isclConPass_valid = false
    }
    if (isHemail_valid && isHpno_valid && isClemail_valid && isclConPass_valid) {
      setvalErrs("");
      const hotel = {
        name: values.hotel_name,
        email: values.hotel_email,
        phone: values.hotel_pnumber,
        city: values.hotel_city,
        description: values.hotel_desc,
        location_desc: values.hotel_loc_desc,
      };
      const clerk = {
        first_name: values.clerk_fname,
        last_name: values.clerk_lname,
        password: values.clerk_pass,
        username: values.clerk_uname,
        email: values.clerk_email,
      };
      const data = {
        hotel: hotel,
        clerk: clerk
      };
      registerHotel(data)
    } else {
      console.log('FAILURE')
    }
  }
    return (
      <>
        <Nav/>
        <div className="container col-md-8 mt-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Register as Hotel</h5>
              <h6 className="card-subtitle mb-2 text-muted">Enter your Hotel's information</h6>
              <form onSubmit={handleSubmit(handleRegister)}>
                <label >Hotel name: <sup className="text-danger">*</sup> </label>
                <input type="text" name="hotel_name" placeholder="Hotel name" required
                       className="form-control"
                       ref={register({})}
                />
                <br/>
                <label >Email address: <sup className="text-danger">*</sup> </label>
                <input type="email" name="hotel_email" placeholder="Hotel Email" required
                       className="form-control"
                       ref={register({})}
                />
                <span className="text-danger">{ hotel_email }{errs[z]}</span>
                <br/>
                <label >Phone number: <sup className="text-danger">*</sup> </label>
                <input type="text" name="hotel_pnumber" placeholder="Hotel Phone number" required
                       className="form-control"
                       ref={register({})}
                />
                <span className="text-danger">{hotel_pno }</span>
                <br/>
                <label >City: <sup className="text-danger">*</sup> </label>
                <input type="text" name="hotel_city" placeholder="City" required
                       className="form-control"
                       ref={register({})}
                />
                <br/>
                <label >Description of the Hotel: <sup className="text-danger">*</sup> </label>
                <textarea name="hotel_desc" placeholder="Description" required
                          className="form-control"
                          ref={register({})}></textarea>
                <br/>
                <h6 className="card-subtitle mb-2 text-muted">Enter Hotel's location information</h6>
                <br/>
                <label >Description of the Hotel's Location: <sup className="text-danger">*</sup> </label>
                <textarea name="hotel_loc_desc" placeholder="Description" required
                          className="form-control"
                          ref={register({})}></textarea>
                <br/>
                <h6 className="card-subtitle mb-2 text-muted">Enter Hotel's Login Information</h6>
                <label >First Name: <sup className="text-danger">*</sup> </label>
                <input type="text" name="clerk_fname" placeholder="First Name" required
                       className="form-control"
                       ref={register({})}
                />
                <br/>
                <label >Last Name: <sup className="text-danger">*</sup> </label>
                <input type="text" name="clerk_lname" placeholder="Last Name" required
                       className="form-control"
                       ref={register({})}
                />
                <br/>
                <label >Hotel Clerk Email Address: <sup className="text-danger">*</sup> </label>
                <input type="email" name="clerk_email" placeholder="Email Address" required
                       className="form-control"
                       ref={register({})}
                />
                <span className="text-danger">{ clerk_email }{errs[y]}</span>
                <br/>
                <label >Username: <sup className="text-danger">*</sup> </label>
                <input type="text" name="clerk_uname" placeholder="Username" required
                       className="form-control"
                       ref={register({})}
                />
                <span className="text-danger">{errs[x]}</span>
                <br/>
                <label >Password: <sup className="text-danger">*</sup> </label>
                <input type="password" name="clerk_pass" placeholder="Password" required
                       className="form-control"
                       ref={register({})}
                />
                <br/>
                <label >Confirm Password: <sup className="text-danger">*</sup> </label>
                <input type="password" name="clerk_conpass" placeholder="Confirm Password" required
                       className="form-control"
                       ref={register({})}
                />
                <span className="text-danger"><strong>{ clerk_con_pass }</strong></span>
                <br/>
                <span className="text-danger"><strong>{ valErrs }</strong></span>
                <br/>
                <span className="text-danger"><strong>{ message }</strong></span>
                <button className="btn btn-block btn-primary" type="submit">Register</button>
              </form>
              <br/>
              <p>Success: {success}</p>
              <p>Loading: {loading.toString()}</p>
              <p>Message: {message}</p>
              <p>Error: {error}</p>
            </div>
          </div>
        </div>
      </>
    )
  };
export default Register;
