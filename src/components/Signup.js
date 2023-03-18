import React, { useState } from 'react';

const Signup = () => {

    const [user, setUser] = useState({
        Nombre: '',
        Apellido: '',
        Correo: '',
        Contrasenia: ''
    })

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones de campos
        if (!user.Nombre || !user.Apellido || !user.Correo || !user.Contrasenia) {
            alert('Por favor llena todos los campos.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(user.Correo)) {
            alert('Ingresa un correo electrónico válido.');
            return;
        }

        // Validar correo en la base de datos
        try {
            const response = await fetch('http://localhost:9000/validarCorreo/' + user.Correo, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            if (Object.keys(data).length > 0) {
                alert('Este correo ya está registrado. Por favor ingresa otro correo.');
                return;
            }
        } catch (error) {
            alert('No se pudo validar el correo. Inténtalo más tarde.');
            return;
        }

        // Registrar usuario en la base de datos
        try {
            const response = await fetch('http://localhost:9000/registrousuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            if (data) {
                alert('Registro exitoso. Bienvenido!');
                setUser({
                    Nombre: '',
                    Apellido: '',
                    Correo: '',
                    Contrasenia: ''
                })
                return;
            } else {
                alert('No se pudo realizar el registro. Inténtalo más tarde.');
                return;
            }
        } catch (error) {
            alert('No se pudo realizar el registro. Inténtalo más tarde.');
            return;
        }
    };



    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center">
                <div className="col-sm-12 my-container d-flex justify-content-center align-items-center">
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label>Nombre</label>
                        </div>
                        <div className='mb-3'>
                            <input type="text" name="Nombre" value={user.Nombre} onChange={handleChange} placeholder="Ingrese Nombre" />
                        </div>
                        <div className='mb-3'>
                            <label>Apellido</label>
                        </div>
                        <div className='mb-3'>
                            <input type="text" name="Apellido" value={user.Apellido} onChange={handleChange} placeholder="Ingrese Apellido" />
                        </div>
                        <div className='mb-3'>
                            <label>Corre Electronico</label>
                        </div>
                        <div className='mb-3'>
                            <input type="email" name="Correo" value={user.Correo} onChange={handleChange} placeholder="Ingrese Correo" />
                        </div>
                        <div className='mb-3'>
                            <label>Contraseña</label>
                        </div>
                        <div className='mb-3'>
                            <input type="password" name="Contrasenia" value={user.Contrasenia} onChange={handleChange} placeholder="Contraseña" />
                        </div>
                        <div className='mb-3'>
                            <button type="submit" className="btn btn-primary">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;