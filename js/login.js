/***********************************************************
 * Script: Validación de Usuario
 * Autor: Mariana Cortes
 * Fecha: Lunes 08, Julio 2024
 * Descripción: Función para validar el usuario y redirigir a "central.html".
 ***********************************************************/
// Función para validar el usuario
async function validarUsuario() {
    // Obtención de los valores de los campos de entrada
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Cargar los datos de los usuarios desde el archivo JSON
    const response = await fetch('js/usuarios.json');
    const usuarios = await response.json();

    // Validar el usuario
    const usuarioValido = usuarios.find(user => user.username === username && user.password === password);

    if (usuarioValido) {
        alert('Inicio de sesión exitoso!');

        // Verificar el tipo de usuario
        if (usuarioValido.tipo === 'admin') {
            // Redirigir a la página de administración
            window.location.replace("admin.html");
        } else {
            // Redirigir a la página principal
            window.location.replace("principal.html");
        }
    } else {
        alert('Usuario o contraseña incorrectos!');
    }
}
