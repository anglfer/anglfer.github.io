/*********************
 * Script: sucursal.js
 * Autor: Maythe Balleza
 * Fecha: Lunes 03, Agosto 2024
 * Descripción: Funciones para la gestión de sucursal
 *********************/
//Definimos un arreglo JSON de sucursales de forma global:
let sucursales = [
    {
        id: 1,
        nombre: "Sucursal .1",
        direccion: "Paseo de Jerez #456",
        GPSlatitud: "41.40338, 2.17403",
        GPSlongitud: "41°24'12.2 N 2°10'26.5",
        url: "",
        horarios: "10:00am - 5:00pm",
        foto: ""
    },
    {
        id: 2,
        nombre: "Sucursal .2",
        direccion: "Paseo de los naranjos #766",
        GPSlatitud: "41.40338, 2.17403",
        GPSlongitud: "41°24'12.2 N 2°10'26.5",
        url: "",
        horarios: "10:00am - 5:00pm",
        foto: ""
    },
    {
        id: 3,
        nombre: "Sucursal .3",
        direccion: "Paseo de las mariposas #676",
        GPSlatitud: "41.40338, 2.17403",
        GPSlongitud: "41°24'12.2 N 2°10'26.5",
        url: "",
        horarios: "10:00am - 5:00pm",
        foto: ""

    }
];


export function inicializarModulo() {
    setDetalleSucursalVisible(false);
    llenarTabla();
}

export function limpiar() {
    document.getElementById("txtId").value = '';
    document.getElementById("txtNombre").value = '';
    document.getElementById("txtDireccion").value = '';
    document.getElementById("txtGpsLatitud").value = '';
    document.getElementById("txtGpsLongitud").value = '';
    document.getElementById("txtUrl").value = '';
    document.getElementById("txtHorarios").value = '';
}

export function buscarSucursal() { //buscador
    let nombre = document.getElementById("txtbuscarSucursal").value.toLowerCase();
    ;
    let encontrado = false;
    let contenido = '';

    for (let i = 0; i < sucursales.length; i++) {
        if (sucursales[i].nombre.toLowerCase().includes(nombre.toLowerCase())) {
            contenido += '<tr>' +
                    '<td>' + sucursales[i].id + '</td>' +
                '<td>' + sucursales[i].nombre + '</td>' +
                '<td>' + sucursales[i].direccion + '</td>' +
                '<td>' + sucursales[i].horarios + '</td>' +
                '<td> </td>' +
                '<td> </td>' +
                '<td><button class="btn btn-warning btn-sm" onclick="cm.mostrarDetalleSucursal(' + sucursales[i].id + ')"><i class="fas fa-edit"></i> Editar</button></td>' +
                '</tr>';
            encontrado = true;
        }
    }

    if (!encontrado) {
        Swal.fire('', 'No se encontraron resultados.', 'warning');
        llenarTabla();
    } else {
        document.getElementById("tbodySucursal").innerHTML = contenido;
    }
}

export function mostrarDetalleSucursal(idSucursal) {
    let sucursal = null;
    let pos = buscarPosicionSucursalPorID(idSucursal);

    if (pos < 0) {
        Swal.fire('', 'Sucursal no encontrada.', 'warning');
        return;
    }

    limpiar();
    sucursal = sucursales[pos];
    document.getElementById("txtId").value = sucursal.id;
    document.getElementById("txtNombre").value = sucursal.nombre;
    document.getElementById("txtDireccion").value = sucursal.direccion;
    document.getElementById("txtGpsLatitud").value = sucursal.GPSlatitud;
    document.getElementById("txtGpsLongitud").value = sucursal.GPSlongitud;
    document.getElementById("txtUrl").value = sucursal.url;
    document.getElementById("txtHorarios").value = sucursal.horarios;

    setDetalleSucursalVisible(true);
}

export function mostrarFormularioNuevo() {
    limpiar();
    setDetalleSucursalVisible(true);
}

/**
 * Llena el cuerpo (tbody) de una tabla HTML
 * utilizando los valores del arreglo JSON
 * de sucursales.
 */
