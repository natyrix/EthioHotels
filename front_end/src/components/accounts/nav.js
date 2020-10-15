import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  const style = {
    color: 'white',
    textDecoration: 'none'
  }
  return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-light sticky-top">
        <div className="container">

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav">
              <li className="nav-item mr-3">
                <Link to="/" style={style}><i className="fas fa-home"> </i> Home</Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-3">
                <Link to="/login" style={style}><i className="fas fa-sign-in-alt"> </i> Login</Link>
              </li>
              <li className="nav-item mr-3">
                <Link to="/register" style={style}><i className="fas fa-user-plus"> </i> Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  )
}

export default Nav
