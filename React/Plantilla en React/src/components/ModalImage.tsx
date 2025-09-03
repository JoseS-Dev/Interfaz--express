import type { ImageData } from "../types/imagen";

export function ModalFunction({selectedImage, closeModal}: {selectedImage: ImageData | null, closeModal: () => void}) {
  if (!selectedImage) return null;
  const filename = `${import.meta.env.VITE_BACKEND_URL}/imagen`;
  return (
    <dialog open className='z-10 border-2 border-black w-1/4 h-full bg-gray-400 absolute top-3/10 left-170 p-4 rounded-2xl dialog'>
        <div className="w-full h-full flex flex-col items-center p- gap-1.5">
            <h3 className="text-2xl text-white tracking-normal w-full border-b-2 border-white">Detalles de la Imagen</h3>
            <div className="w-full h-1/2">
                <img src={`${filename}/${selectedImage?.url_image.split('\\').pop()}`} alt={selectedImage?.name_image} className="w-full h-full bg-cover bg-center rounded-2xl" />
            </div>
            <div className="w-full h-1/4 border-b-2 border-white flex">
                <div className="w-1/2 h-full flex flex-col p-2 justify-around border-r-2 border-white">
                    <h4 className="text-xl text-white">Dimension: {selectedImage?.dimension_image}</h4>
                    <h4 className="text-xl text-white">Formato: {selectedImage?.format_image}</h4>
                </div>
                <div className="w-1/2 h-full flex flex-col p-2 justify-around">
                    <h4 className="text-xl text-white">Nombre: {selectedImage?.name_image}</h4>
                    <h4 className="text-xl text-white">Tamaño: {selectedImage?.size_image} KB</h4>
                </div>
            </div>
            <button className="w-2/5 h-14 mt-1.5 border-2 border-white bg-blue-700 text-lg 
            tracking-normal text-white hover:bg-white hover:text-black transition-colors duration 200
            rounded-2xl cursor-pointer"
            onClick={closeModal}>
                Cerrar Modal
            </button>
        </div>
    </dialog>
  );
}
