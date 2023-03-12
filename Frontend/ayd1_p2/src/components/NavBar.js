import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className ="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Principal</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" activeclassname ="active" exact="true" to="/">Inicio</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
