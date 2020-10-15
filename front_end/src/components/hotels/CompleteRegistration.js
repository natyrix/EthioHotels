import React, {useEffect, useState} from 'react'
import {Redirect} from "react-router";
import {useForm} from "react-hook-form";
import {useStoreActions, useStoreState} from "easy-peasy";

const CompleteRegister = (props) =>{
  // localStorage.removeItem('Tok');
  const [tok] = useState(localStorage.getItem('Tok'));
  const [ isLoggedIn, setIsLoggedIn ] = useState(true);
  const [showingAlert, setShowingAlert] = useState(true);
  const { handleSubmit,  register } = useForm();
  const [ hotel_lat, setHLat ] = useState('');
  const [ hotel_long, setHLong ] = useState('');
  const [ hotel_web, setHWeb ] = useState('');
  const [ hotel_api, setHApi ] = useState('');
  const completeRegister = useStoreActions(actions => actions.completeRegister.registerHotel);
  const {message, error, success, loading} = useStoreState(state => state.completeRegister);
  let isHlat_valid=false, isHlong_valid=false, isHweb_valid=false, isHapi_valid=false;

    let alert;
  useEffect(()=>{
    if(!tok){
      setIsLoggedIn(false);
    }
  },[]);
  if(!isLoggedIn){
    return <Redirect to={{pathname: '/login', state: {msg: 'Access Denied, please login first'}}}/>
  }
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
  const webValidator = (address) =>{
    return /^[A-Z0-9._%+-]+\.[A-Z]{2,4}$/i.test(address);
  };
  const locationValidator = (loc) =>{
    return /^[0-9]+\.[0-9]{6}$/i.test(loc);
  };
  const handleCompleteRegister = (values)=>{
    if(locationValidator(values.hotel_lat)){
      setHLat('');
      isHlat_valid = true;
    }
    else{
      setHLat('Invalid Latitude value!');
      isHlat_valid = false;
    }
    if(locationValidator(values.hotel_long)){
      setHLong('');
      isHlong_valid = true;
    }
    else{
      setHLong('Invalid Longitude value!');
      isHlong_valid = false
    }
    //Website validation......................
    if(values.hotel_website.toString().length > 0 && !values.hotel_website_chk){
      if(webValidator(values.hotel_website)){
        setHWeb('');
        isHweb_valid = true;
      }
      else{
        setHWeb("Invalid web address");
        isHweb_valid = false;
      }
    }
    else if(values.hotel_website.toString().length === 0) {
      if(!values.hotel_website_chk){
        setHWeb('You have to check the box below if the hotel does not have a website');
        isHweb_valid = false;
      }
      else{
        setHWeb('');
        isHweb_valid = true;
      }
    }
    else if(values.hotel_website.toString().length > 0 && values.hotel_website_chk) {
      setHWeb("Website field must be empty if the 'no website' checkbox is checked");
      isHweb_valid = false;
    }
    else{
      setHWeb('You have to check the box below or input the hotel\'s website');
      isHweb_valid = false;
    }
    //API Validation .........................
    if(values.hotel_api.toString().length > 0 && !values.hotel_api_chk){
      if(webValidator(values.hotel_api)){
        setHApi('');
        isHapi_valid = true;
      }
      else{
        setHApi("Invalid API address");
        isHapi_valid = false
      }
    }
    else if(values.hotel_api.toString().length === 0) {
      if(!values.hotel_api_chk){
        setHApi('You have to check the box below if the hotel does not have an API');
        isHapi_valid = false;
      }
      else{
        setHApi('');
        isHapi_valid = true
      }
    }
    else if(values.hotel_api.toString().length > 0 && values.hotel_api_chk) {
      setHApi('API field must be empty if the \'no API\' checkbox is checked');
      isHapi_valid = false;
    }
    else{
      setHApi('You have to check the box below or input the hotel\'s API');
      isHapi_valid = false;
    }
    if(isHlat_valid && isHlong_valid && isHweb_valid && isHapi_valid){
      const data = {
        website: values.hotel_website,
        has_website: values.hotel_website_chk,
        api: values.hotel_api,
        has_api: values.hotel_api_chk,
        latitude: values.hotel_lat,
        longitude: values.hotel_long
      };
      completeRegister(data);
    }
    else{
      console.log('Failed')
    }
    // console.log('submitting');
    // console.log(values);

  };
  let x;
  x = success;
  if(x === 1){
    //has no api
    console.log('has no api')
  }
  if(x === 2){
    //has an api redirect to basic account management
    console.log('has an api')
  }
  return (
    <>
      <div className="container col-md-7 mt-5">
        <div className="card">
          <div className="card-body">
            {alert}
            <h5 className="card-header">Complete registration before proceeding</h5>
            <br/>
            <form onSubmit={handleSubmit(handleCompleteRegister)}>
              <h6 className="card-subtitle mb-2 text-muted">Enter Hotel's location information(using latitude and longitude)</h6>
              <label >Latitude: <sup className="text-danger">*</sup> </label>
              <input type="text" name="hotel_lat"  placeholder="Latitude" required
                     className="form-control"
                     ref={register({})}
              />
              <span className="text-danger">{ hotel_lat }</span><br/>
              <label >Longitude: <sup className="text-danger">*</sup> </label>
              <input type="text" name="hotel_long" placeholder="Longitude" required
                     className="form-control"
                     ref={register({})}
              />
              <span className="text-danger">{ hotel_long }</span><br/>
              <hr/>
              <h6 className="card-subtitle mb-2 text-muted">Enter Hotel's Web information(Hotel's official website and API)</h6>
              <label >Website: <pre>Do not use 'https://' or 'www' at the beginning</pre></label>
              <input type="text" name="hotel_website" placeholder="Website ( leave blank if there is no official website for the hotel)"
                     className="form-control"
                     ref={register({})}
              />
              <span className="text-danger">{ hotel_web }</span><br/>
              <label >Check this box if the hotel does not have an official website:</label>
              <input type="checkbox" name="hotel_website_chk"
                     className="form-control"
                     ref={register({})}
              />
              <label >API: <pre>Do not use 'https://' or 'www' at the beginning</pre></label>
              <input type="text" name="hotel_api" placeholder="API ( leave blank if there is no official API for the hotel)"
                     className="form-control"
                     ref={register({})}
              />
              <span className="text-danger">{ hotel_api }</span><br/>
              <label >Check this box if the hotel does not have an official API:</label>
              <input type="checkbox" name="hotel_api_chk"
                     className="form-control"
                     ref={register({})}
              />
              {/*<label >Cover Image: <sup className="text-danger">*</sup></label>*/}
              {/*<input type="file" name="hotel_cover_img"*/}
              {/*       className="form-control"*/}
              {/*       ref={register({})}*/}
              {/*/>*/}
              <br/>
              <button className="btn btn-block btn-primary" type="submit">
                <i className="fa fa-user-plus"></i> Complete Register
              </button>
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

export default CompleteRegister