import Swal from 'sweetalert2';

const API_URL = "http://localhost:5267/";

const updateNote = (id, refreshNotes) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Quieres actualizar la nota?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, actualizar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(API_URL + "api/todoapp/GetNotes")
        .then(response => response.json())
        .then(data => {
          const note = data.find(note => note.id === id);
          if (note && note.description) {
            Swal.fire({
              title: 'Ingrese la nota actualizada:',
              input: 'text',
              inputValue: note.description,
              inputAttributes: {
                autocapitalize: 'off'
              },
              showCancelButton: true,
              confirmButtonText: 'Actualizar',
              cancelButtonText: 'Cancelar',
              showLoaderOnConfirm: true,
              preConfirm: (updatedNote) => {
                if (!updatedNote) {
                  Swal.showValidationMessage('La nota actualizada es obligatoria');
                }
                return updatedNote;
              }
            }).then((result) => {
              if (result.isConfirmed) {
                fetch(API_URL + "api/todoapp/UpdateNotes?id=" + id + "&newDescription=" + result.value, {
                  method: "PUT",
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
                  .then(res => res.text())
                  .then(result => {
                    Swal.fire({
                      title: '¡Nota actualizada!',
                      text: result,
                      icon: 'success'
                    });
                    refreshNotes();
                  })
                  .catch(error => console.error('Error updating note:', error));
              }
            });
          } else {
            console.error('No se encontró la nota correspondiente.');
          }
        })
        .catch(error => console.error('Error fetching notes:', error));
    }
  });
};

export default updateNote;
