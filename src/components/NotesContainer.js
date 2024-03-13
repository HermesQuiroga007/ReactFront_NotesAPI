import React from 'react';
import Swal from 'sweetalert2';
import '../css/App.css';

class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newNoteInput: ''
    };
    this.alertTimer = null; // Guardar el temporizador en una variable de instancia
    this.redirectTimer = null; // Guardar el temporizador de redirección en una variable de instancia
  }

  componentDidMount() {
    // Iniciar temporizador para mostrar la alerta después de 50 segundos
    this.startAlertTimer();
  }

  componentWillUnmount() {
    // Limpiar temporizadores al desmontar el componente
    clearTimeout(this.alertTimer);
    clearTimeout(this.redirectTimer);
  }

  startAlertTimer = () => {
    this.alertTimer = setTimeout(() => {
      // Mostrar la alerta con SweetAlert2
      this.showSessionExpirationAlert();
    }, 50000); // 50 segundos

    this.redirectTimer = setTimeout(() => {
      window.location.href = '/login'; // Cambia '/login' por la ruta de tu página de inicio de sesión
    }, 62000); // 10 segundos después de que se muestre la alerta
  };

  handleLogout = () => {
    // Limpiar temporizadores al hacer clic en el botón de "Logout"
    clearTimeout(this.alertTimer);
    clearTimeout(this.redirectTimer);
    // Aquí debes agregar la lógica para cerrar sesión
    // Por ejemplo, puedes llamar a una función en tu componente padre que maneje el proceso de cierre de sesión
    // this.props.handleLogout();
  };

  showSessionExpirationAlert = () => {
    // Mostrar la alerta con SweetAlert2
    Swal.fire({
      title: 'Sesión a punto de expirar',
      text: 'Su sesión está a punto de expirar',
      timer: 5000, // 5 segundos
      icon: 'warning',
      showCancelButton: false,
      showConfirmButton: true
    });
  };

  render() {
    const { notes, addClick, deleteClick, updateClick } = this.props;
    return (
      <div className='bgnc'>
        <div className="container">
          <h2 className="mb-4 text-center" style={{ paddingTop: '20px', color: 'white', fontFamily: 'sans-serif' }}>Notas</h2>
          <div className="input-group mb-3" style={{ justifyContent: 'center', paddingBottom: '10px', flexWrap: 'nowrap' }}>
            <input
              id="newNotes"
              type="text"
              className="form-control"
              placeholder="Enter your note"
              aria-label="Note"
              aria-describedby="add-note-btn"
              ref={input => this.newNoteInput = input}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  addClick(this.newNoteInput.value);
                  this.newNoteInput.value = ''; // Limpiar el campo de entrada después de agregar la nota
                }
              }}
            />
            <div className="input-group-append">
              <button
                style={{ marginLeft: '0px', margin: '0px' }}
                className="btn btn-outline-light"
                type="button"
                id="add-note-btn"
                onClick={() => addClick(this.newNoteInput.value)}
              >Añadir
              </button>
            </div>
          </div>

          <div className="row">
            {notes.length === 0 ? (
              <div className="col-md-12 text-center" style={{ padding: '5%' }}>
                <h4 style={{ color: 'white' }}><strong>No hay notas disponibles</strong></h4>
              </div>
            ) : (
              notes.map(note =>
                <div key={note.id} className="col-md-4 mb-4" style={{ paddingTop: '10px' }}>
                  <div className="card card1" style={{ border: 'none', borderRadius: '3mm' }}>
                    <div className="card-body">
                      <div className="description">
                        <h5 className="card-title text-center">{note.description}</h5>
                      </div>
                      <div className="buttons text-center">
                        <button className="btn btn-outline-success btn-sm" onClick={() => updateClick(note.id)}>Update</button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => deleteClick(note.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default NotesContainer;
