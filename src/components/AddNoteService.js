import Swal from 'sweetalert2';

const API_URL = "http://localhost:5267/";

const addNote = (newNote, token, refreshNotes) => {
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
    body: data,
    headers: {
      Authorization: `Bearer ${token}` // Agregar el token al encabezado de autorización
    }
  })
    .then(res => res.json())
    .then(result => {
      Swal.fire(result);
      refreshNotes();
    })
    .catch(error => console.error('Error adding note:', error));
};

export default addNote;