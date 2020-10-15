import React from 'react'
import {connect} from "react-redux";

function Hotel({loadHotelState, match}) {
  return(
      <>
        <div>
          <p>{loadHotelState.hotel.slug}</p>
          <p>{match.params.slug}</p>
        </div>
      </>
  )
}

const mapStateToProps = state => {
  return{
    loadHotelState: state.loadHotel
  }
}



export default connect(mapStateToProps)(Hotel)
