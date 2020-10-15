import React, {useEffect, useState} from 'react'
import {loadHotel} from "../../redux";
import {connect} from "react-redux";
import {Redirect} from "react-router";

function LoadHotels({loadHotelState, loadHotel}) {
  // localStorage.removeItem('Tok')
  const [tok] = useState(localStorage.getItem('Tok'));
  useEffect(()=>{
    if(tok){
      loadHotel(tok)
    }
  }, [loadHotel, tok]);


  if(!tok){
    return <Redirect to={{pathname: '/login', state: {msg: 'Access Denied, please login first'}}}/>
  }

  let x = loadHotelState.success;

  if (x===1){
    const slug = loadHotelState.hotel.slug;
    return <Redirect to={`/hotel/${slug}`}/>
  }

  return(
      <>
        <div className="container text-center">
          <img src={require('../../assets/loading.gif')} alt="loading..." />
        </div>
      </>
  )
}

const mapStateToProps = state => {
  return{
    loadHotelState: state.loadHotel
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadHotel: (token) => dispatch(loadHotel(token))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(LoadHotels)
