import React, { useState } from "react";

const FormColors = () => {
    const [PrimaryColorInput, setChangePrimaryColor] = useState("");
    const [SecondaryColorInput, setChangeSecondaryColor] = useState("");
    const [TernaryColorInput, setChangeTernaryColor] = useState("");
    const [CuarternaryColorInput, setChangeCuarternaryColor] = useState("");
    const [NeutralColorInput, setChangeNeutralColor] = useState("");
    
    return (
        <form className="w-full h-152 flex flex-col items-center gap-5 px-2 py-3">
            <div className="w-full h-22 flex flex-col gap-1">
                <label className="text-lg trancking-wide font-500 w-full border-b-2 border-gray-700" htmlFor="primary_color">
                    Color Primario
                </label>
                <input
                    className="w-full h-full"
                    type="color"
                    name="primary_color"
                    id="primary_color"
                    value={PrimaryColorInput}
                    onChange={(e) => setChangePrimaryColor(e.target.value)}
                    required
                />
            </div>
            <div className="w-full h-22 flex flex-col gap-1">
                <label className="text-lg trancking-wide font-500 w-full border-b-2 border-gray-700" htmlFor="secondary_color">
                    Color Secundario
                </label>
                <input
                    className="w-full h-full"
                    type="color"
                    name="secondary_color"
                    id="secondary_color"
                    value={SecondaryColorInput}
                    onChange={(e) => setChangeSecondaryColor(e.target.value)}
                    required
                />
            </div>
            <div className="w-full h-22 flex flex-col gap-1">
                <label className="text-lg trancking-wide font-500 w-full border-b-2 border-gray-700">
                    Color Terciario
                </label>
                <input
                    className="w-full h-full"
                    type="color"
                    name="ternary_color"
                    id="ternary_color"
                    value={TernaryColorInput}
                    onChange={(e) => setChangeTernaryColor(e.target.value)}
                    required
                />
            </div>
            <div className="w-full h-22 flex flex-col gap-1">
                <label className="text-lg trancking-wide font-500 w-full border-b-2 border-gray-700" htmlFor="cuarternary_color">
                    Color cuaternario
                </label>
                <input
                    className="w-full h-full"
                    type="color"
                    name="cuarternary_color"
                    id="cuarternary_color"
                    value={CuarternaryColorInput}
                    onChange={(e) => setChangeCuarternaryColor(e.target.value)}
                    required
                />
            </div>
            <div className="w-full h-22 flex flex-col gap-1">
                <label className="text-lg trancking-wide font-500 w-full border-b-2 border-gray-700" htmlFor="neutral_color">
                    Color neutral
                </label>
                <input
                    className="w-full h-full"
                    type="color"
                    name="neutral_color"
                    id="neutral_color"
                    value={NeutralColorInput}
                    onChange={(e) => setChangeNeutralColor(e.target.value)}
                    required
                />
            </div>
            { PrimaryColorInput == "" || SecondaryColorInput == "" || TernaryColorInput == "" || CuarternaryColorInput== "" || NeutralColorInput == "" ? (
                <span className="text-red-600">Complete todos los campos.</span>
            ) : null}
            <div className="w-full flex justify-between">
                <button type="submit" className="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3">Crear</button>
                <button type="submit" className="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3">Editar</button>
            </div>
        </form>
    )
}

export default FormColors;