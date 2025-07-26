export const CardImages = () => {
    return (
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
    );
};