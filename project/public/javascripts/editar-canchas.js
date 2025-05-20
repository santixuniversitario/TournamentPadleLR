document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const editForm = document.getElementById('editCourtForm');
    const cancelBtn = document.getElementById('cancelEditBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const deleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    const addPhotosInput = document.getElementById('addPhotos');
    const photoGallery = document.querySelector('.photo-gallery');

    // Cargar datos existentes (simulación)
    function loadCourtData() {
        // En una aplicación real, estos datos vendrían de una API
        console.log("Cargando datos de la cancha...");
    }

    // Manejar envío del formulario
    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar campos requeridos
        const requiredFields = [
            'editClubName', 'editCourtNumber', 'editStatus',
            'editAddress', 'editCity', 'editProvince',
            'editCourtType', 'editSurface', 'editLighting'
        ];
        
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
        
        // Obtener datos del formulario
        const formData = {
            informacionBasica: {
                club: document.getElementById('editClubName').value,
                numero: document.getElementById('editCourtNumber').value,
                estado: document.getElementById('editStatus').value
            },
            ubicacion: {
                direccion: document.getElementById('editAddress').value,
                ciudad: document.getElementById('editCity').value,
                provincia: document.getElementById('editProvince').value,
                codigoPostal: document.getElementById('editZipCode').value,
                referencias: document.getElementById('editLocationNotes').value
            },
            caracteristicas: {
                tipo: document.getElementById('editCourtType').value,
                superficie: document.getElementById('editSurface').value,
                iluminacion: document.getElementById('editLighting').value,
                capacidad: document.getElementById('editCapacity').value,
                servicios: {
                    vestuarios: document.getElementById('editHasRestroom').checked,
                    estacionamiento: document.getElementById('editHasParking').checked,
                    cafeteria: document.getElementById('editHasCafeteria').checked,
                    duchas: document.getElementById('editHasShowers').checked
                }
            },
            multimedia: {
                fotos: document.querySelectorAll('.gallery-item:not(.add-photo)').length,
                video: document.getElementById('editVideoLink').value,
                nuevasFotos: addPhotosInput.files
            }
        };
        
        console.log('Datos a actualizar:', formData);
        alert('Cambios guardados exitosamente (simulación)');
        // Aquí iría el envío real al servidor
    });
    
    // Botón Cancelar
    cancelBtn.addEventListener('click', function() {
        if (confirm('¿Está seguro que desea cancelar? Los cambios no guardados se perderán.')) {
            window.location.href = 'gestion-canchas.html';
        }
    });
    
    // Botón Eliminar
    deleteBtn.addEventListener('click', function() {
        deleteModal.show();
    });
    
    confirmDeleteBtn.addEventListener('click', function() {
        deleteModal.hide();
        alert('Cancha eliminada exitosamente (simulación)');
        // Redirigir después de eliminar
        window.location.href = 'gestion-canchas.html';
    });
    
    // Eliminar fotos existentes
    document.querySelectorAll('.delete-photo').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (confirm('¿Eliminar esta foto?')) {
                this.closest('.gallery-item').remove();
            }
        });
    });
    
    // Añadir nuevas fotos
    addPhotosInput.addEventListener('change', function(e) {
        if (e.target.files && e.target.files.length > 0) {
            Array.from(e.target.files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    reader.onload = function(event) {
                        const newPhoto = document.createElement('div');
                        newPhoto.className = 'gallery-item';
                        newPhoto.innerHTML = `
                            <img src="${event.target.result}" alt="Nueva foto">
                            <button class="delete-photo" aria-label="Eliminar foto">
                                <i class="fas fa-times"></i>
                            </button>
                        `;
                        photoGallery.insertBefore(newPhoto, photoGallery.lastElementChild);
                        
                        // Agregar evento al nuevo botón de eliminar
                        newPhoto.querySelector('.delete-photo').addEventListener('click', function() {
                            if (confirm('¿Eliminar esta foto?')) {
                                newPhoto.remove();
                            }
                        });
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
            
            // Resetear el input para permitir subir las mismas fotos otra vez si es necesario
            addPhotosInput.value = '';
        }
    });
    
    // Cargar datos al iniciar
    loadCourtData();
});