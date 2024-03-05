import Swal from 'sweetalert2';

const API_URL = "http://localhost:5267/";

const addNote = (newNote, refreshNotes) => {
  // Verifica si el campo está vacío
  if (!newNote.trim()) {
    Swal.fire({
      icon: 'error',
      title: 'Campo Vacío',
      text: 'Por favor, ingresa una nota antes de agregarla.'
    });
    return; // Detiene la ejecución si el campo está vacío
  }

  const data = new FormData();
  data.append("newNotes", newNote);

  fetch(API_URL + "api/todoapp/AddNotes", {
    method: "POST",
    body: data
  })
    .then(res => res.json())
    .then(result => {
      Swal.fire(result);
      refreshNotes();
    })
    .catch(error => console.error('Error adding note:', error));
};

export default addNote;
