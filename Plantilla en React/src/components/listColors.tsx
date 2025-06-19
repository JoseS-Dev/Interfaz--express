
const ListColors = () =>{
    return (
        <article className="w-full my-2 overflow-y-auto flex flex-col items-center gap-2 max-h-140">
            <div className="w-full">
                <div className="flex items-center justify-around w-full border-b-2 border-blue-800 my-2 bg-[#BFCEDF] py-2 gap-2 rounded-md">
                    <h4 className="flex justify-center items-center font-bold text-xl w-8"></h4>
                    <div className="border-2 border-black rounded-full w-8 h-8"></div>
                    <div className="border-2 border-black rounded-full w-8 h-8"></div>
                    <div className="border-2 border-black rounded-full w-8 h-8"></div>
                    <div className="border-2 border-black rounded-full w-8 h-8"></div>
                    <div className="border-2 border-black rounded-full w-8 h-8"></div>
                    <svg
                        id="deleted"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-trash2-icon lucide-trash-2 hover:text-red-600 transition-colors duration-300 cursor-pointer"
                    >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                    <svg
                        id="deleted"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-trash2-icon lucide-trash-2 hover:text-red-600 transition-colors duration-300 invisible"
                    >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                </div>
            </div>
        </article>
    )
}

export default ListColors;