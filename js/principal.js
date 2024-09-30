let moduloCargado = false;
let cm = null;

async function cargarModuloAlimento() {
    let contenedor = document.getElementById('contenedorPrincipal');
    
    if (moduloCargado) {
        contenedor.innerHTML = '';
        moduloCargado = false;
    } else {
        let url = 'modulos/alimento.html';
        let resp = await fetch(url);
        let contenido = await resp.text();
        contenedor.innerHTML = contenido;
        
        import('./MODULO/alimento.js').then(obj => {
            cm = obj;
            cm.inicializarModulo();
        });
        moduloCargado = true;
    }
}
async function cargarmodulobebida() {

    let contenedor = document.getElementById('contenedorPrincipal');
    if (moduloCargado) {
        contenedor.innerHTML = '';
        moduloCargado = false;
    } else {
    let url = 'modulos/bebida.html'
    let resp = await fetch(url)
    let contenido = await resp.text()
    document.getElementById('contenedorPrincipal').innerHTML = contenido
    import('./MODULO/bebida.js').then(obj => {
        cm = obj;
        cm.inicializarModulo();
    });
    moduloCargado = true;
    }
}
async function cargarModuloSucursal() {
    let contenedor = document.getElementById('contenedorPrincipal');
    if (moduloCargado) {
        contenedor.innerHTML = '';
        moduloCargado = false;
    } else {
    let url = 'modulos/sucursal.html';
    let resp = await fetch(url);
    let contenido = await resp.text();
    document.getElementById('contenedorPrincipal').innerHTML = contenido
     import('./MODULO/sucursal.js').then(obj => {
        cm = obj;
        cm.inicializarModulo();
    });
    moduloCargado = true;
    }
}

async function cargarModuloUsuario() {
    let contenedor = document.getElementById('contenedorPrincipal');
    if (moduloCargado) {
        contenedor.innerHTML = '';
        moduloCargado = false;
    } else {
    let url = 'modulos/usuarios.html'
    let resp = await fetch(url)
    let contenido = await resp.text()
    document.getElementById('contenedorPrincipal').innerHTML = contenido
    import('./MODULO/usuarios.js').then(obj => {
        cm = obj;
        cm.inicializarModulo();
    });
    moduloCargado = true;
    }
}
async function cargarModuloPagos() {  
    let contenedor = document.getElementById('contenedorPrincipal');
    if (moduloCargado) {
        contenedor.innerHTML = '';
        moduloCargado = false;
    } else {
    let url = 'modulos/pagos.html'
    let resp = await fetch(url)
    let contenido = await resp.text()
    document.getElementById('contenedorPrincipal').innerHTML = contenido
    import('./MODULO/pagos.js').then(obj => {
        cm = obj;
        cm.inicializarModulo();
    });
    moduloCargado = true;
    }
}
async function cargarModuloCombo() {
    let contenedor = document.getElementById('contenedorPrincipal');
    if (moduloCargado) {
        contenedor.innerHTML = '';
        moduloCargado = false;
    } else {
    let url = 'modulos/combo.html'
    let resp = await fetch(url)
    let contenido = await resp.text()
    document.getElementById('contenedorPrincipal').innerHTML = contenido
    import('./MODULO/combo.js').then(obj => {
        cm = obj;
        cm.inicializarModulo();
    });
    moduloCargado = true;
    }
    
}