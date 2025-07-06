// src/utils/swalHelper.ts
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const confirmAction = async ({
  title,
  text,
  confirmButtonText = "Sí, continuar",
  cancelButtonText = "Cancelar",
  confirmButtonColor = "#3085d6", // Cambia por el color de tu paleta si lo deseas
  cancelButtonColor = "#d33", // Cambia por el color de tu paleta si lo deseas
  icon = "warning",
}: {
  title: string;
  text: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  icon?: "warning" | "info" | "success" | "error" | "question";
}) => {
  return MySwal.fire({
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

const successAlert = ({
  title,
  text,
  timer = 1500,
  position = "top-end",
}: {
  title: string;
  text?: string;
  timer?: number;
  position?:
    | "top"
    | "top-start"
    | "top-end"
    | "center"
    | "center-start"
    | "center-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end";
}) => {
  return MySwal.fire({
    position,
    icon: "success",
    title,
    text,
    showConfirmButton: false,
    timer,
  });
};

export { confirmAction, successAlert };
