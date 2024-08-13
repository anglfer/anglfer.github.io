/*********************
 * Script: usuario.js
 * Autor: Mariana Cortes
 * Fecha: Lunes 08, Julio 2024
 * Descripción: Funciones para la gestión de empleados (usuario) en la aplicación.
*********************/
let payments = [];

// Muestra la sección de detalles del pago
export function showPaymentDetails() {
    document.getElementById('paymentDetails').style.display = 'block';
    document.getElementById('paymentList').style.display = 'none';
    clearPaymentDetails();
}

// Oculta la sección de detalles del pago
export function hidePaymentDetails() {
    document.getElementById('paymentDetails').style.display = 'none';
    document.getElementById('paymentList').style.display = 'block';
}

// Guarda o edita el pago
export function savePayment() {
    const id = document.getElementById('paymentId').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const cardHolder = document.getElementById('cardHolder').value.trim();
    const expiryMonth = document.getElementById('expiryMonth').value.trim();
    const expiryYear = document.getElementById('expiryYear').value.trim();
    const securityCode = document.getElementById('securityCode').value.trim();
    const paymentStatus = document.getElementById('paymentStatus').value.trim();
    const paymentAmount = document.getElementById('paymentAmount').value.trim();

    if (!cardNumber || !cardHolder || !expiryMonth || !expiryYear || !securityCode || !paymentStatus || !paymentAmount) {
        alert('Por favor complete todos los campos.');
        return;
    }

    if (id) {
        // Editar pago existente
        const index = payments.findIndex(payment => payment.id === parseInt(id));
        if (index !== -1) {
            payments[index] = { id: parseInt(id), cardNumber, cardHolder, expiryMonth, expiryYear, securityCode, paymentStatus, paymentAmount };
        }
    } else {
        // Agregar nuevo pago
        const newId = payments.length ? payments[payments.length - 1].id + 1 : 1;
        payments.push({ id: newId, cardNumber, cardHolder, expiryMonth, expiryYear, securityCode, paymentStatus, paymentAmount });
    }

    hidePaymentDetails();
    renderPayments();
}

// Elimina un pago
export function deletePayment() {
    const id = document.getElementById('paymentId').value.trim();
    if (id) {
        payments = payments.filter(payment => payment.id !== parseInt(id));
        hidePaymentDetails();
        renderPayments();
    } else {
        alert('No se puede eliminar. ID de pago no encontrado.');
    }
}

// Limpia los campos de detalles del pago
export function clearPaymentDetails() {
    document.getElementById('paymentId').value = '';
    document.getElementById('cardNumber').value = '';
    document.getElementById('cardHolder').value = '';
    document.getElementById('expiryMonth').value = '';
    document.getElementById('expiryYear').value = '';
    document.getElementById('securityCode').value = '';
    document.getElementById('paymentStatus').value = '';
    document.getElementById('paymentAmount').value = '';
}

// Renderiza los pagos en la tabla
export function renderPayments() {
    const paymentTableBody = document.getElementById('paymentTableBody');
    paymentTableBody.innerHTML = '';

    payments.forEach(payment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${payment.id}</td>
            <td>${payment.cardHolder}</td>
            <td>${payment.expiryMonth}/${payment.expiryYear}</td>
            <td>${payment.paymentAmount}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="cm.editPayment(${payment.id})">
                    <i class="btn btn-info btn-sm"></i> Editar
                </button>
            </td>
        `;
        paymentTableBody.appendChild(row);
    });
}

// Edita los detalles del pago
export function editPayment(id) {
    const payment = payments.find(payment => payment.id === id);
    if (payment) {
        document.getElementById('paymentId').value = payment.id;
        document.getElementById('cardNumber').value = payment.cardNumber;
        document.getElementById('cardHolder').value = payment.cardHolder;
        document.getElementById('expiryMonth').value = payment.expiryMonth;
        document.getElementById('expiryYear').value = payment.expiryYear;
        document.getElementById('securityCode').value = payment.securityCode;
        document.getElementById('paymentStatus').value = payment.paymentStatus;
        document.getElementById('paymentAmount').value = payment.paymentAmount;

        showPaymentDetails();
    }
}

// Función para buscar pagos
export function searchPayments() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredPayments = payments.filter(payment =>
        payment.id.toString().includes(query) ||
        payment.cardHolder.toLowerCase().includes(query)
    );
    renderPayments(filteredPayments);
}

// Inicializar con algunos datos de prueba




export function inicializarModulo(){
    
    document.addEventListener('DOMContentLoaded', () => {
        payments = [
            { id: 1, cardNumber: '1234567812345678', cardHolder: 'Juan Pérez', expiryMonth: '12', expiryYear: '24', securityCode: '123', paymentStatus: 'Aprobado', paymentAmount: '100.00' },
            { id: 2, cardNumber: '8765432187654321', cardHolder: 'Ana Gómez', expiryMonth: '06', expiryYear: '23', securityCode: '456', paymentStatus: 'Rechazado', paymentAmount: '150.00' }
        ];
        renderPayments();
    
        // Configurar el botón de búsqueda
        document.getElementById('searchButton').addEventListener('click', searchPayments);
    });
    
}