document.addEventListener('DOMContentLoaded', function() {
    // Mostrar/ocultar contraseña
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    togglePassword.addEventListener('click', function() {
        const icon = this.querySelector('i');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
    
    // Verificar si hay credenciales guardadas
    if (localStorage.getItem('rememberedEmail')) {
        document.getElementById('email').value = localStorage.getItem('rememberedEmail');
        document.getElementById('rememberMe').checked = true;
    }
    
    // Manejar el envío del formulario
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Guardar email si "Recordarme" está marcado
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
        
        // Aquí iría la lógica de autenticación
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Recordar sesión:', rememberMe);
        
        // Simulación de redirección después del login
        alert('Inicio de sesión exitoso (simulación)');
        // window.location.href = 'perfil.html';
    });
});