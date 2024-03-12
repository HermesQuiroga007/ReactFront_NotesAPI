import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5267/api/Auth/LoginUser', { email, password });
      const { Token } = response.data; // Extraer el token de la respuesta
      localStorage.setItem('token', Token); // Almacenar el token en localStorage
      setError('');
      onLogin(Token, email); // Llamar a la función onLogin pasando el token y el correo electrónico
    } catch (err) {
      // Mostrar mensaje de error utilizando SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Credenciales inválidas',
        text: 'Las credenciales proporcionadas no son válidas. Por favor, inténtelo de nuevo.',
        confirmButtonColor: '#dc3545' // Color del botón de confirmación
      });
    }
  };


  return (

    <div className="container">
      <div className="card card2">
        <div className="card-header ch text-dark"><strong>Login</strong></div>
        <div className="card-body cb">
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <div className="mb-3">
            <input type="email" className="form-control ipt" id="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control ipt" id="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="button" className="btn btnlr" onClick={handleLogin}>Iniciar sesión</button>
        </div>
      </div>
    </div>

  );
}

export default Login;
