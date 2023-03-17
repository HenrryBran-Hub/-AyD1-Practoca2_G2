import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:9000/loginform/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        // usuario autenticado, redireccionar a la página de inicio
        window.location.href = '/';
      } else if (response.status === 401) {
        // credenciales incorrectas
        alert('El nombre de usuario o la contraseña son incorrectos.');
      } else {
        // otro error
        alert('Ocurrió un error al intentar iniciar sesión. Inténtelo de nuevo más tarde.');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud POST:', error);
      alert('Ocurrió un error al intentar iniciar sesión. Inténtelo de nuevo más tarde.');
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
