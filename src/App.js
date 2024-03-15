import './css/App.css';
import './css/Notes.css';
import React, { Component } from 'react';
import HeaderContainer from './components/HeaderContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotesContainer from './components/NotesContainer';
import deleteNote from './components/DeleteNoteService';
import updateNote from './components/UpdateNoteService';
import addNote from './components/AddNoteService';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Swal from 'sweetalert2';
import axios from 'axios';
import * as jose from 'jose'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      token: null,
      emailUsuario: null,
      tokenExpiration: null,
      alertTimer: null,
      notes: [],
      isSessionAlertActive: false, // Bandera para controlar si la alerta está activa
    };
    this.API_URL = "http://localhost:5267/";
  }

  componentDidMount() {
    this.checkAuthentication();
  }

  componentWillUnmount() {
    clearTimeout(this.state.alertTimer);
  }

  toggleUserInfo = () => {
    this.setState(prevState => ({
      showUserInfo: !prevState.showUserInfo
    }));
  };

  addClick = (newNote) => {
    addNote(newNote, this.state.token, this.refreshNotes);
  }

  deleteClick = (id) => {
    deleteNote(id, this.state.token, this.refreshNotes);
  }

  updateClick = (id) => {
    updateNote(id, this.state.token, this.refreshNotes);
  }

  startAlertTimer = () => {
    const timeUntilExpiration = this.state.tokenExpiration - Date.now();
    const timeToShowAlert = timeUntilExpiration - 10000;
    const alertTimer = setTimeout(() => {
      this.showExtendSessionAlert();
    }, timeToShowAlert);
    this.setState({ alertTimer: alertTimer });
  };

  checkAuthentication = () => {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (token && tokenExpiration && Date.now() < tokenExpiration) {
      this.setState({
        isAuthenticated: true,
        token: token,
        tokenExpiration: tokenExpiration,
      });
      this.refreshNotes();
      this.startAlertTimer();
    } else {
      this.handleLogout();
    }
  };

  handleLogin = (token, email, tokenExpiration) => {
    this.setState(
      {
        isAuthenticated: true,
        token: token,
        emailUsuario: email,
        tokenExpiration: tokenExpiration,
      },
      () => {
        localStorage.setItem('token', token);
        localStorage.setItem('tokenExpiration', tokenExpiration);
        this.refreshNotes();
        this.startAlertTimer();
      }
    );
  };

  handleLogout = () => {
    // Verificar si estamos realizando un logout
    if (this.state.isAuthenticated) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      clearTimeout(this.state.alertTimer);
      this.setState({
        isAuthenticated: false,
        token: null,
        emailUsuario: null,
        tokenExpiration: null,
        notes: [],
      });
      // Alerta de sesión cerrada correctamente solo cuando se cierra sesión
      Swal.fire({
        icon: 'success',
        title: '¡Sesión cerrada!',
        text: 'Tu sesión ha sido cerrada correctamente.',
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  refreshNotes = () => {
    axios
      .get(this.API_URL + 'api/todoapp/GetNotes', {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((response) => {
        this.setState({ notes: response.data });
      })
      .catch((error) => {
        console.error('Error fetching notes:', error);
      });
  };

  showExtendSessionAlert = () => {
    // Verificar si la alerta de extensión de sesión ya está activa
    if (!this.state.isSessionAlertActive) {
      this.setState({ isSessionAlertActive: true }, () => {
        Swal.fire({
          title: 'Tu sesión actual caducó',
          text: '¿Quieres extenderla?',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Sí',
          cancelButtonText: 'No',
        }).then((result) => {
          this.setState({ isSessionAlertActive: false }); // Marcar la alerta como inactiva después de cerrarse
          if (result.isConfirmed) {
            this.extendSession();
          } else {
            this.handleLogout();
          }
        });
      });
    }
  };

  extendSession = () => {
    const userEmail = this.state.emailUsuario;
    const extendSessionUrl = `${this.API_URL}api/Auth/ExtendSession?userEmail=${encodeURIComponent(
      userEmail
    )}`;
    axios
      .post(extendSessionUrl, null, {
        headers: {
          Authorization: `Bearer ${this.state.token}`,
        },
      })
      .then((response) => {
        const newSessionToken = response.data.SessionToken;
        const { exp } = jose.decodeJwt(newSessionToken);
        this.setState({ token: newSessionToken, tokenExpiration: exp * 1000 }, () => {
          localStorage.setItem('token', newSessionToken);
          localStorage.setItem('tokenExpiration', exp * 1000);
          this.startAlertTimer();
        });
        Swal.fire({
          icon: 'success',
          title: '¡Sesión extendida!',
          text: 'Tu sesión ha sido extendida correctamente.',
          timer: 1000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error('Error al extender la sesión:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al extender la sesión',
          text:
            'Ha ocurrido un error al intentar extender la sesión. Por favor, inténtalo de nuevo más tarde.',
        });
      });
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