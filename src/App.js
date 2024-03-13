import './css/App.css';
import './css/Notes.css';
import React, { Component } from 'react';
import deleteNote from './components/DeleteNoteService';
import addNote from './components/AddNoteService';
import updateNote from './components/UpdateNoteService';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotesContainer from './components/NotesContainer';
import Swal from 'sweetalert2';
import HeaderContainer from './components/HeaderContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      notes: [],
      isAuthenticated: false,
      token: null,
      showUserInfo: false // Nuevo estado para controlar la visibilidad del panel de información del usuario
    };
    this.API_URL = "http://localhost:5267/";
    this.dropdownRef = React.createRef();
  }

  componentDidMount() {
    if (this.state.isAuthenticated) {
      this.refreshNotes();
    }
  }

  refreshNotes = () => {
    fetch(this.API_URL + "api/todoapp/GetNotes", {
      headers: {
        Authorization: `Bearer ${this.state.token}` // Enviar el token en el encabezado de autorización
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ notes: data });
      })
      .catch(error => console.error('Error fetching notes:', error));
  }

  addClick = (newNote) => {
    // Obtener el token de localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }
    // Llamar a addNote pasando el token
    addNote(newNote, token, this.refreshNotes);
  }

  deleteClick = (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }
    // Llamar a deleteNote pasando el token
    deleteNote(id, token, this.refreshNotes);
  }

  updateClick = (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }
    // Llamar a updateNote pasando el token
    updateNote(id, token, this.refreshNotes);
  }

  handleLogin = (token, email) => {
    // Actualizar el estado de autenticación, el token y el correo electrónico después de un inicio de sesión exitoso
    this.setState({ isAuthenticated: true, token: token, emailUsuario: email }, () => {
      this.refreshNotes(); // Actualizar las notas después del inicio de sesión
    });
  }

  handleLogout = () => {
    // Mostrar la alerta de confirmación de SweetAlert
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro de cerrar sesión?',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Limpiar el token de autenticación del almacenamiento local
        localStorage.removeItem('token');
        // Establecer el estado de autenticación en falso y limpiar el token
        this.setState({ isAuthenticated: false, token: null, notes: [] });

        // Mostrar la alerta de SweetAlert
        Swal.fire({
          icon: 'success',
          title: '¡Sesión cerrada!',
          text: 'Tu sesión ha sido cerrada correctamente.',
          timer: 1000, // 5 segundos
          showConfirmButton: false
        });
      }
    });
  }

  toggleUserInfo = () => {
    this.setState(prevState => ({
      showUserInfo: !prevState.showUserInfo
    }));
  };

  render() {
    const { notes, isAuthenticated, showUserInfo } = this.state;
    return (
      <BrowserRouter>
        <div className='bg'>
          <div className="">
            <HeaderContainer
              isAuthenticated={isAuthenticated}
              emailUsuario={this.state.emailUsuario}
              toggleUserInfo={this.toggleUserInfo}
              showUserInfo={showUserInfo}
              handleLogout={this.handleLogout}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              {isAuthenticated ? null : <Route path="/login" element={<Login onLogin={this.handleLogin} />} />}
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
          {isAuthenticated && (
            <div className="App">
              <NotesContainer
                notes={notes}
                addClick={this.addClick}
                deleteClick={this.deleteClick}
                updateClick={this.updateClick}
              />
            </div>
          )}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
