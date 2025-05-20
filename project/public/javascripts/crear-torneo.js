document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const tournamentForm = document.getElementById('tournamentForm');
    const cancelBtn = document.getElementById('cancelTournamentBtn');
    const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
    const confirmBtn = document.getElementById('confirmTournamentBtn');
    const categoriesContainer = document.getElementById('categoriesContainer');
    const categoryCount = document.getElementById('categoryCount');
    const increaseBtn = document.getElementById('increaseCategories');
    const decreaseBtn = document.getElementById('decreaseCategories');
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    const registrationDeadline = document.getElementById('registrationDeadline');

    // Establecer fechas mínimas
    const today = new Date().toISOString().split('T')[0];
    startDate.min = today;
    endDate.min = today;
    registrationDeadline.min = today;

    // Manejar cambio de fechas
    startDate.addEventListener('change', function() {
        endDate.min = this.value;
        registrationDeadline.max = this.value;
    });

    endDate.addEventListener('change', function() {
        startDate.max = this.value;
    });

    // Generar categorías dinámicamente
    function generateCategoryFields(count) {
        categoriesContainer.innerHTML = '';
        
        for (let i = 1; i <= count; i++) {
            const categoryHTML = `
                <div class="category-card" data-category="${i}">
                    <div class="category-header">
                        <h4>Categoría ${i}</h4>
                        <button type="button" class="btn btn-sm btn-outline-danger remove-category" ${i === 1 ? 'disabled' : ''}>
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label for="categoryName${i}" class="form-label">Nombre*</label>
                            <input type="text" class="form-control category-name" id="categoryName${i}" placeholder="Ej: 7ma Hombres" required>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="categoryGender${i}" class="form-label">Género*</label>
                            <select class="form-select" id="categoryGender${i}" required>
                                <option value="male">Hombres</option>
                                <option value="female">Mujeres</option>
                                <option value="mixed">Mixto</option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="categoryLevel${i}" class="form-label">Nivel*</label>
                            <select class="form-select" id="categoryLevel${i}" required>
                                <option value="3">3ra</option>
                                <option value="4">4ta</option>
                                <option value="5">5ta</option>
                                <option value="6">6ta</option>
                                <option value="7" selected>7ma</option>
                                <option value="8">8va</option>
                                <option value="9">9na</option>
                                <option value="10">10ma</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="categoryFee${i}" class="form-label">Cuota de Inscripción (ARS)</label>
                            <input type="number" class="form-control" id="categoryFee${i}" min="0" placeholder="Opcional">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="categoryMaxTeams${i}" class="form-label">Máximo de equipos</label>
                            <input type="number" class="form-control" id="categoryMaxTeams${i}" min="2" placeholder="Opcional">
                        </div>
                    </div>
                </div>
            `;
            
            categoriesContainer.insertAdjacentHTML('beforeend', categoryHTML);
        }
        
        // Agregar eventos a los botones de eliminar
        document.querySelectorAll('.remove-category:not([disabled])').forEach(btn => {
            btn.addEventListener('click', function() {
                if (parseInt(categoryCount.value) > 1) {
                    this.closest('.category-card').remove();
                    categoryCount.value = parseInt(categoryCount.value) - 1;
                    renumberCategories();
                }
            });
        });
    }

    // Renumerar categorías después de eliminar
    function renumberCategories() {
        const categories = document.querySelectorAll('.category-card');
        categories.forEach((card, index) => {
            const cardNumber = index + 1;
            card.setAttribute('data-category', cardNumber);
            card.querySelector('h4').textContent = `Categoría ${cardNumber}`;
            
            // Actualizar IDs y nombres de los inputs
            card.querySelectorAll('input, select').forEach(input => {
                const oldId = input.id;
                const newId = oldId.replace(/\d+$/, cardNumber);
                input.id = newId;
            });
            
            // Actualizar labels
            card.querySelectorAll('label').forEach(label => {
                const oldFor = label.getAttribute('for');
                if (oldFor) {
                    const newFor = oldFor.replace(/\d+$/, cardNumber);
                    label.setAttribute('for', newFor);
                }
            });
            
            // Deshabilitar botón de eliminar si es la primera categoría
            const removeBtn = card.querySelector('.remove-category');
            if (cardNumber === 1) {
                removeBtn.disabled = true;
            } else {
                removeBtn.disabled = false;
            }
        });
    }

    // Manejar cambio en cantidad de categorías
    increaseBtn.addEventListener('click', function() {
        if (parseInt(categoryCount.value) < 10) {
            categoryCount.value = parseInt(categoryCount.value) + 1;
            generateCategoryFields(categoryCount.value);
        }
    });

    decreaseBtn.addEventListener('click', function() {
        if (parseInt(categoryCount.value) > 1) {
            categoryCount.value = parseInt(categoryCount.value) - 1;
            generateCategoryFields(categoryCount.value);
        }
    });

    // Inicializar con una categoría
    generateCategoryFields(1);

    // Manejar envío del formulario
    tournamentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar campos requeridos
        const requiredFields = [
            'tournamentName', 'tournamentType', 
            'startDate', 'endDate', 'registrationDeadline',
            'venueSelect', 'weekdayStart', 'weekdayEnd',
            'weekendStart', 'weekendEnd', 'matchDuration'
        ];
        
        // Validar nombres de categorías
        const categoryNames = document.querySelectorAll('.category-name');
        let categoryNamesValid = true;
        
        categoryNames.forEach(input => {
            if (!input.value) {
                input.classList.add('is-invalid');
                categoryNamesValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });
        
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
        
        if (!isValid || !categoryNamesValid) {
            alert('Por favor complete todos los campos requeridos');
            return;
        }
        
        // Validar fechas
        if (new Date(endDate.value) < new Date(startDate.value)) {
            alert('La fecha de finalización no puede ser anterior a la de inicio');
            endDate.classList.add('is-invalid');
            return;
        }
        
        if (new Date(registrationDeadline.value) > new Date(startDate.value)) {
            alert('El cierre de inscripción no puede ser después del inicio del torneo');
            registrationDeadline.classList.add('is-invalid');
            return;
        }
        
        // Preparar confirmación
        prepareConfirmation();
        confirmModal.show();
    });
    
    // Preparar detalles de confirmación
    function prepareConfirmation() {
        const confirmationDetails = document.getElementById('confirmationDetails');
        
        // Obtener categorías
        let categoriesHTML = '';
        document.querySelectorAll('.category-card').forEach(card => {
            const name = card.querySelector('.category-name').value;
            const gender = card.querySelector('select[id^="categoryGender"]').options[card.querySelector('select[id^="categoryGender"]').selectedIndex].text;
            const level = card.querySelector('select[id^="categoryLevel"]').options[card.querySelector('select[id^="categoryLevel"]').selectedIndex].text;
            const fee = card.querySelector('input[id^="categoryFee"]').value || 'Gratis';
            const maxTeams = card.querySelector('input[id^="categoryMaxTeams"]').value || 'Sin límite';
            
            categoriesHTML += `
                <div class="confirmation-category">
                    <div class="confirmation-item">
                        <span class="confirmation-label">Nombre:</span>
                        <span>${name}</span>
                    </div>
                    <div class="confirmation-item">
                        <span class="confirmation-label">Género y Nivel:</span>
                        <span>${gender} - ${level}</span>
                    </div>
                    <div class="confirmation-item">
                        <span class="confirmation-label">Cuota:</span>
                        <span>ARS ${fee}</span>
                    </div>
                    <div class="confirmation-item">
                        <span class="confirmation-label">Máx. equipos:</span>
                        <span>${maxTeams}</span>
                    </div>
                </div>
            `;
        });
        
        // Obtener complejo
        const venueSelect = document.getElementById('venueSelect');
        const venueName = venueSelect.options[venueSelect.selectedIndex].text;
        
        // Formatear fechas
        const formatDate = (dateString) => {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('es-ES', options);
        };
        
        // Construir HTML de confirmación
        confirmationDetails.innerHTML = `
            <div class="confirmation-item">
                <span class="confirmation-label">Nombre del Torneo:</span>
                <span>${document.getElementById('tournamentName').value}</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">Tipo:</span>
                <span>${document.getElementById('tournamentType').options[document.getElementById('tournamentType').selectedIndex].text}</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">Fecha de Inicio:</span>
                <span>${formatDate(document.getElementById('startDate').value)}</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">Fecha de Finalización:</span>
                <span>${formatDate(document.getElementById('endDate').value)}</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">Cierre de Inscripción:</span>
                <span>${formatDate(document.getElementById('registrationDeadline').value)}</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">Complejo:</span>
                <span>${venueName}</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">Horarios:</span>
                <span>
                    L-V: ${document.getElementById('weekdayStart').value} a ${document.getElementById('weekdayEnd').value} hs | 
                    S-D: ${document.getElementById('weekendStart').value} a ${document.getElementById('weekendEnd').value} hs
                </span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">Duración de partidos:</span>
                <span>${document.getElementById('matchDuration').options[document.getElementById('matchDuration').selectedIndex].text}</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">Descripción:</span>
                <span>${document.getElementById('tournamentDescription').value || 'Ninguna'}</span>
            </div>
            <h5 class="mt-4 mb-3">Categorías:</h5>
            ${categoriesHTML}
        `;
    }
    
    // Confirmar creación de torneo
    confirmBtn.addEventListener('click', function() {
        confirmModal.hide();
        
        // Aquí iría el envío real al servidor
        const formData = {
            nombre: document.getElementById('tournamentName').value,
            tipo: document.getElementById('tournamentType').value,
            fechaInicio: document.getElementById('startDate').value,
            fechaFin: document.getElementById('endDate').value,
            cierreInscripcion: document.getElementById('registrationDeadline').value,
            descripcion: document.getElementById('tournamentDescription').value,
            complejo: {
                id: document.getElementById('venueSelect').value,
                nombre: document.getElementById('venueSelect').options[document.getElementById('venueSelect').selectedIndex].text
            },
            horarios: {
                semana: {
                    inicio: document.getElementById('weekdayStart').value,
                    fin: document.getElementById('weekdayEnd').value
                },
                finDeSemana: {
                    inicio: document.getElementById('weekendStart').value,
                    fin: document.getElementById('weekendEnd').value
                }
            },
            duracionPartidos: document.getElementById('matchDuration').value,
            categorias: []
        };
        
        // Agregar categorías
        document.querySelectorAll('.category-card').forEach(card => {
            formData.categorias.push({
                nombre: card.querySelector('.category-name').value,
                genero: card.querySelector('select[id^="categoryGender"]').value,
                nivel: card.querySelector('select[id^="categoryLevel"]').value,
                cuota: card.querySelector('input[id^="categoryFee"]').value || 0,
                maxEquipos: card.querySelector('input[id^="categoryMaxTeams"]').value || null
            });
        });
        
        console.log('Datos del torneo:', formData);
        alert('Torneo creado exitosamente (simulación)');
        tournamentForm.reset();
        categoryCount.value = 1;
        generateCategoryFields(1);
    });
    
    // Botón Cancelar
    cancelBtn.addEventListener('click', function() {
        if (confirm('¿Está seguro que desea cancelar? Los datos no guardados se perderán.')) {
            tournamentForm.reset();
            categoryCount.value = 1;
            generateCategoryFields(1);
            // window.location.href = 'torneos.html';
        }
    });
});