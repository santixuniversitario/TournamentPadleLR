
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const matchForm = document.getElementById('matchForm');
    const cancelBtn = document.getElementById('cancelMatchBtn');
    const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
    const confirmBtn = document.getElementById('confirmMatchBtn');
    const playerSelects = document.querySelectorAll('.player-select');
    const playerWarning = document.getElementById('playerWarning');

    // Validar jugadores únicos
    function validateUniquePlayers() {
        const selectedPlayers = new Set();
        let hasDuplicates = false;
        
        playerSelects.forEach(select => {
            if (select.value) {
                if (selectedPlayers.has(select.value)) {
                    hasDuplicates = true;
                }
                selectedPlayers.add(select.value);
            }
        });
        
        if (hasDuplicates && selectedPlayers.size > 0) {
            playerWarning.style.display = 'block';
            return false;
        } else {
            playerWarning.style.display = 'none';
            return true;
        }
    }

    // Actualizar validación al cambiar jugadores
    playerSelects.forEach(select => {
        select.addEventListener('change', validateUniquePlayers);
    });

    // Manejar envío del formulario
    matchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar jugadores únicos
        if (!validateUniquePlayers()) {
            return;
        }
        
        // Validar campos requeridos
        const requiredFields = [
            'player1', 'player2', 'player3', 'player4',
            'courtSelect', 'matchDate', 'matchTime', 'matchDuration'
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
        
        // Preparar datos para mostrar en modal de confirmación
        prepareConfirmation();
        confirmModal.show();
    });
    
    // Preparar detalles de confirmación
    function prepareConfirmation() {
        const confirmationDetails = document.getElementById('confirmationDetails');
        
        // Obtener nombres de jugadores
        const getPlayerName = (id) => {
            const select = document.getElementById(id);
            return select.options[select.selectedIndex].text.split(' (')[0];
        };
        
        // Obtener nombre de cancha
        const courtSelect = document.getElementById('courtSelect');
        const courtName = courtSelect.options[courtSelect.selectedIndex].text;
        
        // Formatear fecha y hora
        const matchDate = new Date(document.getElementById('matchDate').value);
        const matchTime = document.getElementById('matchTime').value;
        const [hours, minutes] = matchTime.split(':');
        matchDate.setHours(hours, minutes);
        
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        
        const formattedDateTime = matchDate.toLocaleDateString('es-ES', options);
        
        // Construir HTML de confirmación
        confirmationDetails.innerHTML = `
            <div class="confirmation-item">
                <span class="confirmation-label">Equipo 1:</span>
                <span>${getPlayerName('player1')} y ${getPlayerName('player2')}</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">Equipo 2:</span>
                <span>${getPlayerName('player3')} y ${getPlayerName('player4')}</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">Cancha:</span>
                <span>${courtName}</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">Fecha y Hora:</span>
                <span>${formattedDateTime}</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">Duración:</span>
                <span>${document.getElementById('matchDuration').options[document.getElementById('matchDuration').selectedIndex].text}</span>
            </div>
            <div class="confirmation-item">
                <span class="confirmation-label">Observaciones:</span>
                <span>${document.getElementById('matchNotes').value || 'Ninguna'}</span>
            </div>
        `;
    }
    
    // Confirmar partido
    confirmBtn.addEventListener('click', function() {
        confirmModal.hide();
        
        // Aquí iría el envío real al servidor
        const formData = {
            equipo1: [
                { id: document.getElementById('player1').value, nombre: document.getElementById('player1').options[document.getElementById('player1').selectedIndex].text.split(' (')[0] },
                { id: document.getElementById('player2').value, nombre: document.getElementById('player2').options[document.getElementById('player2').selectedIndex].text.split(' (')[0] }
            ],
            equipo2: [
                { id: document.getElementById('player3').value, nombre: document.getElementById('player3').options[document.getElementById('player3').selectedIndex].text.split(' (')[0] },
                { id: document.getElementById('player4').value, nombre: document.getElementById('player4').options[document.getElementById('player4').selectedIndex].text.split(' (')[0] }
            ],
            cancha: {
                id: document.getElementById('courtSelect').value,
                nombre: document.getElementById('courtSelect').options[document.getElementById('courtSelect').selectedIndex].text
            },
            fecha: document.getElementById('matchDate').value,
            hora: document.getElementById('matchTime').value,
            duracion: document.getElementById('matchDuration').value,
            observaciones: document.getElementById('matchNotes').value
        };
        
        console.log('Datos del partido:', formData);
        alert('Partido programado exitosamente (simulación)');
        matchForm.reset();
    });
    
    // Botón Cancelar
    cancelBtn.addEventListener('click', function() {
        if (confirm('¿Está seguro que desea cancelar? Los datos no guardados se perderán.')) {
            matchForm.reset();
            // window.location.href = 'torneo.html';
        }
    });
    
    // Establecer fecha mínima como hoy
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('matchDate').min = today;
});