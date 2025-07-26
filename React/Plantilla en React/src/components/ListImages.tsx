export const ListImages = () => {
    return (
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
    );
};