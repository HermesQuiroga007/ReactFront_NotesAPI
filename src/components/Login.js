import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

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
      onLogin(Token); // Llamar a la función onLogin pasando el token
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div>
      <div className="container clr">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card card2">
              <div className="card-header ch"><strong>Login</strong></div>
              <div className="card-body cb">
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo electrónico</label>
                  <input type="email" className="form-control" id="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input type="password" className="form-control" id="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="button" className="btn btnlr" onClick={handleLogin}>Iniciar sesión</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="f2">
        <div className="container">
          <div className="text-center text-dark">
            <p className="mb-0">¡Happy Hacking!</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;
