// Variables globales simulando una base de datos
let empleados = [];
let empleadoSeleccionado = null;

// Función para generar contraseña aleatoria de longitud específica
function generarContraseña(longitud) {
    const caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let contraseña = "";
    for (let i = 0; i < longitud; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        contraseña += caracteres[indiceAleatorio];
    }
    return contraseña;
}

// Función para mostrar el formulario de detalles del empleado
function showEmployeeDetails() {
    document.getElementById('employeeDetails').style.display = 'block';
    document.getElementById('employeeList').style.display = 'none';
}

// Función para mostrar el formulario para agregar un empleado
function showEmployeeDetailsForAdding() {
    document.getElementById('employeeId').value = ''; // Limpiar ID para nuevo empleado
    document.getElementById('employeeUsername').value = '';
    document.getElementById('employeePassword').value = ''; // No se edita
    showEmployeeDetails();
}

// Función para ocultar el formulario de detalles del empleado y mostrar la lista de empleados
function hideEmployeeDetails() {
    document.getElementById('employeeDetails').style.display = 'none';
    document.getElementById('employeeList').style.display = 'block';
}

// Función para guardar un empleado
function saveEmployee() {
    const id = document.getElementById('employeeId').value;
    const nombreUsuario = document.getElementById('employeeUsername').value.trim();
    const contraseña = document.getElementById('employeePassword').value || generarContraseña(12);

    if (id) {
        // Editar empleado existente
        const empleado = empleados.find(e => e.id === parseInt(id, 10));
        if (empleado) {
            empleado.nombreUsuario = nombreUsuario;
            empleado.contraseña = contraseña; // Si deseas cambiar la contraseña también
            renderizarEmpleados();
            hideEmployeeDetails();
        }
    } else {
        // Agregar nuevo empleado
        const nuevoId = empleados.length ? empleados[empleados.length - 1].id + 1 : 1;
        empleados.push({ id: nuevoId, nombreUsuario, contraseña });
        renderizarEmpleados();
        hideEmployeeDetails();
    }
}

// Función para eliminar un empleado
function deleteEmployee() {
    if (empleadoSeleccionado) {
        empleados = empleados.filter(e => e.id !== empleadoSeleccionado.id);
        renderizarEmpleados();
        hideEmployeeDetails();
    }
}

// Función para limpiar los detalles del empleado
function clearEmployeeDetails() {
    document.getElementById('employeeId').value = '';
    document.getElementById('employeeUsername').value = '';
    document.getElementById('employeePassword').value = '';
}

// Función para renderizar la lista de empleados
function renderizarEmpleados() {
    const tablaEmpleadoBody = document.getElementById('employeeTableBody');
    tablaEmpleadoBody.innerHTML = '';
    empleados.forEach(empleado => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${empleado.id}</td>
            <td>${empleado.nombreUsuario}</td>
            <td>${empleado.contraseña}</td>
            <td>
                <button class="btn btn-info btn-sm" onclick="editEmployee(${empleado.id})">Editar</button>
            </td>
        `;
        tablaEmpleadoBody.appendChild(row);
    });
}

// Función para editar un empleado
function editEmployee(id) {
    empleadoSeleccionado = empleados.find(e => e.id === id);
    if (empleadoSeleccionado) {
        document.getElementById('employeeId').value = empleadoSeleccionado.id;
        document.getElementById('employeeUsername').value = empleadoSeleccionado.nombreUsuario;
        document.getElementById('employeePassword').value = empleadoSeleccionado.contraseña;
        showEmployeeDetails();
    }
}

// Función para buscar empleado por ID o nombre de usuario
function buscarEmpleado() {
    const valor = document.getElementById('searchInput').value.trim();
    if (valor === '') {
        alert('Por favor ingrese un ID o nombre de usuario.');
        return;
    }

    const empleadoEncontrado = empleados.find(empleado => {
        return empleado.id === parseInt(valor, 10) || empleado.nombreUsuario.toLowerCase() === valor.toLowerCase();
    });

    if (empleadoEncontrado) {
        editEmployee(empleadoEncontrado.id);
    } else {
        alert('Empleado no encontrado.');
    }
}

// Event listener para el botón de búsqueda
document.getElementById('searchButton').addEventListener('click', buscarEmpleado);

// Event listener para el formulario de empleado
document.getElementById('employeeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    saveEmployee();
});

// Renderizar lista de empleados al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    renderizarEmpleados();
});
