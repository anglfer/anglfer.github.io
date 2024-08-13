/***********************************************************
 * Script: Validación de Usuario
 * Autor: Mariana Cortes
 * Fecha: Lunes 08, Julio 2024
 * Descripción: Función para validar el usuario y redirigir a "central.html".
 ***********************************************************/

// Función para validar el usuario
function validarUsuario() {
    // Obtención de los valores de los campos de entrada
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Validación simple (esto puede ser reemplazado con una llamada al servidor o API)
    if (username === 'admin' && password === '1234') {
        alert('Inicio de sesión exitoso!');
        // Redirigir a la página principal o realizar alguna acción
        window.location.replace("principal.html"); // Redirecciona al usuario a la página central
    } else {
        alert('Nombre de usuario o contraseña incorrectos.');
    }
}