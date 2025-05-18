document.addEventListener('DOMContentLoaded', function() {
    // Previsualización de foto
    const photoUpload = document.getElementById('photoUpload');
    const profilePhoto = document.getElementById('profilePhoto');
    
    photoUpload.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                profilePhoto.src = event.target.result;
            }
            
            reader.readAsDataURL(e.target.files[0]);
        }
    });
    
    // Mostrar/ocultar contraseña
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Validación de contraseña
    const form = document.getElementById('profileForm');
    const newPassword = document.getElementById('newPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar que las contraseñas coincidan si se ingresaron
        if (newPassword.value || confirmPassword.value) {
            if (newPassword.value !== confirmPassword.value) {
                alert('Las contraseñas no coinciden');
                return;
            }
            
            if (newPassword.value.length < 8) {
                alert('La contraseña debe tener al menos 8 caracteres');
                return;
            }
            
            if (!/(?=.*\d)(?=.*[A-Z])/.test(newPassword.value)) {
                alert('La contraseña debe contener al menos una mayúscula y un número');
                return;
            }
        }
        
        // Aquí iría la lógica para guardar los cambios
        alert('Cambios guardados correctamente');
        // window.location.href = 'perfil.html';
    });
    
    // Botón Cancelar
    document.getElementById('cancelBtn').addEventListener('click', function() {
        if (confirm('¿Deseas descartar los cambios realizados?')) {
            window.location.href = 'ver-jugador';
        }
    });
});