document.addEventListener('DOMContentLoaded', function() {
    const courtForm = document.getElementById('courtForm');
    const cancelBtn = document.getElementById('cancelBtn');

    // Validación del formulario
    courtForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar campos requeridos
        const requiredFields = ['clubName', 'address', 'city', 'province', 'courtNumber', 'courtType', 'surface'];
        let isValid = true;
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });
        
        if (!isValid) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }
        
        // Obtener todos los datos del formulario
        const formData = {
            ubicacion: {
                club: document.getElementById('clubName').value,
                direccion: document.getElementById('address').value,
                ciudad: document.getElementById('city').value,
                provincia: document.getElementById('province').value,
                codigoPostal: document.getElementById('zipCode').value,
                referencias: document.getElementById('locationNotes').value
            },
            caracteristicas: {
                numero: document.getElementById('courtNumber').value,
                tipo: document.getElementById('courtType').value,
                superficie: document.getElementById('surface').value,
                capacidad: document.getElementById('capacity').value,
                iluminacion: document.getElementById('lighting').value,
                servicios: {
                    vestuarios: document.getElementById('hasRestroom').checked,
                    estacionamiento: document.getElementById('hasParking').checked,
                    cafeteria: document.getElementById('hasCafeteria').checked
                }
            },
            multimedia: {
                fotos: document.getElementById('courtPhotos').files,
                plano: document.getElementById('layoutImage').files[0],
                video: document.getElementById('videoLink').value
            }
        };
        
        console.log('Datos a enviar:', formData);
        alert('Cancha registrada exitosamente (simulación)');
        // Aquí iría el envío real al servidor
        // courtForm.reset();
    });
    
    // Botón Cancelar
    cancelBtn.addEventListener('click', function() {
        if (confirm('¿Está seguro que desea cancelar? Los datos no se guardarán.')) {
            courtForm.reset();
            // window.location.href = 'panel-control.html';
        }
    });
    
    // Validación en tiempo real
    document.querySelectorAll('input[required], select[required]').forEach(field => {
        field.addEventListener('input', function() {
            if (this.value) {
                this.classList.remove('is-invalid');
            }
        });
    });
});