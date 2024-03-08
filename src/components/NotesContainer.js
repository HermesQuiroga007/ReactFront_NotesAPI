import React from 'react';
import '../App.css';

class NotesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newNoteInput: ''
    };
  }

  render() {
    const { notes, addClick, deleteClick, updateClick } = this.props;
    return (
      <div>
        <div className="container clr">
          <h2 className="mb-4 text-center" style={{ paddingTop: '20px', color: '#0D6EFD', fontFamily: 'sans-serif' }}>Notas</h2>
          <div className="input-group mb-3" style={{ justifyContent: 'center', paddingBottom: '10px', flexWrap: 'nowrap' }}>
            <input style={{ borderColor: '#0D6EFD' }}
              id="newNotes"
              type="text"
              className="form-control"
              placeholder="Enter your note"
              aria-label="Note"
              aria-describedby="add-note-btn"
              ref={input => this.newNoteInput = input}
            />
            <div className="input-group-append">
              <button style={{ marginLeft: '0px', margin: '0px' }}
                className="btn btn-outline-primary"
                type="button"
                id="add-note-btn"
                onClick={() => addClick(this.newNoteInput.value)}
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
}

export default NotesContainer;
