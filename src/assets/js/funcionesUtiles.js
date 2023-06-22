import Swal from 'sweetalert2';

// Mostrar una alerta de error
const alertaError = mensaje => {
    Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: mensaje,
        confirmButtonText: 'Volver',
        confirmButtonColor: '#3085d6'
    });
}

// Mostrar alerta de éxito
const alertaExito = mensaje => {
    Swal.fire({
        icon: 'success',
        title: mensaje,
        showConfirmButton: false,
        timer: 3000
    });
}

export { alertaError, alertaExito }