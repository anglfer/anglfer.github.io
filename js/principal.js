let cm = null;
async function cargarModuloAlimento() {
    let url = 'modulos/alimento.html'
    let resp = await fetch(url)
    let contenido = await resp.text()
    document.getElementById('contenedorPrincipal').innerHTML = contenido
    import('./MODULO/alimento.js').then(obj => {
        cm = obj;
        cm.inicializarModulo();
    });
}
async function cargarmodulobebida() {
    let url = 'modulos/bebida.html'
    let resp = await fetch(url)
    let contenido = await resp.text()
    document.getElementById('contenedorPrincipal').innerHTML = contenido
    import('./MODULO/bebida.js').then(obj => {
        cm = obj;
        cm.inicializarModulo();
    });
}
async function cargarModuloSucursal() {
    let url = 'modulos/sucursal.html';
    let resp = await fetch(url);
    let contenido = await resp.text();
    document.getElementById('contenedorPrincipal').innerHTML = contenido
     import('./MODULO/sucursal.js').then(obj => {
        cm = obj;
        cm.inicializarModulo();
    });
}

async function cargarModuloUsuario() {
    let url = 'modulos/usuarios.html'
    let resp = await fetch(url)
    let contenido = await resp.text()
    document.getElementById('contenedorPrincipal').innerHTML = contenido
    import('./MODULO/usuarios.js').then(obj => {
        cm = obj;
        cm.inicializarModulo();
    });
}
async function cargarModuloPagos() {  
    let url = 'modulos/pagos.html'
    let resp = await fetch(url)
    let contenido = await resp.text()
    document.getElementById('contenedorPrincipal').innerHTML = contenido
    import('./MODULO/pagos.js').then(obj => {
        cm = obj;
        cm.inicializarModulo();
    });
}
async function cargarModuloCombo() {
    let url = 'modulos/combo.html'
    let resp = await fetch(url)
    let contenido = await resp.text()
    document.getElementById('contenedorPrincipal').innerHTML = contenido
    import('./MODULO/combo.js').then(obj => {
        cm = obj;
        cm.inicializarModulo();
    });
}