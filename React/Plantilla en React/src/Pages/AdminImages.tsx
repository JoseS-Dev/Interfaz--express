import Header from "../components/Admin/Header";

const AdminImages = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex p-4 flex-wrap">
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
                onChange={(e) => {
                  console.log(e.target.files);
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
        <div className="flex flex-col border-l-2 gap-6 p-2 px-4 min-w-0 grow-30 basis-0">
          <h2 className="w-full text-xl font-bold border-b-2 text-center">
            Vista Previa
          </h2>
          <div className="">
            <img
              src="https://i.ytimg.com/vi/_mPDAQm58i8/maxresdefault.jpg"
              className="max-w-full h-auto object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col lg:border-l-2 gap-6 p-2 px-4 min-w-0 grow-40 basis-[100%] lg:basis-0 mt-6 lg:mt-0">
            <h2 className="w-full text-xl font-bold border-b-2 text-center">
                Registro de Imágenes
            </h2>
            <div className="text-center">
                <div className="flex border-b-2 border-blue-800 my-2 py-2 gap-2 rounded-md bg-[#BFCEDF]" aria-label="row">
                    <div className="grow-1" aria-label="id">1</div>
                    <div className="grow-1" aria-label="name">imagen1</div>
                    <div className="grow-1" aria-label="format">jpg</div>
                    <div className="grow-1" aria-label="dimensions">1920x1080</div>
                    <div className="grow-1" aria-label="size">500 KB</div>
                </div>
                <div className="flex border-b-2 border-blue-800 my-2 py-2 gap-2 rounded-md" aria-label="row">
                    <div className="grow-1" aria-label="id">2</div>
                    <div className="grow-1" aria-label="name">imagen2</div>
                    <div className="grow-1" aria-label="format">jpg</div>
                    <div className="grow-1" aria-label="dimensions">1920x1080</div>
                    <div className="grow-1" aria-label="size">500 KB</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
export default AdminImages;
