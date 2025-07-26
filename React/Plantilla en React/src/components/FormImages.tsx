import "react-profile/themes/default";
import { openEditor } from "react-profile";
import { useRef } from "react";

export const FormImages = () => {
  const fileRef = useRef<HTMLInputElement>(null);
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
      console.log(newFile);
    }
  };
  return (
    <div className="flex flex-col items-center gap-6 p-2 px-4 min-w-0 grow-30 basis-0">
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
        <label>
          <span className="block font-500 text-lg mb-1">Nombre</span>
          <input
            type="text"
            className="px-4 py-2 border-2 border-gray-300 bg-[#DFEEFF]/50 rounded-lg w-full"
            placeholder="Formato de la imagen"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </label>
        <label>
          <span className="block font-500 text-lg mb-1">Formato</span>
          <input
            type="text"
            className="px-4 py-2 border-2 border-gray-300 bg-[#DFEEFF]/50 rounded-lg w-full"
            placeholder="Formato de la imagen"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </label>
        <label>
          <span className="block font-500 text-lg mb-1">Dimensiones</span>
          <div className="flex gap-2">
            <input
              type="number"
              className="px-4 py-2 border-2 border-gray-300 bg-[#DFEEFF]/50 rounded-lg min-w-0 flex-1"
              placeholder="Alto en px"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
            <input
              type="number"
              className="px-4 py-2 border-2 border-gray-300 bg-[#DFEEFF]/50 rounded-lg min-w-0 flex-1"
              placeholder="Ancho en px"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </div>
        </label>
        <label>
          <span className="block font-500 text-lg mb-1">Tamaño</span>
          <input
            type="number"
            className="px-4 py-2 border-2 border-gray-300 bg-[#DFEEFF]/50 rounded-lg w-full"
            placeholder="Tamaño del archivo en KB"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </label>
      </div>
      <div className="w-full flex justify-between">
        <button
          type="submit"
          className="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3 text-[16px] max-w-32"
        >
          Crear
        </button>
        <button
          type="submit"
          className="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3 text-[16px] max-w-32"
        >
          Editar
        </button>
      </div>
    </div>
  );
};
