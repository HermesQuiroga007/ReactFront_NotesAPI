import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5267/api/Auth/RegisterUser', { email, password });
      // Verificar si el registro fue exitoso
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Usuario registrado con éxito',
          text: 'Por favor, inicie sesión para continuar.'
        }).then(() => {
          // Redirigir al usuario al login
          window.location.href = '/login';
        });
      } else {
        setError('Error al registrar usuario');
      }
    } catch (err) {
      setError('Error al registrar usuario');
    }
  };

  return (
    <div>
      <div className="container clr">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card card2">
              <div className="card-header ch"><strong>Registro</strong></div>
              <div className="card-body cb">
                {error && <p className="text-danger">{error}</p>}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo electrónico</label>
                  <input type="email" className="form-control" id="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input type="password" className="form-control" id="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="text-center">
                  <button className="btn btnlr" onClick={handleRegister}>Registrarse</button>
                </div>
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

export default Register;
