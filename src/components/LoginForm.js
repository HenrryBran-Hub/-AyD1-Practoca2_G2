import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
export let user; //exporto los datos solo deben de usar  en sus componentes: import {user} from "./LoginForm"   y mandar a llamar las variables ej: user.idUser
const LoginForm = (userlog, setUserLog) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();


        if (username === 'admin@admin.com' && password === 'admin') {
            window.location.href = '/adminform';
        } else {
            try {
                const response = await fetch('http://localhost:9000/loginform/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });
                const data = await response.json();
                if (Object.keys(data).length > 0) {
                    // usuario autenticado, redireccionar a la página de inicio
                    //aqui guardo la lista para exportar estos dos datos 
                    user={
                        "idUser":data[0].Id_Usuario,
                        "email":data[0].Correo
                    }
                    navigate('UserLoginForm', { replace: true })
                    //window.location.href = '/UserLoginForm';
                } else {
                    // otro error
                    alert('Ocurrió un error al intentar iniciar sesión. Inténtelo de nuevo más tarde.');
                }
            } catch (error) {
                console.error('Error al enviar la solicitud POST:', error);
                alert('Ocurrió un error al intentar iniciar sesión. Inténtelo de nuevo más tarde.');
            }
        }

    };

    return (
        <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit} className="border p-3 rounded">
                <div className="form-group">
                    <label htmlFor="correo">username:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
