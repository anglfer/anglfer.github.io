
//Definimos un arreglo JSON de Categorias:
let categorias = [
    {
        id: 1,
        nombre: "Refresco"
    },
    {
        id: 2,
        nombre: "Agua de sabor"
    },
    {
        id: 3,
        nombre: "Agua"
    },
    {
        id: 4,
        nombre: "Café"
    },
    {
        id: 5,
        nombre: "Jugo"
    }
];

//Definimos un arreglo JSON de bebidas de forma global:
let bebidas = [
    {
        id: 1,
        producto: {
            id: 1,
            nombre: "Coca Cola",
            descripcion: "Muy rica.",
            foto: "",
            precio: 14.99,
            categoria: {
                id: 1,
                nombre: "Refresco"
            }
        }
    },
    {
        id: 2,
        producto: {
            id: 2,
            nombre: "Agua de Horchata",
            descripcion: "Muy refrescante.",
            foto: "",
            precio: 15.00,
            categoria: {
                id: 2,
                nombre: "Agua de sabor"
            }
        }
    },
    {
        id: 3,
        producto: {
            id: 3,
            nombre: "Agua Pura",
            descripcion: "Refrescante.",
            foto: "",
            precio: 10.00,
            categoria: {
                id: 3,
                nombre: "Agua"
            }
        }
    },
    {
        id: 4,
        producto: {
            id: 4,
            nombre: "Café Americano",
            descripcion: "Bebida caliente.",
            foto: "",
            precio: 40.00,
            categoria: {
                id: 4,
                nombre: "Café"
            }
        }
    },
    {
        id: 5,
        producto: {
            id: 5,
            nombre: "Jugo de Naranja",
            descripcion: "Refrescante.",
            foto: "",
            precio: 17.00,
            categoria: {
                id: 5,
                nombre: "Jugo"
            }
        }
    }
];

export function inicializarModulo() {
    setDetalleBebidaVisible(false);
    llenarComboBoxCategorias();
    llenarTabla();
}

export function guardar() {
    // Obtener valores del formulario
    let nombre = document.getElementById("txtBebida").value.trim();
    let descripcion = document.getElementById("txtDescripcionBebida").value.trim();
    let precio = parseFloat(document.getElementById("txtPrecioBebida").value);
    let categoriaID = parseInt(document.getElementById("cmbCategoria").value);

    // Validaciones:
    if (nombre === '') {
        mostrarMensaje('El nombre de la bebida no puede estar vacío.', 'error');
        return;
    }

    if (descripcion.length < 10) {
        mostrarMensaje('La descripción debe tener al menos 10 caracteres.', 'error');
        return;
    }

    if (isNaN(precio) || precio <= 0) {
        mostrarMensaje('El precio de la bebida debe ser un número positivo.', 'error');
        return;
    }

    if (!buscarCategoriaPorID(categoriaID)) {
        mostrarMensaje('La categoría seleccionada no es válida.', 'error');
        return;
    }

    let bebida = {
        id: parseInt(document.getElementById("txtId").value) || generarIDBebida(),
        producto: {
            id: parseInt(document.getElementById("txtId").value) || generarIDProducto(),
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            categoria: buscarCategoriaPorID(categoriaID)
        }
    };

    let posTemp = buscarPosicionBebidaPorID(bebida.id);
    if (posTemp >= 0) {
        bebidas[posTemp] = bebida; // Actualizar
    } else {
        bebidas.push(bebida); // Insertar nuevo
    }

    llenarTabla();
    limpiar();
    mostrarMensaje('Datos de bebida guardados con éxito.', 'success');

}

export function limpiar() {
    document.getElementById("txtId").value = '';
    document.getElementById("txtBebida").value = '';
    document.getElementById("txtDescripcionBebida").value = '';
    document.getElementById("txtPrecioBebida").value = '';
    document.getElementById("cmbCategoria").value = 1;
}

