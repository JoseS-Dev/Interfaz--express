
const ListFonts = ({font}) => {
    return (
        <article className="w-full my-2 p-3 overflow-y-auto flex flex-col items-center gap-3 max-h-140">
            <div className="flex flex-wrap justify-around items-center w-full border-b-2 border-blue-800 py-2 gap-2 rounded-md">
                <h4 className="font-bold text-lg tracking-widest px-3">ID</h4>
                <span className="font-sans text-lg flex-1 min-w-[80px] truncate">
                {/*
                    font.name_tipography_main.length <= 12
                      ? font.name_tipography_main
                      : font.name_tipography_main.slice(0, 12) + "..."
                */
                }
                San-serif
                </span>
                <span className="font-serif text-lg flex-1 min-w-[80px] truncate">
                {/*
                  font.name_tipography_secondary.length <= 12
                    ? font.name_tipography_secondary
                    : font.name_tipography_secondary.slice(0, 12) + "..."
                */
                }
                Serif
                </span>
                <div className="flex gap-3 flex-1 min-w-[120px] justify-center">
                    <span className="font-bold" title="tam_title">{ /*`${font.tam_title}px`*/} 12px</span>
                    <span className="font-bold" title="tam_subtitle">{/*`${font.tam_subtitle}px` */} 14px</span>
                    <span className="font-bold" title="tam_paragraph">{/* `${font.tam_paragraph}px` */}18px</span>
                </div>
                <svg
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
            </div>
        </article>
    )
}
export default ListFonts;