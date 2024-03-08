import Swal from 'sweetalert2';

const API_URL = "http://localhost:5267/";

const deleteNote = (id, token, refreshNotes) => {
  fetch(API_URL + "api/todoapp/DeleteNotes?id=" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}` // Agregar el token al encabezado de autorización
    }
  })
    .then(res => res.json())
    .then(result => {
      Swal.fire(result);
      refreshNotes();
    })
    .catch(error => console.error('Error deleting note:', error));
};

export default deleteNote;
