/***********************************************************
 * Script: usuarios.js.
 * Autor: Mariana Cortes
 * Fecha: Lunes 08, Julio 2024
 * Descripción: Script para el funcionamiento de "usuarios.html"
 ***********************************************************/
let empleados = [
    {
        id: 1,
        idSucursal: 1,
        usuario: {
            id: 1,
            username: "Maya_Valle",
            password: "MhGOTbdJoPgR"
        },
        persona: {
            id: 1,
            nombre: "Maya",
            apellidoPaterno: "Valle",
            apellidoMaterno: "Vega",
            telefono: 4774287364,
            calle: "Villa Moscú",
            noCalle: 105,
            colonia: "Villa Pelota"
        }
    },
    {
        id: 2,
        idSucursal: 2,
        usuario: {
            id: 2,
            username: "Carlos_Mendez",
            password: "PnErYsJkWlBd"
        },
        persona: {
            id: 2,
            nombre: "Carlos",
            apellidoPaterno: "Méndez",
            apellidoMaterno: "López",
            telefono: 4771234567,
            calle: "Calle Jardín",
            noCalle: 202,
            colonia: "Las Rosas"
        }
    },
    {
        id: 3,
        idSucursal: 3,
        usuario: {
            id: 3,
            username: "Ana_Ruiz",
            password: "XcFmQzVrTpNk"
        },
        persona: {
            id: 3,
            nombre: "Ana",
            apellidoPaterno: "Ruiz",
            apellidoMaterno: "Martínez",
            telefono: 4777890123,
            calle: "Avenida Central",
            noCalle: 350,
            colonia: "Los Olivos"
        }
    },
    {
        id: 4,
        idSucursal: 2,
        usuario: {
            id: 4,
            username: "Lucia_Ramos",
            password: "HrLmDsQpVzXw"
        },
        persona: {
            id: 4,
            nombre: "Lucía",
            apellidoPaterno: "Ramos",
            apellidoMaterno: "Hernández",
            telefono: 4773456789,
            calle: "Boulevard Norte",
            noCalle: 450,
            colonia: "San Ángel"
        }
    },
    {
        id: 5,
        idSucursal: 3,
        usuario: {
            id: 5,
            username: "Pedro_Garcia",
            password: "VkRpJyFsLaNd"
        },
        persona: {
            id: 5,
            nombre: "Pedro",
            apellidoPaterno: "García",
            apellidoMaterno: "Pérez",
            telefono: 4775678901,
            calle: "Calle Independencia",
            noCalle: 310,
            colonia: "El Centro"
        }
    }
];

let sucursales = [
    {
        id: 1,
        nombre: "Sucursal 1"
    },
    {
        id: 2,
        nombre: "Sucursal 2"
    },
    {
        id: 3,
        nombre: "Sucursal 3"
    }
];

// Inicializar el módulo
export function inicializarModulo() {
    setDetalleEmpleadoVisible(false);
    llenarComboBoxSucursales();
    llenarTabla();
}

// Limpiar formulario
export function limpiar() {
    document.getElementById("txtId").value = '';
    document.getElementById("txtUsername").value = '';
    document.getElementById("txtNombre").value = '';
    document.getElementById("txtApellidoPaterno").value = '';
    document.getElementById("txtApellidoMaterno").value = '';
    document.getElementById("txtTelefono").value = '';
    document.getElementById("txtCalle").value = '';
    document.getElementById("txtNoCalle").value = '';
    document.getElementById("txtColonia").value = '';
    document.getElementById("cmbSucursal").value = 1;
}

// Consultar empleados basados en búsqueda
export function consultar() {
    let nombre = document.getElementById("txtBuscar").value.toLowerCase();
    let encontrado = false;
    let contenido = '';

    for (let i = 0; i < empleados.length; i++) {
        if (empleados[i].usuario.username.toLowerCase().includes(nombre)) {
            contenido += '<tr>' +
                    '<td>' + empleados[i].id + '</td>' +
                    '<td>' + empleados[i].usuario.username + '</td>' +
                    '<td>' + empleados[i].usuario.password + '</td>' +
                    '<td><button class="btn btn-warning btn-sm" onclick="cm.mostrarDetalleEmpleado(' + empleados[i].id + ')"><i class="fas fa-edit"></i> Editar</button></td>' +
                    '</tr>';
            encontrado = true;
        }
    }

    if (!encontrado) {
        Swal.fire('', 'No se encontraron resultados.', 'warning');
        llenarTabla();
    } else {
        document.getElementById("tbodyEmpleados").innerHTML = contenido;
    }
}

