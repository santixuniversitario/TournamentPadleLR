// Efecto al hacer clic en botones
document.querySelectorAll('.btn-hover').forEach(button => {
    button.addEventListener('mousedown', () => {
        button.style.transform = 'translateY(1px)';
    });
    button.addEventListener('mouseup', () => {
        button.style.transform = 'translateY(-3px)';
    });
});

// Cierra el menú al hacer clic en un enlace (útil en móvil)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            // Cierra el menú hamburguesa
            const toggleBtn = document.querySelector('.navbar-toggler');
            toggleBtn.click(); // Simula un clic en el botón
        }
    });
});