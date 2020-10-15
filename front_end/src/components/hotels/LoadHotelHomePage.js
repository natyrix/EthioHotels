import React, {useState} from "react";
import {useStoreActions, useStoreState} from "easy-peasy";
import HotelHomePage from "./hotelwithAPI/HotelHomePage";
import CompleteRegister from "./CompleteRegistration";
import Login from "../accounts/login1";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import {Redirect} from "react-router";

const useStyles = makeStyles((theme) => ({
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function LoadHotelHomePage() {
  const classes = useStyles();
  const tok = localStorage.getItem('Tok');
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const {loading, error, is_reg_completed, has_api, slug, is_admin} = useStoreState(state => state.helpers);
  const {getIsRegCompleted, getHasAPI, getIsAdmin} = useStoreActions(actions => actions.helpers);
  const { setSuccess } = useStoreActions(actions => actions.login);
  React.useEffect(()=>{
    if(tok){
      setIsLoggedIn(true);
      getIsRegCompleted();
      getHasAPI();
      getIsAdmin();
      setSuccess();
    }
  },[]);
  if(loading){
    return (
      <div className={classes.alignCenter}>
        <CircularProgress/>
      </div>
    );
  }
  else if(isLoggedIn && tok && !loading){
    if( is_reg_completed === true && !loading){
      if(has_api === true){
        return <Redirect to={{pathname: '/hotel', state: {msg: 'Successfully logged in'}}}/>
      }
      else if(has_api === false){
        if(is_admin === true){
          return <Redirect to={{pathname: `/hotels/admin/${slug}`, state: {msg: 'Successfully logged in'}}}/>
        }
        else if(is_admin === false){
          return <Redirect to={{pathname: `/hotels/${slug}`, state: {msg: 'Successfully logged in'}}}/>
        }
      }
    }
    else if(!loading && is_reg_completed === false) {
      return <Redirect to={{pathname: '/complete-register', state: {msg: 'Complete your registration!'}}}/>
    }
  }
  else if(!isLoggedIn && !tok){
    return <Redirect to={{pathname: '/login', state: {msg: 'Login required!'}}}/>
  }
  if(error.length !== 0){
    localStorage.removeItem('Tok');
    setSuccess('Access denied, invalid token provided');
    return <Redirect to={{pathname: '/login', state: {msg: `Access denied for this user, please contact the admin`}}}/>
  }
  return (
    <div className={classes.alignCenter}>
      <CircularProgress/>
    </div>
  );
}