// Mostrar detalles del empleado
export function mostrarDetalleEmpleado(id) {
    let empleado = null;
    let pos = buscarPosicionEmpleadoPorID(id);

    if (pos < 0) {
        Swal.fire('', 'Empleado no encontrado.', 'warning');
        return;
    }

    limpiar();
    empleado = empleados[pos];
    document.getElementById("txtId").value = empleado.id;
    document.getElementById("txtUsername").value = empleado.usuario.username;
    document.getElementById("txtNombre").value = empleado.persona.nombre;
    document.getElementById("txtApellidoPaterno").value = empleado.persona.apellidoPaterno;
    document.getElementById("txtApellidoMaterno").value = empleado.persona.apellidoMaterno;
    document.getElementById("txtTelefono").value = empleado.persona.telefono;
    document.getElementById("txtCalle").value = empleado.persona.calle;
    document.getElementById("txtNoCalle").value = empleado.persona.noCalle;
    document.getElementById("txtColonia").value = empleado.persona.colonia;
    document.getElementById("cmbSucursal").value = empleado.idSucursal;
    setDetalleEmpleadoVisible(true);
}

// Mostrar formulario de nuevo empleado
export function mostrarFormularioNuevo() {
    limpiar();
    setDetalleEmpleadoVisible(true);
}

// Llenar tabla con datos de empleados
function llenarTabla() {
    let contenido = '';
    for (let i = 0; i < empleados.length; i++) {
        contenido += '<tr>' +
                '<td>' + empleados[i].id + '</td>' +
                '<td>' + empleados[i].usuario.username + '</td>' +
                '<td>' + empleados[i].usuario.password + '</td>' +
                '<td><button class="btn btn-warning btn-sm" onclick="cm.mostrarDetalleEmpleado(' + empleados[i].id + ')"><i class="fas fa-edit"></i> Editar</button></td>' +
                '</tr>';
    }
    document.getElementById("tbodyEmpleados").innerHTML = contenido;
}

// Llenar combo box de sucursales
function llenarComboBoxSucursales() {
    let contenido = '';
    for (let i = 0; i < sucursales.length; i++) {
        contenido += '<option value="' + sucursales[i].id + '">' +
                sucursales[i].nombre +
                '</option>';
    }
    document.getElementById('cmbSucursal').innerHTML = contenido;
}

// Buscar la posocion de un alimento por ID
function buscarPosicionEmpleadoPorID(id) {
    for (let i = 0; i < empleados.length; i++) {
        if (empleados[i].id === id)
            return i;
    }

    return -1;
}

// Mostrar u ocultar detalle del empleado
export function setDetalleEmpleadoVisible(valor) {
    if (valor) {
        document.getElementById('divCatalogoEmpleados').style.display = 'none';
        document.getElementById('divDetalleEmpleado').style.display = '';
    } else {
        document.getElementById('divDetalleEmpleado').style.display = 'none';
        document.getElementById('divCatalogoEmpleados').style.display = '';
    }
}

// Generar ID de empleado
function generarIDEmpleado() {
    let ultimoID = 0;

    if (empleados.length > 0) {
        ultimoID = empleados[0].id;
        for (let i = 0; i < empleados.length; i++) {
            if (empleados[i].id > ultimoID)
                ultimoID = empleados[i].id;
        }
    }
    ultimoID++;
    return ultimoID;
}

// Generar ID de usuario
function generarIDUsuario() {
    let ultimoID = 0;

    if (empleados.length > 0) {
        for (let i = 0; i < empleados.length; i++) {
            if (empleados[i].usuario.id > ultimoID) {
                ultimoID = empleados[i].usuario.id;
            }
        }
    }
    ultimoID++;
    return ultimoID;
}

// Generar ID de persona
function generarIDPersona() {
    let ultimoID = 0;

    if (empleados.length > 0) {
        for (let i = 0; i < empleados.length; i++) {
            if (empleados[i].persona.id > ultimoID) {
                ultimoID = empleados[i].persona.id;
            }
        }
    }
    ultimoID++;
    return ultimoID;
}

// Buscar sucursal por ID
function buscarSucursalPorID(id) {
    for (let i = 0; i < sucursales.length; i++) {
        if (sucursales[i].id === id) {
            return true;
        }
    }
    return false;
}

