import { useState, useEffect } from "react";
import type { ImageData } from "../types/imagen";

export const CardImages = () => {
  const[previewData, setPreviewData] = useState<ImageData | null>(null);
  const filename = `${import.meta.env.VITE_BACKEND_URL}/imagen`
  // Cargar la ultima imagen creada al montar el componente
  useEffect(() => {
    const lastImage = JSON.parse(localStorage.getItem("lastImageCreated") || '{}');
    if(lastImage) setPreviewData(lastImage.data);
  }, []);
  console.log(previewData);
  
  return (
        <div className="flex flex-col border-l-2 gap-2 p-2 px-4 min-w-0 grow-30 basis-0">
          <h2 className="w-full text-xl font-bold border-b-2 text-center">
            Vista Previa
          </h2>
          <div className="flex flex-col items-center gap-4">
            {!previewData ? (
              <p className="text-2xl font-semibold">No hay Imagenes en la vista Previa</p>
            ):(
              <>
                <div className="flex flex-col items-center gap-4 w-full h-3/4 border-2 border-black">
                    <img
                      src={`${filename}/${previewData.url_image.split('\\').pop()}`}
                      className="w-full h-full rounded-2xl"
                    />
                </div>
                <div className="text-center w-full border-2 border-black flex flex-col gap-3 p-2">
                    <h3 className="text-2xl font-bold underline">Detalles de la Imagen</h3>
                    <div className="flex items-center justify-between px-1 text-xl font-semibold h-16">
                      <p>Nombre de la imagen</p>
                      <p>{previewData.name_image}</p>
                    </div>
                    <div className="flex items-center justify-between px-3 text-xl font-semibold h-10">
                      <p>Formato de la imagen</p>
                      <p>{previewData.format_image}</p>
                    </div>
                    <div className="flex items-center justify-between px-3 text-xl font-semibold h-10">
                      <p>Tamaño de la imagen</p>
                      <p>{previewData.size_image.toPrecision(2)} KB</p>
                    </div>
                    <div className="flex items-center justify-between px-3 text-xl font-semibold h-10">
                      <p>Dimensiones de la imagen</p>
                      <p>{previewData.dimension_image}</p>
                    </div>
                </div>
              </>
            )}
          </div>
        </div>
    );
};