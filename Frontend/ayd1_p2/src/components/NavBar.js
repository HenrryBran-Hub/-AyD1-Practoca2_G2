import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Mi Página</NavLink>
                <NavLink className="navbar-brand" to="/signup">Registro</NavLink>
                <NavLink className="navbar-brand" to="/loginform">Sesion</NavLink>
                
            </div>
        </nav>
    );
}

export default Navbar;