// Guardar datos de un empleado
export function guardar() {
    ocultarMensaje();
    let nombre = document.getElementById("txtNombre").value.trim();
    let username = document.getElementById("txtUsername").value.trim();
    let apellidoPaterno = document.getElementById("txtApellidoPaterno").value.trim();
    let apellidoMaterno = document.getElementById("txtApellidoMaterno").value.trim();
    let telefono = parseInt(document.getElementById("txtTelefono").value);
    let calle = document.getElementById("txtCalle").value.trim();
    let noCalle = document.getElementById("txtNoCalle").value.trim();
    let colonia = document.getElementById("txtColonia").value.trim();
    let sucursalID = parseInt(document.getElementById("cmbSucursal").value);

    if (username === '') {
        mostrarMensaje('El nombre de usuario no puede estar vacío.', 'warning');
        return;
    }
    if (nombre === '') {
        mostrarMensaje('El nombre no puede estar vacío.', 'warning');
        return;
    }
    if (apellidoPaterno === '') {
        mostrarMensaje('El apellido paterno no puede estar vacío.', 'warning');
        return;
    }
    if (apellidoMaterno === '') {
        mostrarMensaje('El apellido materno no puede estar vacío.', 'warning');
        return;
    }
    if (telefono === '' || isNaN(telefono)) {
        mostrarMensaje('El teléfono debe ser un número válido.', 'warning');
        return;
    }
    if (calle === '') {
        mostrarMensaje('La calle no puede estar vacía.', 'warning');
        return;
    }
    if (noCalle === '') {
        mostrarMensaje('El número de calle no puede estar vacío.', 'warning');
        return;
    }
    if (colonia === '') {
        mostrarMensaje('La colonia no puede estar vacía.', 'warning');
        return;
    }
    if (!buscarSucursalPorID(sucursalID)) {
        mostrarMensaje('Debe seleccionar una sucursal válida.', 'warning');
        return;
    }

    let empleado = {
        id: parseInt(document.getElementById("txtId").value) || generarIDEmpleado(),
        idSucursal:buscarSucursalPorID(sucursalID),
        usuario: {
            id: parseInt(document.getElementById("txtId").value) || generarIDUsuario(),
            username: username,
            password: generarPassword()
        },
        persona: {
            id: parseInt(document.getElementById("txtId").value) || generarIDPersona(),
            nombre: nombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            telefono: telefono,
            calle: calle,
            noCalle: noCalle,
            colonia: colonia
        }
    };

    let posTemp = buscarPosicionEmpleadoPorID(empleado.id);
    if (posTemp >= 0) {
        empleados[posTemp] = empleado;
    } else {
        empleados.push(empleado);
    }

    llenarTabla();
    limpiar();
    mostrarMensaje('Datos de empleado guardados con éxito.', 'success');
}

// Eliminar empleado
export function eliminar() {
    ocultarMensaje();
    let id = parseInt(document.getElementById("txtId").value);
    if (isNaN(id) || id <= 0) {
        mostrarMensaje('ID de empleado no válido.', 'error');
        return;
    }

    let pos = buscarPosicionEmpleadoPorID(id);
    if (pos < 0) {
        mostrarMensaje('El empleado que intenta eliminar no existe.', 'error');
        return;
    }

    if (confirm('¿Está seguro de que desea eliminar este empleado? Esta acción no se puede deshacer.')) {
        empleados.splice(pos, 1);
        llenarTabla();
        limpiar();
        mostrarMensaje('El empleado ha sido eliminado con éxito.', 'success');
    }
}

// Mostrar mensaje con SweetAlert2
function mostrarMensaje(mensaje, tipo = 'error') {
    const alertContainer = document.getElementById('alertContainer');
    const alert = document.createElement('div');
    alert.textContent = mensaje;
    alert.style.padding = '10px 20px';
    alert.style.marginBottom = '10px';
    alert.style.borderRadius = '5px';
    alert.style.color = 'white';
    alert.style.backgroundColor = tipo === 'success' ? '#28a745' : '#dc3545';
    alert.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    alert.style.transition = 'opacity 0.3s ease';
    
    alertContainer.appendChild(alert);

    setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// Ocultar mensaje
function ocultarMensaje() {
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.innerHTML = '';
}

// Generar una contraseña aleatoria
function generarPassword() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    return password;
}