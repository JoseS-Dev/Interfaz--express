import Swal from 'sweetalert2';

export const confirmAction = async ({
  title,
  text,
  confirmButtonText = 'Sí, continuar',
  cancelButtonText = 'Cancelar',
  confirmButtonColor = '#3085d6',
  cancelButtonColor = '#d33',
  icon = 'warning',
}) => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
    cancelButtonText,
  });
};

export const successAlert = ({
  title,
  text,
  timer = 1500,
  position = 'top-end',
}) => {
  return Swal.fire({
    position,
    icon: 'success',
    title,
    text,
    showConfirmButton: false,
    timer,
  });
};
