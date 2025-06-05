// Script para manejar el modal de edición de duplas en ver-inscriptos.ejs

document.addEventListener('DOMContentLoaded', function() {
  var editModal = document.getElementById('editDuplaModal');
  var jugador1Select = document.getElementById('editJugador1');
  var jugador2Select = document.getElementById('editJugador2');

  // Asocia los botones de editar con el modal
  document.querySelectorAll('.edit-dupla-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var jugador1 = btn.getAttribute('data-jugador1');
      var jugador2 = btn.getAttribute('data-jugador2');
      jugador1Select.value = jugador1;
      jugador2Select.value = jugador2;
    });
  });

  // Puedes agregar aquí la lógica para guardar los cambios al enviar el formulario del modal
  // document.querySelector('#editDuplaModal form').addEventListener('submit', function(e) {
  //   e.preventDefault();
  //   // Tu lógica para guardar cambios
  // });
});
