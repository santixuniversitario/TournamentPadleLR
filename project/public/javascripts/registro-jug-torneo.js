document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const registrationForm = document.getElementById('registrationForm');
    const steps = document.querySelectorAll('.form-step');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const playerSelects = document.querySelectorAll('.player-select');
    const playerWarning = document.getElementById('playerWarning');
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));

    // Datos del torneo (simulados)
    const tournamentData = {
        categories: [
            {
                id: 1,
                name: "7ma Hombres",
                fee: 5000,
                maxTeams: 40,
                currentTeams: 20,
                level: "Intermedio"
            },
            {
                id: 2,
                name: "5ta Mixta",
                fee: 6000,
                maxTeams: 24,
                currentTeams: 15,
                level: "Avanzado"
            },
            {
                id: 3,
                name: "8va Mujeres",
                fee: 4500,
                maxTeams: 20,
                currentTeams: 12,
                level: "Intermedio"
            }
        ],
        players: [
            {
                id: 1,
                name: "Martín López",
                handicap: 4.5,
                ranking: 3,
                avatar: "images/jugador1.jpg"
            },
            {
                id: 2,
                name: "Carlos Sánchez",
                handicap: 3.0,
                ranking: 5,
                avatar: "images/jugador2.jpg"
            },
            {
                id: 3,
                name: "Ana Torres",
                handicap: 5.0,
                ranking: 2,
                avatar: "images/jugador3.jpg"
            },
            {
                id: 4,
                name: "Javier Ruiz",
                handicap: 4.0,
                ranking: 7,
                avatar: "images/jugador4.jpg"
            }
        ]
    };

    // Inicializar selects de jugadores
    function initPlayerSelects() {
        const player1Select = document.getElementById('player1');
        const player2Select = document.getElementById('player2');
        
        // Limpiar opciones existentes
        player1Select.innerHTML = '';
        player2Select.innerHTML = '';
        
        // Agregar opción por defecto
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Selecciona un jugador...';
        defaultOption.selected = true;
        defaultOption.disabled = true;
        
        player1Select.appendChild(defaultOption.cloneNode(true));
        player2Select.appendChild(defaultOption.cloneNode(true));
        
        // Agregar jugadores
        tournamentData.players.forEach(player => {
            const option1 = document.createElement('option');
            option1.value = player.id;
            option1.textContent = `${player.name} (Handicap: ${player.handicap})`;
            option1.dataset.handicap = player.handicap;
            option1.dataset.ranking = player.ranking;
            option1.dataset.avatar = player.avatar;
            
            const option2 = option1.cloneNode(true);
            
            player1Select.appendChild(option1);
            player2Select.appendChild(option2);
        });
    }

    // Actualizar estadísticas del jugador seleccionado
    function updatePlayerStats(selectElement, statsContainer, avatarElement) {
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        
        if (selectedOption.value) {
            statsContainer.innerHTML = `
                <div><i class="fas fa-medal"></i> <span>Handicap: ${selectedOption.dataset.handicap}</span></div>
                <div><i class="fas fa-trophy"></i> <span>Ranking: ${selectedOption.dataset.ranking}</span></div>
            `;
            
            if (avatarElement) {
                avatarElement.src = selectedOption.dataset.avatar || 'images/user-default.jpg';
            }
        } else {
            statsContainer.innerHTML = `
                <div><i class="fas fa-medal"></i> <span>Handicap: -</span></div>
                <div><i class="fas fa-trophy"></i> <span>Ranking: -</span></div>
            `;
            
            if (avatarElement) {
                avatarElement.src = 'images/user-default.jpg';
            }
        }
    }

    // Validar jugadores únicos
    function validateUniquePlayers() {
        const player1 = document.getElementById('player1').value;
        const player2 = document.getElementById('player2').value;
        
        if (player1 && player2 && player1 === player2) {
            playerWarning.style.display = 'block';
            return false;
        } else {
            playerWarning.style.display = 'none';
            return true;
        }
    }

    // Actualizar detalles de confirmación
    function updateConfirmationDetails() {
        const selectedCategory = document.querySelector('input[name="category"]:checked');
        const player1Select = document.getElementById('player1');
        const player2Select = document.getElementById('player2');
        
        if (selectedCategory) {
            const category = tournamentData.categories.find(c => c.id == selectedCategory.value);
            document.getElementById('confirmCategory').textContent = category.name;
            document.getElementById('confirmFee').textContent = `$${category.fee.toLocaleString('es-AR')}`;
        }
        
        if (player1Select.value) {
            const player1 = tournamentData.players.find(p => p.id == player1Select.value);
            document.getElementById('confirmPlayer1Name').textContent = player1.name;
            document.getElementById('confirmPlayer1Handicap').textContent = `Handicap: ${player1.handicap}`;
            document.getElementById('confirmPlayer1Avatar').src = player1.avatar || 'images/user-default.jpg';
        }
        
        if (player2Select.value) {
            const player2 = tournamentData.players.find(p => p.id == player2Select.value);
            document.getElementById('confirmPlayer2Name').textContent = player2.name;
            document.getElementById('confirmPlayer2Handicap').textContent = `Handicap: ${player2.handicap}`;
            document.getElementById('confirmPlayer2Avatar').src = player2.avatar || 'images/user-default.jpg';
        }
    }

    // Navegación entre pasos
    function goToStep(stepNumber) {
        steps.forEach((step, index) => {
            if (index === stepNumber - 1) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Actualizar barra de progreso si la tuvieras
    }

    // Event Listeners
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const currentStepNumber = Array.from(steps).indexOf(currentStep) + 1;
            
            // Validaciones antes de avanzar
            if (currentStepNumber === 1) {
                // No se necesita validación para el paso 1
                goToStep(2);
            } else if (currentStepNumber === 2) {
                if (validateUniquePlayers() && 
                    document.getElementById('player1').value && 
                    document.getElementById('player2').value) {
                    updateConfirmationDetails();
                    goToStep(3);
                } else {
                    alert('Por favor completa la selección de jugadores');
                }
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const currentStepNumber = Array.from(steps).indexOf(currentStep) + 1;
            goToStep(currentStepNumber - 1);
        });
    });

    playerSelects.forEach(select => {
        select.addEventListener('change', function() {
            const playerId = this.id;
            const statsContainer = document.getElementById(`${playerId}Stats`);
            let avatarElement = null;
            
            if (playerId === 'player1') {
                avatarElement = document.getElementById('confirmPlayer1Avatar');
            } else if (playerId === 'player2') {
                avatarElement = document.getElementById('confirmPlayer2Avatar');
            }
            
            updatePlayerStats(this, statsContainer, avatarElement);
            validateUniquePlayers();
        });
    });

    // Envío del formulario
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!document.getElementById('acceptTerms').checked) {
            alert('Debes aceptar los términos y condiciones para continuar');
            return;
        }
        
        // Aquí iría el envío real al servidor
        const formData = {
            categoryId: document.querySelector('input[name="category"]:checked').value,
            player1Id: document.getElementById('player1').value,
            player2Id: document.getElementById('player2').value,
            paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
            acceptTerms: true
        };
        
        console.log('Datos a enviar:', formData);
        
        // Simular éxito después de 1 segundo
        setTimeout(() => {
            successModal.show();
            // Limpiar formulario después de éxito
            registrationForm.reset();
            goToStep(1);
            initPlayerSelects();
        }, 1000);
    });

    // Inicialización
    initPlayerSelects();
    goToStep(1);
});