export function consultar() {
    let nombre = document.getElementById("txtBuscar").value;
    let encontrado = false;
    let contenido = '';

    for (let i = 0; i < bebidas.length; i++) {
        if (bebidas[i].producto.nombre.toLowerCase().includes(nombre.toLowerCase())) {
            contenido += '<tr>' +
                '<td>' + bebidas[i].id + '</td>' +
                '<td>' + bebidas[i].producto.nombre + '</td>' +
                '<td>' + bebidas[i].producto.descripcion + '</td>' +
                '<td>' + bebidas[i].producto.precio + '</td>' +
                '<td><button class="btn btn-warning btn-sm" onclick="cm.mostrarDetalleBebida(' + bebidas[i].id + ');"><i class="fas fa-edit"></i>Editar</button></td>' +
                '</tr>';
            encontrado = true;
        }
    }

    if (!encontrado) {
        Swal.fire('', 'No se encontraron resultados.', 'warning');
        llenarTabla();
    }
    else {
        document.getElementById("tbodyBebidas").innerHTML = contenido;
    }
}

export function mostrarDetalleBebida(idBebida) {
    let bebida = null;
    let pos = buscarPosicionBebidaPorID(idBebida);

    if (pos < 0) {
        Swal.fire('', 'Bebida no encontrada.', 'warning');
        return;
    }

    limpiar();
    bebida = bebidas[pos];
    document.getElementById("txtId").value = bebida.id;
    document.getElementById("txtBebida").value = bebida.producto.nombre;
    document.getElementById("txtDescripcionBebida").value = bebida.producto.descripcion;
    document.getElementById("txtPrecioBebida").value = bebida.producto.precio;
    document.getElementById("cmbCategoria").value = bebida.producto.categoria.id;
    setDetalleBebidaVisible(true);
}

export function mostrarFormularioNuevo() {
    limpiar();
    setDetalleBebidaVisible(true);
}

function llenarTabla() {
    let contenido = '';

    for (let i = 0; i < bebidas.length; i++) {
        contenido += '<tr>' +
            '<td>' + bebidas[i].id + '</td>' +
            '<td>' + bebidas[i].producto.nombre + '</td>' +
            '<td>' + bebidas[i].producto.categoria.nombre + '</td>' +
            '<td>' + bebidas[i].producto.descripcion + '</td>' +
            '<td>' + bebidas[i].producto.precio + '</td>' +
            '<td> <button class="btn btn-warning btn-sm" onclick="cm.mostrarDetalleBebida(' + bebidas[i].id + ');"><i class="fas fa-edit"></i>Editar</button></a></td>' +
            '</tr>';
    }

    document.getElementById("tbodyBebidas").innerHTML = contenido;
}

function llenarComboBoxCategorias() {
    let contenido = '';

    for (let i = 0; i < categorias.length; i++) {
        contenido += '<option value="' + categorias[i].id + '">' +
            categorias[i].nombre +
            '</option>';
    }

    document.getElementById('cmbCategoria').innerHTML = contenido;
}

function buscarPosicionBebidaPorID(idBebida) {
    for (let i = 0; i < bebidas.length; i++) {
        if (bebidas[i].id === idBebida)
            return i;
    }

    return -1;
}

export function setDetalleBebidaVisible(valor) {
    if (valor) {
        document.getElementById('divCatalogoBebidas').style.display = 'none';
        document.getElementById('divDetalleBebida').style.display = '';
    } else {
        document.getElementById('divDetalleBebida').style.display = 'none';
        document.getElementById('divCatalogoBebidas').style.display = '';
    }
}

function generarIDBebida() {
    let ultimoID = 0;

    if (bebidas.length > 0) {
        ultimoID = bebidas[0].id;
        for (let i = 0; i < bebidas.length; i++) {
            if (bebidas[i].id > ultimoID)
                ultimoID = bebidas[i].id;
        }
    }
    ultimoID++;
    return ultimoID;
}

function generarIDProducto() {
    let ultimoID = 0;

    if (bebidas.length > 0) {
        ultimoID = bebidas[0].producto.id;
        for (let i = 0; i < bebidas.length; i++) {
            if (bebidas[i].producto.id > ultimoID)
                ultimoID = bebidas[i].producto.id;
        }
    }
    ultimoID++;
    return ultimoID;
}

function buscarCategoriaPorID(idCategoria) {
    for (let i = 0; i < categorias.length; i++) {
        if (categorias[i].id === idCategoria)
            return categorias[i];
    }

    return null;
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
