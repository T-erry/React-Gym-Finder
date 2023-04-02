import React from 'react'
import { Link } from 'react-router-dom';

function NavBarTwo() {
  return (
    <nav id="nav" className="navbar navbar-expand-lg">
    <div className="container">
      <a id="brandName" className="navbar-brand" href="/homeout">
        GYMFINDER
      </a>
      <Link to="/creategym" className="btn btn-success btn-sm m-2">
        Create Gym
      </Link>
      <Link to="/dashboard" className="btn btn-success btn-sm m-2">
            Dashboard
          </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <div className="navbar-nav me-auto mb-2 mb-lg-0"></div>
        <div className="d-flex" role="search">
          <Link to="/login" className="btn btn-success btn-sm m-2">
            Logout
          </Link>
        </div>
      </div>
    </div>
  </nav>
  );
}

export default NavBarTwo