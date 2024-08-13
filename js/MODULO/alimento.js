/***********************************************************
 * Script: Modulo de alimentos
 * Autor: Fernando Oñate
 * Fecha: Lunes 08, Julio 2024
 * Descripción: funcion para el modulo de alimentos de la aplicación
 ***********************************************************/

//Definimos un arreglo JSON de Categorias:
let categorias = [
    {
        id: 1,
        nombre: "Platillo"
    },
    {
        id: 2,
        nombre: "Torta"
    },
    {
        id: 3,
        nombre: "Ensalada"
    },
    {
        id: 4,
        nombre: "Postre"
    },
    {
        id: 5,
        nombre: "Fruta"
    }
];

//Definimos un arreglo JSON de alimentos de forma global:
let alimentos = [
    {
        id: 1,
        producto: {
            id: 1,
            nombre: "Tacos",
            descripcion: "Muy ricos.",
            foto: "",
            precio: 14.99,
            categoria: {
                id: 1,
                nombre: "Platillo"
            }
        }
    },
    {
        id: 2,
        producto: {
            id: 2,
            nombre: "Taparterias",
            descripcion: "Torta grande c",
            foto: "",
            precio: 30.00,
            categoria: {
                id: 2,
                nombre: "Torta"
            }
        }
    },
    {
        id: 3,
        producto: {
            id: 3,
            nombre: "Ensalada Mediterránea",
            descripcion: "Ensalada de alimentos mediterráneos.",
            foto: "",
            precio: 120.00,
            categoria: {
                id: 3,
                nombre: "Ensalada"
            }
        }
    },
    {
        id: 4,
        producto: {
            id: 4,
            nombre: "Dieta Tropical",
            descripcion: "Ensalada de alimentos tropicales.",
            foto: "",
            precio: 110.00,
            categoria: {
                id: 3,
                nombre: "Ensalada"
            }
        }
    },
    {
        id: 5,
        producto: {
            id: 5,
            nombre: "Pasta Cantonesa",
            descripcion: "Pasta tipo oriental con carne y vegetales.",
            foto: "",
            precio: 175.00,
            categoria: {
                id: 1,
                nombre: "Platillo"
            }
        }
    }
];

export function inicializarModulo() {
    setDetalleAlimentoVisible(false);
    llenarComboBoxCategorias();
    llenarTabla();
}



export function limpiar() {
    document.getElementById("txtId").value = '';
    document.getElementById("txtAlimento").value = '';
    document.getElementById("txtDescripcionAlimento").value = '';
    document.getElementById("txtPrecioAlimento").value = '';
    document.getElementById("cmbCategoria").value = 1;
}


export function consultar() {
    let nombre = document.getElementById("txtBuscar").value;
    let encontrado = false;
    let contenido = '';

    for (let i = 0; i < alimentos.length; i++) {
        if (alimentos[i].producto.nombre.toLowerCase().includes(nombre.toLowerCase()) || alimentos[i].id.toString() === nombre) {
            contenido += '<tr>' +
                '<td>' + alimentos[i].producto.nombre + '</td>' +
                '<td>' + alimentos[i].producto.categoria.nombre + '</td>' +
                '<td class="">' + alimentos[i].producto.precio + '</td>' +
                '<td><button class="btn btn-warning btn-sm" onclick="cm.mostrarDetalleAlimento(' + alimentos[i].id + ')"><i class="fas fa-edit"></i> Editar</button></td>' +
                '</tr>';
            encontrado = true;
        }
    }

    if (!encontrado) {
        Swal.fire('', 'No se encontraron resultados.', 'warning');
        llenarTabla();
    }
    else {
        document.getElementById("tbodyAlimentos").innerHTML = contenido;
    }
}

export function mostrarDetalleAlimento(idAlimento) {
    let alimento = null;
    let pos = buscarPosicionAlimentoPorID(idAlimento);

    if (pos < 0) {
        Swal.fire('', 'Alimento no encontrado.', 'warning');
        return;
    }

    limpiar();
    alimento = alimentos[pos];
    document.getElementById("txtId").value = alimento.id;
    document.getElementById("txtAlimento").value = alimento.producto.nombre;
    document.getElementById("txtDescripcionAlimento").value = alimento.producto.descripcion;
    document.getElementById("txtPrecioAlimento").value = alimento.producto.precio;
    document.getElementById("cmbCategoria").value = alimento.producto.categoria.id;
    setDetalleAlimentoVisible(true);
}

export function mostrarFormularioNuevo() {
    limpiar();
    setDetalleAlimentoVisible(true);
}

/**
* Llena el cuerpo (tbody) de una tabla HTML
* utilizando los valores del arreglo JSON
* de alimentos.
*/
function llenarTabla() {
    //Aqui guardaremos el contenido de la tabla:
    let contenido = '';

    //Recorremos el arreglo de alimentos:
    for (let i = 0; i < alimentos.length; i++) {
        //Vamos generando el contenido de forma dinamica:
        //contenido = contenido + '<tr>' + '</tr>'
        contenido += '<tr>' +
            '<td>' + alimentos[i].producto.nombre + '</td>' +
            '<td>' + alimentos[i].producto.categoria.nombre + '</td>' +
            '<td class="">' + alimentos[i].producto.precio + '</td>' +
            '<td><button class="btn btn-warning btn-sm" onclick="cm.mostrarDetalleAlimento(' + alimentos[i].id + ')"><i class="fas fa-edit"></i> Editar</button></td>' +
            '</tr>';
    }

    //Insertamos el contenido HTML generado dentro del cuerpo de la tabla:
    document.getElementById("tbodyAlimentos").innerHTML = contenido;
}

