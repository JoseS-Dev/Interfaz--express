import "react-profile/themes/default";
import { openEditor } from "react-profile";
import { useRef, useState } from "react";
import swal from "sweetalert2";
import { axiosInstance } from "../context/axiosInstances";
import type { PreviewImage } from "../types/imagen";

export const FormImages = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const[imageFile, setImageFile] = useState<PreviewImage | null>(null);
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const image = await openEditor({ src: file });
      const editImage = image.editedImage;
      const blob = await editImage?.getBlob();
      if (!blob) return;
      const newFile = new File([blob], file.name, {
        type: file.type,
      });

      const img = new Image();
      img.src = URL.createObjectURL(newFile);
      img.onload = () => {
        setImageFile({
          file: newFile,
          dimensions: `${img.width}x${img.height}`,
          size: Math.round(newFile.size / 1024), // Tamaño en KB
          format: newFile.type.split("/").pop() || "",
        });
      }
    }
  };

  // Funcion para manejar el submit del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!imageFile){
      swal.fire("Error", "Por favor selecciona una imagen", "error");
      return;
    }
    try{
      const formData = new FormData();
      formData.append('url_image', imageFile.file);
      formData.append('dimension_image', imageFile.dimensions);
      formData.append('size_image', imageFile.size.toString());
      formData.append('format_image', imageFile.format);
      const result = await axiosInstance.post("/Images/create", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if(result){
        await swal.fire({
          title: "Exito",
          text: "Imagen creada correctamente",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        localStorage.setItem("lastImageCreated", JSON.stringify(result.data || result.data.data));
        window.location.reload();
        if(fileRef.current) fileRef.current.value = "";
        setImageFile(null);
      }
    }
    catch(error){
      console.error(error);
      if(error instanceof Error){
        swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        })
      }
    }
  }

  // Función para actualizar una imagen en cuestión
  const handleSubmitUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!imageFile){
      swal.fire("Error", "Por favor selecciona una imagen", "error");
      return;
    }
    const id_image = JSON.parse(localStorage.getItem("lastImageCreated") || '{}').data.id_image;
    try{
      const formData = new FormData();
      formData.append('url_image', imageFile.file);
      formData.append('dimension_image', imageFile.dimensions);
      formData.append('size_image', imageFile.size.toString());
      formData.append('format_image', imageFile.format);
      const result = await swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar'
      })

      if(result.isConfirmed){
        const res = await axiosInstance.put(`/Images/update/${id_image}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if(res){
          await swal.fire({
            title: "Exito",
            text: "Imagen actualizada correctamente",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          localStorage.setItem("lastImageCreated", JSON.stringify(res.data || res.data.data));
          window.location.reload();
          if(fileRef.current) fileRef.current.value = "";
          setImageFile(null);
        }
      }
      else{
        swal.fire({
          title: "Cancelado",
          text: "La image no fu actaulizada pero puedes agregar una nueva",
          icon: "info",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    }
    catch(error){
      console.error(error);
      if(error instanceof Error){
        swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        })
      }
    }
  }
  
  return (
    <div className="flex flex-col items-center gap-6 p-2 px-4 w-3/10 h-full border-r-2 border-gray-300">
      <h2 className="w-full text-xl font-bold border-b-2 text-center">
        Selecciona una Imagen
      </h2>
      <div className="w-full gap-3 flex flex-col">
        <label>
          <span className="block font-500 text-lg mb-1">Cargar Imagen</span>
          <input
            type="file"
            accept="image/*"
            className="px-4 py-2 border-2 border-gray-300 bg-[#DFEEFF]/50 rounded-lg w-full"
            onChange={onChange}
            ref={fileRef}
          />
        </label>
      </div>
      <div className="w-full flex justify-between">
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3 text-[16px] max-w-32"
        >
          Crear
        </button>
        <button
          onClick={handleSubmitUpdate}
          type="submit"
          className="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3 text-[16px] max-w-32"
        >
          Editar
        </button>
      </div>
    </div>
  );
};
