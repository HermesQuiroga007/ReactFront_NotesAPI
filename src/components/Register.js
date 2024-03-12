import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error] = useState('');

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
        throw new Error('Error al registrar usuario');
      }
    } catch (err) {
      // Mostrar mensaje de error utilizando SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar usuario',
        text: 'Ha ocurrido un error al intentar registrar el usuario. Por favor, inténtelo de nuevo más tarde.',
        confirmButtonColor: '#dc3545' // Color del botón de confirmación
      });
    }
  };


  return (
    <div>
      <div className="container clr">
        <div className="row justify-content-center">
          <div className="col-md-6 cardp">
            <div className="card card2">
              <div className="card-header ch text-dark"><strong>Registro</strong></div>
              <div className="card-body cb">
                {error && <p className="text-danger">{error}</p>}
                <div className="mb-3">
                  <input type="email" className="form-control ipt" id="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control ipt" id="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="btn btnlr" onClick={handleRegister}>Registrarse</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
