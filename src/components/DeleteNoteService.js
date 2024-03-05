import Swal from 'sweetalert2';

const API_URL = "http://localhost:5267/";

const deleteNote = (id, refreshNotes) => {
  fetch(API_URL + "api/todoapp/DeleteNotes?id=" + id, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(result => {
      // Mostrar mensaje de confirmación utilizando Swal
      Swal.fire(result);
      
      // Actualizar las notas después de eliminar una
      refreshNotes();
    })
    .catch(error => console.error('Error deleting note:', error));
};

export default deleteNote;
