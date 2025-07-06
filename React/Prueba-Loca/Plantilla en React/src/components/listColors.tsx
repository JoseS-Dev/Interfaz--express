import { useState, useEffect } from 'react';
import React from 'react';
import { axiosInstance } from '../context/axiosInstances';
import Swal from 'sweetalert2';

const ListColors = ({refreshListColors}) =>{
    const [colorsData, setColorsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const loadColors = async () => {
        setLoading(true);
        setError(null);
        try{
            const response = await axiosInstance.get('/Colors');
            setColorsData(response.data);
        } 
        catch (err) {
            console.error('Error al obtener los colores:', err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadColors();
    }, [refreshListColors]);
    const onSelectColor = async (id) => {
        try {
            const response = await axiosInstance.patch('/Colors/select', { id_colors: id });
            
            // Mensaje de éxito tipo toast
            Swal.fire({
                icon: "success",
                title: "¡Paleta de colores fue cambiada exitosamente!",
                background: "#DFEEFF",
                color: "#2563EB",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: "rounded-xl",
                },
            });
            
            loadColors();
        }
        catch (error) {
            console.error('Error al seleccionar el color:', error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error al seleccionar la paleta de colores",
                background: "#DFEEFF",
                color: "#2563EB",
                confirmButtonColor: "#2563EB",
                customClass: {
                    popup: "rounded-xl",
                },
            });
        }
    }
    const onDeleteColor = async (id) => {
        // SweetAlert2 de confirmación
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#F97316", // Naranjo
            cancelButtonColor: "#374151", // Gris oscuro
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            background: "#DFEEFF",
            color: "#2563EB",
            customClass: {
                popup: "rounded-xl",
                confirmButton: "font-bold",
                cancelButton: "font-bold",
            },
        });

        if (result.isConfirmed) {
            try {
                const selectedColor = (await axiosInstance.get('/Colors/selected')).data.data;
                if (selectedColor.id_colors === id) {
                    const response = await axiosInstance.patch('/Colors/select', { id_colors: 1 });
                }

                const reponse = await axiosInstance.delete(`/Colors/${id}`);
                
                Swal.fire({
                    icon: "success",
                    title: "¡Paleta de colores fue eliminada exitosamente!",
                    background: "#DFEEFF",
                    color: "#2563EB",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        popup: "rounded-xl",
                    },
                });
                
                loadColors();
            } 
            catch (error) {
                console.error('Error al eliminar el color:', error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Error al eliminar la paleta de colores",
                    background: "#DFEEFF",
                    color: "#2563EB",
                    confirmButtonColor: "#2563EB",
                    customClass: {
                        popup: "rounded-xl",
                    },
                });
            }
        }
    }
    return (
        <article className="w-full my-2 overflow-y-auto flex flex-col items-center gap-2 max-h-140">
      {colorsData.map((color: any) => {
        const isSelected = color.is_selected === 1;
        const baseClasses =
          'flex items-center justify-around w-full border-b-2 border-blue-800 my-2 py-2 gap-2 rounded-md';
        const selectedBg = 'bg-[#BFCEDF]';
        const clickHandler = () => onSelectColor(color.id_colors);

        return (
          <div
            key={color.id_colors}
            className={`${baseClasses} ${isSelected ? selectedBg : ''}`}
            data-id_color={color.id_colors}
            onClick={clickHandler}
          >
            <h4 className="flex justify-center items-center font-bold text-xl w-8">
              {color.id_colors}
            </h4>

            {/* Colores */}
            {['primary_color', 'secondary_color', 'ternary_color', 'cuarternary_color', 'neutral_color'].map((key) => (
              <div
                key={key}
                className="border-2 border-black rounded-full w-8 h-8"
                style={{ backgroundColor: `#${color[key]}` }}
                title={color[key]}
              />
            ))}

            {/* Icono de eliminar */}
            {color.id_colors !== 1 ? (
              <svg
                id="deleted"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trash2-icon lucide-trash-2 hover:text-red-600 transition-colors duration-300 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteColor(color.id_colors);
                }}
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            ) : (
              <svg
                id="deleted"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trash2-icon lucide-trash-2 hover:text-red-600 transition-colors duration-300 invisible"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            )}
          </div>
        );
      })}
    </article>
    )
}

export default ListColors;