function llenarTabla() {
    let contenido = '';

    for (let i = 0; i < sucursales.length; i++) {
        contenido += '<tr>' +
                '<td>' + sucursales[i].id + '</td>' +
                '<td>' + sucursales[i].nombre + '</td>' +
                '<td>' + sucursales[i].direccion + '</td>' +
                '<td>' + sucursales[i].horarios + '</td>' +
                '<td> </td>' +
                '<td> </td>' +
                '<td><button class="btn btn-warning btn-sm" onclick="cm.mostrarDetalleSucursal(' + sucursales[i].id + ')"><i class="fas fa-edit"></i> Editar</button></td>' +
                '</tr>';
    }

    document.getElementById("tbodySucursal").innerHTML = contenido;
}

/*
 * Busca la posición de una sucursal con base en su ID.
 *
 * Si el ID no se encuentra, la función devuelve -1.
 */
function buscarPosicionSucursalPorID(idSucursal) {
    for (let i = 0; i < sucursales.length; i++) {
        if (sucursales[i].id === idSucursal)
            return i;
    }

    return -1;
}

export function setDetalleSucursalVisible(valor) {
    if (valor) {
        document.getElementById('divCatalogoSucursal').style.display = 'none';
        document.getElementById('divDetalleSucursal').style.display = '';
    } else {
        document.getElementById('divDetalleSucursal').style.display = 'none';
        document.getElementById('divCatalogoSucursal').style.display = '';
    }
}

function generarIDSucursal() {
    let ultimoID = 0;

    if (sucursales.length > 0) {
        ultimoID = sucursales[0].id;
        for (let i = 0; i < sucursales.length; i++) {
            if (sucursales[i].id > ultimoID)
                ultimoID = sucursales[i].id;
        }
    }
    ultimoID++;
    return ultimoID;
}

export function guardar() {
    ocultarMensaje();

    let nombre = document.getElementById("txtNombre").value.trim();
    let direccion = document.getElementById("txtDireccion").value.trim();
    let GPSlatitud = document.getElementById("txtGpsLatitud").value.trim();
    let GPSlongitud = document.getElementById("txtGpsLongitud").value.trim();
    let url = document.getElementById("txtUrl").value.trim();
    let horarios = document.getElementById("txtHorarios").value.trim();


    if (nombre === '') {
        mostrarMensaje('El nombre de la sucursal no puede estar vacío.', 'error');
        return;
    }

    if (direccion === '') {
        mostrarMensaje('La dirección no puede estar vacía.', 'error');
        return;
    }

    if (GPSlatitud === '') {
        mostrarMensaje('La latitud GPS no puede estar vacía.', 'error');
        return;
    }

    if (GPSlongitud === '') {
        mostrarMensaje('La longitud GPS no puede estar vacía.', 'error');
        return;
    }

    if (url === '') {
        mostrarMensaje('La URL no puede estar vacía.', 'error');
        return;
    }

    if (horarios === '') {
        mostrarMensaje('Los horarios no pueden estar vacíos.', 'error');
        return;
    }


    let sucursal = {
        id: parseInt(document.getElementById("txtId").value) || generarIDSucursal(),
        nombre: nombre,
        direccion: direccion,
        GPSlatitud: GPSlatitud,
        GPSlongitud: GPSlongitud,
        url: url,
        horarios: horarios,

    };

    let posTemp = buscarPosicionSucursalPorID(sucursal.id);
    if (posTemp >= 0) {
        sucursales[posTemp] = sucursal;
    } else {
        sucursales.push(sucursal);
    }

    llenarTabla();
    limpiar();
    mostrarMensaje('Datos de la sucursal guardados con éxito.', 'success');
}

export function eliminar() {
    ocultarMensaje();

    let idSucursal = parseInt(document.getElementById("txtId").value);

    if (isNaN(idSucursal) || idSucursal <= 0) {
        mostrarMensaje('ID de sucursal no válido.', 'error');
        return;
    }

    let pos = buscarPosicionSucursalPorID(idSucursal);

    if (pos < 0) {
        mostrarMensaje('La sucursal que intenta eliminar no existe.', 'error');
        return;
    }

    if (confirm('¿Está seguro de que desea eliminar esta sucursal? Esta acción no se puede deshacer.')) {
        sucursales.splice(pos, 1);
        llenarTabla();
        limpiar();
        mostrarMensaje('La sucursal ha sido eliminada con éxito.', 'success');
    }
}

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

function ocultarMensaje() {
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.innerHTML = '';
}
