/***********************************************************
 * Script: Modulo de combos
 * Autor: Fernando Oñate
 * Fecha: Lunes 08, Julio 2024
 * Descripción: funcion para el modulo de combos de la aplicacion
 ***********************************************************/
let combos = [
    {
        "id": 1,
        "nombre": "Tacos y Nachos",
        "descripcion": "Muy ricos",
        "foto": "",
        "precio": 150.00,
        "bebida": {
            "id": 1,
            "nombre": "Coca-Cola"
        },
        "alimentos": {
            "id": 1,
            "nombre": "Tacos"
        }
    },
    {
        "id": 2,
        "nombre": "Burritos",
        "descripcion": "Deliciosos",
        "foto": "",
        "precio": 180.00,
        "bebida": {
            "id": 1,
            "nombre": "Coca-Cola"
        },
        "alimentos": {
            "id": 1,
            "nombre": "Tacos"
        }
    },
    {
        "id": 3,
        "nombre": "Enchiladas",
        "descripcion": "Tradicionales",
        "foto": "",
        "precio": 120.00,
        "bebida": {
            "id": 2,
            "nombre": "Fanta"
        },
        "alimentos": {
            "id": 2,
            "nombre": "Nachos"
        }
    },
    {
        "id": 4,
        "nombre": "Hamburguesa y Papas",
        "descripcion": "Para los amantes de la comida rápida",
        "foto": "",
        "precio": 200.00,
        "bebida": {
            "id": 3,
            "nombre": "Sprite"
        },
        "alimentos": {
            "id": 3,
            "nombre": "Hamburguesas"
        }
    },
    {
        "id": 5,
        "nombre": "Pizza y Refresco",
        "descripcion": "La combinación perfecta",
        "foto": "",
        "precio": 250.00,
        "bebida": {
            "id": 4,
            "nombre": "Pepsi"
        },
        "alimentos": {
            "id": 4,
            "nombre": "Pizza"
        }
    },
    {
        "id": 6,
        "nombre": "Ensalada y Agua",
        "descripcion": "Opción saludable",
        "foto": "",
        "precio": 100.00,
        "bebida": {
            "id": 5,
            "nombre": "Mountain Dew"
        },
        "alimentos": {
            "id": 5,
            "nombre": "Ensalada"
        }
    }
];

let bebidas = [
    {
        "id": 1,
        "nombre": "Coca-Cola"
    },
    {
        "id": 2,
        "nombre": "Fanta"
    },
    {
        "id": 3,
        "nombre": "Sprite"
    },
    {
        "id": 4,
        "nombre": "Pepsi"
    },
    {
        "id": 5,
        "nombre": "Mountain Dew"
    }
];

let alimentos = [
    {
        "id": 1,
        "nombre": "Tacos"
    },
    {
        "id": 2,
        "nombre": "Nachos"
    },
    {
        "id": 3,
        "nombre": "Hamburguesas"
    },
    {
        "id": 4,
        "nombre": "Pizza"
    },
    {
        "id": 5,
        "nombre": "Ensalada"
    },
    {
        "id": 6,
        "nombre": "Sushi"
    }
];

export function inicializarModulo() {
    setDetalleComboVisible(false);
    llenarComboBoxCategoriasB();
    llenarComboBoxCategoriasA();
    llenarTabla();
}



export function limpiar() {
    document.getElementById("txtIdCombo").value = '';
    document.getElementById("txtCombo").value = '';
    document.getElementById("txtDescripcionCombo").value = '';
    document.getElementById("txtPrecioCombo").value = '';
    document.getElementById("cmbCategoriaB").value = 1;
    document.getElementById("cmbCategoriaA").value = 1;
}

export function consultar() {
    let nombre = document.getElementById("txtBuscar").value;
    let encontrado = false;
    let contenido = '';

    for (let i = 0; i < combos.length; i++) {
        if (combos[i].nombre.toLowerCase().includes(nombre.toLowerCase())) {
            contenido += '<tr>' +
                '<td>' + combos[i].nombre + '</td>' +
                '<td>' + combos[i].descripcion + '</td>' +
                '<td class="">' + combos[i].precio + '</td>' +
                '<td><button class="btn btn-warning btn-sm" onclick="cm.mostrarDetalleCombo(' + combos[i].id + ')"><i class="fas fa-edit"></i> Editar</button></td>' +
                '</tr>';
            encontrado = true;
        }
    }

    if (!encontrado) {
        Swal.fire('', 'No se encontraron resultados.', 'warning');
        llenarTabla();
    }
    else {
        document.getElementById("tbodyCombo").innerHTML = contenido;
    }
}

export function mostrarDetalleCombo(idCombo) {
    let pos = buscarPosicionComboPorID(idCombo);

    if (pos < 0) {
        Swal.fire('', 'Combo no encontrado.', 'warning');
        return;
    }

    limpiar();
    let combo = combos[pos];
    document.getElementById("txtIdCombo").value = combo.id;
    document.getElementById("txtCombo").value = combo.nombre;
    document.getElementById("txtDescripcionCombo").value = combo.descripcion;
    document.getElementById("txtPrecioCombo").value = combo.precio;
    document.getElementById("cmbCategoriaB").value = combo.bebida.id;
    document.getElementById("cmbCategoriaA").value = combo.alimentos.id;
    setDetalleComboVisible(true);
}

