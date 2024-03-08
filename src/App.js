import './App.css';
import { Component } from 'react';
import deleteNote from './components/DeleteNoteService';
import addNote from './components/AddNoteService';
import updateNote from './components/UpdateNoteService';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import NotesContainer from './components/NotesContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      isAuthenticated: false,
      token: null
    };
    this.API_URL = "http://localhost:5267/";
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

  handleLogin = (token) => {
    // Actualizar el estado de autenticación y el token después de un inicio de sesión exitoso
    this.setState({ isAuthenticated: true, token: token }, () => {
      this.refreshNotes(); // Actualizar las notas después del inicio de sesión
    });
  }

  handleLogout = () => {
    // Limpiar el token de autenticación del almacenamiento local
    localStorage.removeItem('token');
    // Establecer el estado de autenticación en falso y limpiar el token
    this.setState({ isAuthenticated: false, token: null, notes: [] });
  }

  render() {
    const { notes, isAuthenticated } = this.state;
    return (
      <BrowserRouter>
        <div>
          <div className="App">
            <header className="text-white" style={{ backgroundColor: '#D6EFF6' }}>
              <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                  <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><Link to="/" className="nav-link text-dark"><strong>Home</strong></Link></li>
                  </ul>
                  <div className="text-end">
                    {!isAuthenticated && (
                      <Link to="/login" className="btn btn-outline-dark me-2">Login</Link>
                    )}
                    {!isAuthenticated && (
                      <Link to="/register" className="btn btn-outline-dark me-2">Register</Link>
                    )}
                    {isAuthenticated && (
                      <button className="btn btn-outline-dark me-2" onClick={this.handleLogout}>Logout</button>
                    )}
                  </div>
                </div>
              </div>
            </header>
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