function llenarComboBoxCategorias() {
    let contenido = '';

    //Recorremos el arreglo de categorias:
    for (let i = 0; i < categorias.length; i++) {
        contenido += '<option value="' + categorias[i].id + '">' +
            categorias[i].nombre +
            '</option>';
    }

    document.getElementById('cmbCategoria').innerHTML = contenido;
}

/*
* Busca la posicion de un alimento con base en su ID.
* 
* Si el ID no se encuentra, la funcion devuelve -1.
*/
function buscarPosicionAlimentoPorID(idAlimento) {
    //Recorremos el arreglo de alimentos:
    for (let i = 0; i < alimentos.length; i++) {
        if (alimentos[i].id === idAlimento)
            return i;
    }

    return -1;
}

/*
* Esta funcion muestra y oculta el detalle
* de un alimento.
*/
export function setDetalleAlimentoVisible(valor) {
    // Si valor es true:
    if (valor) {
        //Oculto el catalogo:
        document.getElementById('divCatalogoAlimentos').style.display = 'none';

        //Muestro el detalle:
        document.getElementById('divDetalleAlimento').style.display = '';
    }
    else {
        //Oculto el detalle:
        document.getElementById('divDetalleAlimento').style.display = 'none';

        //Muestro el catalogo:
        document.getElementById('divCatalogoAlimentos').style.display = '';
    }
}

function generarIDAlimento() {
    let ultimoID = 0;

    //Primero revisamos que haya alimentos en el arreglo:
    if (alimentos.length > 0) {
        ultimoID = alimentos[0].id;
        for (let i = 0; i < alimentos.length; i++) {
            if (alimentos[i].id > ultimoID)
                ultimoID = alimentos[i].id;
        }
    }
    ultimoID++;
    return ultimoID;
}

function generarIDProducto() {
    let ultimoID = 0;

    //Primero revisamos que haya alimentos en el arreglo:
    if (alimentos.length > 0) {
        ultimoID = alimentos[0].producto.id;
        for (let i = 0; i < alimentos.length; i++) {
            if (alimentos[i].producto.id > ultimoID)
                ultimoID = alimentos[i].producto.id;
        }
    }
    ultimoID++;
    return ultimoID;
}

function buscarCategoriaPorID(idCategoria) {
    for (let i = 0; i < categorias.length; i++) {
        if (categorias[i].id == idCategoria)
            return categorias[i];
    }
    return null;
}


export function guardar() {
    // Ocultar mensajes anteriores
    ocultarMensaje();

    // Obtener valores del formulario
    let nombre = document.getElementById("txtAlimento").value.trim();
    let descripcion = document.getElementById("txtDescripcionAlimento").value.trim();
    let precio = parseFloat(document.getElementById("txtPrecioAlimento").value);
    let categoriaID = parseInt(document.getElementById("cmbCategoria").value);

    // Validaciones:
    if (nombre === '') {
        mostrarMensaje('El nombre del alimento no puede estar vacío.', 'error');
        return;
    }

    if (descripcion.length < 10) {
        mostrarMensaje('La descripción debe tener al menos 10 caracteres.', 'error');
        return;
    }

    if (isNaN(precio) || precio <= 0) {
        mostrarMensaje('El precio del alimento debe ser un número positivo.', 'error');
        return;
    }

    if (!buscarCategoriaPorID(categoriaID)) {
        mostrarMensaje('La categoría seleccionada no es válida.', 'error');
        return;
    }

    let a = {
        id: parseInt(document.getElementById("txtId").value) || generarIDAlimento(),
        producto: {
            id: parseInt(document.getElementById("txtId").value) || generarIDProducto(),
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            categoria: buscarCategoriaPorID(categoriaID)
        }
    };

    let posTemp = buscarPosicionAlimentoPorID(a.id);
    if (posTemp >= 0) {
        alimentos[posTemp] = a; // Actualizar
    } else {
        alimentos.push(a); // Insertar nuevo
    }

    llenarTabla();
    limpiar();
    mostrarMensaje('Datos de producto guardados con éxito.', 'success');
}

export function eliminar() {
    ocultarMensaje();

    let idAlimento = parseInt(document.getElementById("txtId").value);

    if (isNaN(idAlimento) || idAlimento <= 0) {
        mostrarMensaje('ID de alimento no válido.', 'error');
        return;
    }

    let pos = buscarPosicionAlimentoPorID(idAlimento);

    if (pos < 0) {
        mostrarMensaje('El alimento que intenta eliminar no existe.', 'error');
        return;
    }

    if (confirm('¿Está seguro de que desea eliminar este alimento? Esta acción no se puede deshacer.')) {
        alimentos.splice(pos, 1);
        llenarTabla();
        limpiar();
        mostrarMensaje('El alimento ha sido eliminado con éxito.', 'success');
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
