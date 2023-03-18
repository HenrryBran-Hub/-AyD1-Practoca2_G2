import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBarAdmin = () => {
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Mi Página</NavLink>
                <NavLink className="navbar-brand" to="/movie">Registro de peliculas</NavLink>
                <NavLink className="navbar-brand" to="/actor">Registro de actor</NavLink>
                <NavLink className="navbar-brand" to="/cast">Registro de Reparto</NavLink>
            </div>
        </nav>
    );
}

export default NavBarAdmin;
