import './App.css';
import { Component } from 'react';
import deleteNote from './components/DeleteNoteService'; // Importa la función deleteNote
import addNote from './components/AddNoteService';
import updateNote from './components/UpdateNoteService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
    this.API_URL = "http://localhost:5267/";
  }

  componentDidMount() {
    this.refreshNotes();
  }


  refreshNotes = () => {
    fetch(this.API_URL + "api/todoapp/GetNotes")
      .then(response => response.json())
      .then(data => {
        this.setState({ notes: data });
      })
      .catch(error => console.error('Error fetching notes:', error));
  }


  addClick = (newNote) => {
    // Llama a la función addNote y pasa la nota y refreshNotes como argumentos
    addNote(newNote, this.refreshNotes);
  }

  deleteClick = (id) => {
    // Llama a la función deleteNote y pasa la función refreshNotes como argumento
    deleteNote(id, this.refreshNotes);
  }

  updateClick = (id) => {
    // Llama a la función updateNote y pasa el id y refreshNotes como argumentos
    updateNote(id, this.refreshNotes);
  }

  render() {
    const { notes } = this.state;
    return (
      <div className="container">
        <h2 className="mb-4 text-center" style={{ paddingTop: '20px', color: '#0D6EFD', fontFamily: 'sans-serif' }}>Notas</h2>
        <div className="input-group mb-3" style={{ justifyContent: 'center', paddingBottom: '10px', flexWrap: 'nowrap' }}>
          <input style={{ borderColor: '#0D6EFD' }}
            id="newNotes"
            type="text"
            className="form-control"
            placeholder="Enter your note"
            aria-label="Note"
            aria-describedby="add-note-btn"
            ref={input => this.newNoteInput = input} // Referencia al input
          />
          <div className="input-group-append">
            <button style={{ marginLeft: '0px', margin: '0px' }}
              className="btn btn-outline-primary"
              type="button"
              id="add-note-btn"
              onClick={() => this.addClick(this.newNoteInput.value)} // Llama a addClick con el valor del input
            >Add Note</button>
          </div>
        </div>
        <div className="row">
          {notes.length === 0 ? (
            <div className="col-md-12 text-center" style={{ padding: '5%' }}>

              <h4 style={{ color: '#0D6EFD' }}><strong>No hay notas disponibles</strong></h4>

            </div>
          ) : (
            notes.map(note =>
              <div key={note.id} className="col-md-4 mb-4" style={{ paddingTop: '10px' }}>
                <div className="card" style={{ border: 'none', borderRadius: '3mm' }}>
                  <div className="card-body">
                    <div className="description">
                      <h5 className="card-title text-center">{note.description}</h5>
                    </div>
                    <div className="buttons text-center">
                      <button className="btn btn-outline-success btn-sm" onClick={() => this.updateClick(note.id)}>Update</button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => this.deleteClick(note.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}


export default App;
