import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //handleLogin: Esta función maneja el proceso de inicio de sesión, 
  //que puede involucrar múltiples pasos, como enviar una solicitud al 
  //servidor, procesar la respuesta, almacenar el token de autenticación, etc.

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5267/api/Auth/LoginUser', { email, password });
      const { Token, Expiracion } = response.data;
      localStorage.setItem('token', Token);
      setError('');
      onLogin(Token, email, new Date(Expiracion).getTime());
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Credenciales inválidas',
        text: 'Las credenciales proporcionadas no son válidas. Por favor, inténtelo de nuevo.',
        confirmButtonColor: '#dc3545'
      });
    }
  };

  //"handle" se usa como un prefijo para 
  //indicar que una función o método está diseñado para manejar 
  //eventos específicos o realizar acciones relacionadas con el manejo de eventos.

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="container">
      <div className="card card2">
        <div className="card-header ch text-dark"><strong>Login</strong></div>
        <div className="card-body cb">
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <div className="mb-3">
            <input
              type="email"
              className="form-control ipt"
              id="email"
              placeholder="Correo electrónico"
              value={email} onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control ipt"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <button
            type="button"
            className="btn btnlr"
            onClick={handleLogin}
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
