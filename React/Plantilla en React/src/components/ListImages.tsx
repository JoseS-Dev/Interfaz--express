import {useState, useEffect} from 'react';
import type { ImageData } from '../types/imagen';
import swal from "sweetalert2";
import { axiosInstance } from "../context/axiosInstances";
import { DeleteIcon } from '../assets/icons/DeleteIcon';
import { successAlert } from '../utils/swalHelper';

export const ListImages = () => {
    const[images, setImages] = useState<ImageData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    

      const loadImages = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axiosInstance.get("/images");
          setImages(response.data.data || response.data);
        } catch (err) {
          console.error("Error al obtener las imágenes:", err);
          setError("Error al obtener las imágenes");
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        loadImages();
      }, []);

      const onToggleSelectImage = async (id_image: number, currentSelected: number) => {
        try {
          // Si el video está seleccionado (1), lo deseleccionamos (0) y viceversa
          const newSelected = currentSelected === 1 ? 0 : 1;
          console.log(`Cambiando selección de la imagen con ID ${id_image} a ${newSelected}`);
          // PATCH para cambiar el estado is_selected
          await axiosInstance.patch("/images/select", {
            id_image,
            is_selected: newSelected,
          });

          await loadImages();

          successAlert({
            title: newSelected === 1 ? "Imagen seleccionada" : "Imagen deseleccionada",
            text: `La imagen con ID ${id_image} ha sido ${newSelected === 1 ? "seleccionada" : "deseleccionada"
              }.`,
            position: "center",
          });
        } catch (error) {
          console.error("Error al cambiar selección de la imagen:", error);
          setError("Error al cambiar selección del video");
        }
      };
    
      // Funcion para eliminar una imagen
      const onDeleteImage = async (id_image: number) => {
        try {
          const window = await swal.fire({
            title: "¿Estás seguro?",
            text: `¿Quieres eliminar la imagen con ID ${id_image}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
          });
          if(window.isConfirmed){
            await axiosInstance.delete(`/images/delete/${id_image}`);
            successAlert({
              title: "Imagen eliminada",
              text: `La imagen con ID ${id_image} ha sido eliminada.`,
              position: "center",
            });
            await loadImages();
          }
        
        } catch (error) {
          console.error("Error al eliminar la imagen:", error);
          setError("Error al eliminar la imagen");
        }
      };


    return (
        <div className="flex flex-col lg:border-l-2 gap-6 p-2 px-4 min-w-0 grow-40 basis-[100%] lg:basis-0 mt-6 lg:mt-0">
            <h2 className="w-full text-xl font-bold border-b-2 text-center">
                Registro de Imágenes
            </h2>
            {images.length === 0 ? (
                <p className='text-2xl font-semibold text-center'>No hay imágenes registradas.</p>
            ) : (
                <div className="text-center">
                {images.map((image) => {
                    const isSelected = image.is_selected === 1;
                    const baseClass = "flex gap-2 p-2 hover:bg-gray-200 cursor-pointer w-4/5";
                    const selectedClass = "bg-blue-100 border-blue-500";
                    return (
                        <div className='flex items-center w-full border-b-2 px-0.5'>
                            <div key={image.id_image} onClick={() => onToggleSelectImage(image.id_image, image.is_selected)} className={`${baseClass} ${isSelected ? selectedClass : ''}`} aria-label="row">
                                <div className="grow-1" aria-label="id">{image.id_image}</div>
                                <div className="grow-1" aria-label="name">{image.name_image}</div>
                                <div className="grow-1" aria-label="format">{image.format_image}</div>
                                <div className="grow-1" aria-label="dimensions">{image.dimension_image}</div>
                                <div className="grow-1" aria-label="size">{image.size_image} KB</div>
                            </div>
                            <div className="flex items-center justify-evenly w-1/5" aria-label="actions">
                                <button onClick={() => onDeleteImage(image.id_image)}><DeleteIcon/></button>
                            </div>
                        </div>
                    );
                })}
            </div>
            )}
        </div>
    );
};