export function mostrarFormularioNuevoCombo() {
    limpiar();
    setDetalleComboVisible(true);
}


function llenarTabla() {
    let contenido = '';

    for (let i = 0; i < combos.length; i++) {
        contenido += '<tr>' +
            '<td>' + combos[i].nombre + '</td>' +
            '<td>' + combos[i].descripcion + '</td>' +
            '<td class="">' + combos[i].precio + '</td>' +
            '<td><button class="btn btn-warning btn-sm" onclick="cm.mostrarDetalleCombo(' + combos[i].id + ')"><i class="fas fa-edit"></i> Editar</button></td>' +
            '</tr>';
    }
    document.getElementById("tbodyCombo").innerHTML = contenido;
}

function llenarComboBoxCategoriasB() {
    let contenido = '';

    for (let i = 0; i < bebidas.length; i++) {
        contenido += '<option value="' + bebidas[i].id + '">' +
            bebidas[i].nombre +
            '</option>';
    }

    document.getElementById('cmbCategoriaB').innerHTML = contenido;
}

function llenarComboBoxCategoriasA() {
    let contenido = '';

    for (let i = 0; i < alimentos.length; i++) {
        contenido += '<option value="' + alimentos[i].id + '">' +
            alimentos[i].nombre +
            '</option>';
    }

    document.getElementById('cmbCategoriaA').innerHTML = contenido;
}



function buscarPosicionComboPorID(idCombo) {
    // Recorremos el arreglo de combos:
    for (let i = 0; i < combos.length; i++) {
        if (combos[i].id === idCombo)
            return i;
    }

    return -1;
}


export function setDetalleComboVisible(valor) {
    if (valor) {
        document.getElementById('divCatalogoCombo').style.display = 'none';

        document.getElementById('divDetalleCombo').style.display = '';
    } else {
        document.getElementById('divDetalleCombo').style.display = 'none';

        document.getElementById('divCatalogoCombo').style.display = '';
    }
}

function generarIDCombo() {
    let ultimoID = 0;

    if (combos.length > 0) {
        ultimoID = combos[0].id;
        for (let i = 0; i < combos.length; i++) {
            if (combos[i].id > ultimoID)
                ultimoID = combos[i].id;
        }
    }
    ultimoID++;
    return ultimoID;
}

export function guardarCombo() {
    // Ocultar mensajes anteriores
    ocultarMensaje();

    // Obtener valores del formulario
    let nombre = document.getElementById("txtCombo").value.trim();
    let descripcion = document.getElementById("txtDescripcionCombo").value.trim();
    let precio = parseFloat(document.getElementById("txtPrecioCombo").value);

    // Validaciones:
    if (nombre === '') {
        mostrarMensaje('El nombre del combo no puede estar vacío.', 'error');
        return;
    }

    if (descripcion.length < 10) {
        mostrarMensaje('La descripción del combo debe tener al menos 10 caracteres.', 'error');
        return;
    }

    if (isNaN(precio) || precio <= 0) {
        mostrarMensaje('El precio del combo debe ser un número positivo.', 'error');
        return;
    }

    // Crear un nuevo objeto de combo:
    let c = {
        id: parseInt(document.getElementById("txtIdCombo").value) || generarIDCombo(),
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        bebida: {
            id: parseInt(document.getElementById("cmbCategoriaB").value),
            nombre: bebidas.find(b => b.id === parseInt(document.getElementById("cmbCategoriaB").value)).nombre
        },
        alimentos: {
            id: parseInt(document.getElementById("cmbCategoriaA").value),
            nombre: alimentos.find(a => a.id === parseInt(document.getElementById("cmbCategoriaA").value)).nombre
        }
    };

    // Verificar si se va a insertar o actualizar:
    let posTemp = buscarPosicionComboPorID(c.id);
    if (posTemp >= 0) {
        combos[posTemp] = c; // Actualizar
    } else {
        combos.push(c); // Insertar nuevo
        document.getElementById("txtIdCombo").value = c.id;
    }

    llenarTabla();
    limpiar();
    mostrarMensaje('Datos del combo guardados con éxito.', 'success');
}

export function eliminarCombo() {
    ocultarMensaje();

    let idCombo = parseInt(document.getElementById("txtIdCombo").value);

    if (isNaN(idCombo) || idCombo <= 0) {
        mostrarMensaje('ID de combo no válido.', 'error');
        return;
    }

    let pos = buscarPosicionComboPorID(idCombo);

    if (pos < 0) {
        mostrarMensaje('El combo que intenta eliminar no existe.', 'error');
        return;
    }

    if (confirm('¿Está seguro de que desea eliminar este combo? Esta acción no se puede deshacer.')) {
        combos.splice(pos, 1);
        llenarTabla();
        limpiar();
        mostrarMensaje('El combo ha sido eliminado con éxito.', 'success');
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