import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBarUser = () => {
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Mi Página</NavLink>
                <NavLink className="navbar-brand" to="/movies">Listado de peliculas</NavLink>
            </div>
        </nav>
    );
}

export default NavBarUser;
