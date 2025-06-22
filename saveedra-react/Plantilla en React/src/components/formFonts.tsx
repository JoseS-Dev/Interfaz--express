import { useState } from "react"

const FormFonts = () => {
    const[PrimaryInputFont, setPrimaryInputFont] = useState("");
    const[SecondaryInputFont, setSecondaryInputFont] = useState("");
    const[titleInputSize, setTitleInputSize] = useState("");
    const[subtitleInputSize, setSubtitleInputSize] = useState("");
    const[paragraphInputSize, setParagraphInputSize] = useState("");
    
    return (
        <form className="w-full h-152 flex flex-col items-center gap-1 px-2 py-3 bg-white">
            <div className="w-full h-22 px-3 flex flex-col gap-1">
                <label className="w-full trancking-widese font-500 text-lg" htmlFor="primaryFont">Fuente Principal</label>
                <input
                    className="w-full h-1/2 rounded-sm border border-[#374151]/25 text-center cursor-pointer px-3 py-2 bg-[#DFEEFF]/50 text-[#374151] text-sm text-[16px] focus:outline-none focus:border-secondary"
                    type="file"
                    accept=".ttf"
                    name="primary"
                    id="primaryFont"
                    value={PrimaryInputFont}
                    onChange={(e) => setPrimaryInputFont(e.target.value)}
                    required
                />
            </div>
            
            <div className="w-full h-22 px-3 flex flex-col gap-1">
                <label className="w-full trancking-widese font-500 text-lg" htmlFor="secondaryFont">Fuente Secundaria</label>
                <input
                    className="w-full h-1/2 rounded-sm border border-[#374151]/25 text-center cursor-pointer px-3 py-2 bg-[#DFEEFF]/50 text-[#374151] text-sm text-[16px] focus:outline-none focus:border-secondary"
                    type="file"
                    accept=".ttf"
                    name="secondary"
                    id="secondaryFont"
                    value={SecondaryInputFont}
                    onChange={(e) => setSecondaryInputFont(e.target.value)}
                    required
                />
            </div>

            <div className="w-full h-19 px-3 flex flex-col gap-1">
                <label className="w-full trancking-widese font-500 text-lg" htmlFor="tam_title">Tamaño de los titulos</label>
                <input
                    className="w-full h-1/2 rounded-sm border border-[#374151]/25 cursor-pointer px-3 py-2 bg-[#DFEEFF]/50 text-[#374151] text-sm text-[16px] focus:outline-none focus:border-secondary"
                    id="tam_title"
                    name="tam_title"
                    placeholder="Ingrese el tamaño de los titulos"
                    value={titleInputSize}
                    onChange={(e) => setTitleInputSize(e.target.value)}
                    required
                    type="number"
                />
            </div>
    
            <div className="w-full h-19 px-3 flex flex-col gap-1">
                <label className="w-full trancking-widese font-500 text-lg" htmlFor="tam_subtitle">Tamaño de los subtitulos</label>
                <input
                    className="w-full h-1/2 rounded-sm border border-[#374151]/25 cursor-pointer px-3 py-2 bg-[#DFEEFF]/50 text-[#374151] text-sm text-[16px] focus:outline-none focus:border-secondary"
                    type="number"
                    name="tam_subtitle"
                    id="tam_subtitle"
                    value={subtitleInputSize}
                    onChange={(e) => setSubtitleInputSize(e.target.value)}
                    placeholder="Ingrese el tamaño de los subtitulos"
                    required
                />
            </div>
    
            <div className="w-full h-19 px-3 flex flex-col gap-1">
                <label className="w-full trancking-widese font-500 text-lg" htmlFor="tam_paragraph">Tamaño de los párrafos</label>
                <input
                    className="w-full h-1/2 rounded-sm border border-[#374151]/25 cursor-pointer px-3 py-2 bg-[#DFEEFF]/50 text-[#374151] text-sm text-[16px] focus:outline-none focus:border-secondary"
                    type="number"
                    name="tam_paragraph"
                    id="tam_paragraph"
                    value={paragraphInputSize}
                    onChange={(e) => setParagraphInputSize(e.target.value)}
                    placeholder="Ingrese el tamaño de los párrafos"
                    required
                />
            </div>
            {PrimaryInputFont == "" || SecondaryInputFont == "" || titleInputSize == "" || subtitleInputSize == "" || paragraphInputSize == "" ? (
                <span className="text-red-600">Complete todos los campos.</span>
            ) : null}
            <div className="w-full flex justify-between px-3 mt-1.5">
                <button type="submit" className="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3 text-[16px] max-w-32">Crear</button>
                <button type="submit" className="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3 text-[16px] max-w-32">Editar</button>
            </div>
        </form>
    )
}

export default FormFonts;