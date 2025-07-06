import React, { useState } from "react";
import { axiosInstance } from "../context/axiosInstances";
import Swal from "sweetalert2";

const FormColors = ({onRefreshListColors, onRefreshColorsPreview}) => {
    const [primaryColorInput, setPrimaryColorInput] = useState("");
    const [secondaryColorInput, setSecondaryColorInput] = useState("");
    const [ternaryColorInput, setTernaryColorInput] = useState("");
    const [cuarternaryColorInput, setCuarternaryColorInput] = useState("");
    const [neutralColorInput, setNeutralColorInput] = useState("");
    const [invalidData, setInvalidData] = useState(false);
    
    const onSaveColors = async(event: React.FormEvent) => {
        event.preventDefault();
        if (primaryColorInput === "" || secondaryColorInput === "" || ternaryColorInput === "" || cuarternaryColorInput === "" || neutralColorInput === "") {
            setInvalidData(true);
            return;
        }

        // SweetAlert de confirmación antes de guardar
        const result = await Swal.fire({
            title: "¿Deseas guardar los cambios?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: "No guardar",
            cancelButtonText: "Cancelar",
            background: "#DFEEFF", // Fondo azul claro
            color: "#2563EB", // Texto azul
            confirmButtonColor: "#2563EB", // Azul
            denyButtonColor: "#F97316", // Naranja
            cancelButtonColor: "#374151", // Gris oscuro
            customClass: {
                popup: "rounded-xl",
                confirmButton: "font-bold",
                denyButton: "font-bold",
                cancelButton: "font-bold",
            },
        });

        if (result.isConfirmed) {
            const colors = {
                primary_color: primaryColorInput.slice(1),
                secondary_color: secondaryColorInput.slice(1),
                ternary_color: ternaryColorInput.slice(1),
                cuarternary_color: cuarternaryColorInput.slice(1),
                neutral_color: neutralColorInput.slice(1),
                is_selected: false
            };
            try {
                const response = await axiosInstance.post('/Colors', colors);
                
                // Mensaje de éxito tipo toast
                Swal.fire({
                    icon: "success",
                    title: "¡Guardado!",
                    background: "#DFEEFF",
                    color: "#2563EB",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        popup: "rounded-xl",
                    },
                });
                
                onRefreshListColors();
                setPrimaryColorInput("");
                setSecondaryColorInput("");
                setTernaryColorInput("");
                setCuarternaryColorInput("");
                setNeutralColorInput("");
                const newColors = {
                    primary_color: "",
                    secondary_color: "",
                    ternary_color: "",
                    cuarternary_color: "",
                    neutral_color: ""
                };
                onRefreshColorsPreview(newColors);
                
            } catch (error) {
                console.error("Error al guardar los colores:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Error al guardar los colores",
                    background: "#DFEEFF",
                    color: "#2563EB",
                    confirmButtonColor: "#2563EB",
                    customClass: {
                        popup: "rounded-xl",
                    },
                });
            }
        } else if (result.isDenied) {
            Swal.fire("Los cambios no se guardaron", "", "info");
        }
    };
    const onInputColor = (event) => {
        const input = event.target;
        setInvalidData(false);
        const colors = {
            primary_color: primaryColorInput.slice(1),
            secondary_color: secondaryColorInput.slice(1),
            ternary_color: ternaryColorInput.slice(1),
            cuarternary_color: cuarternaryColorInput.slice(1),
            neutral_color: neutralColorInput.slice(1)
        };
        onRefreshColorsPreview(colors);
    };

    const onEditColors = async (event: React.FormEvent) => {
        event.preventDefault();
        if (primaryColorInput === "" || secondaryColorInput === "" || ternaryColorInput === "" || cuarternaryColorInput === "" || neutralColorInput === "") {
            setInvalidData(true);
            return;
        }

        // SweetAlert de confirmación antes de editar
        const result = await Swal.fire({
            title: "¿Deseas guardar los cambios?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: "No guardar",
            cancelButtonText: "Cancelar",
            background: "#DFEEFF", // Fondo azul claro
            color: "#2563EB", // Texto azul
            confirmButtonColor: "#2563EB", // Azul
            denyButtonColor: "#F97316", // Naranja
            cancelButtonColor: "#374151", // Gris oscuro
            customClass: {
                popup: "rounded-xl",
                confirmButton: "font-bold",
                denyButton: "font-bold",
                cancelButton: "font-bold",
            },
        });

        if (result.isConfirmed) {
            try {
                const reponse = await axiosInstance.get('/Colors/selected');
                const selectedColor = reponse.data.data;
                const colors = {
                    primary_color: primaryColorInput.slice(1),
                    secondary_color: secondaryColorInput.slice(1),
                    ternary_color: ternaryColorInput.slice(1),
                    cuarternary_color: cuarternaryColorInput.slice(1),
                    neutral_color: neutralColorInput.slice(1),
                    is_selected: true
                };
                const otherResponse = await axiosInstance.patch(`/Colors/${selectedColor.id_colors}`, colors);
                
                // Mensaje de confirmación tipo toast
                Swal.fire({
                    icon: "success",
                    title: "¡Guardado!",
                    background: "#DFEEFF",
                    color: "#2563EB",
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                        popup: "rounded-xl",
                    },
                });
                
                onRefreshListColors();
                setPrimaryColorInput("");
                setSecondaryColorInput("");
                setTernaryColorInput("");
                setCuarternaryColorInput("");
                setNeutralColorInput("");
                const newColors = {
                    primary_color: "",
                    secondary_color: "",
                    ternary_color: "",
                    cuarternary_color: "",
                    neutral_color: ""
                };
                onRefreshColorsPreview(newColors);
            } catch (error) {
                console.error("Error al editar los colores:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Error al editar los colores",
                    background: "#DFEEFF",
                    color: "#2563EB",
                    confirmButtonColor: "#2563EB",
                    customClass: {
                        popup: "rounded-xl",
                    },
                });
            }
        } else if (result.isDenied) {
            Swal.fire("Los cambios no se guardaron", "", "info");
        }
    };
    return (
        <form className="w-full h-full  flex flex-col items-center gap-5 px-2 py-3">
            <div className="w-full h-24 flex flex-col gap-1">
                <label className="text-lg trancking-wide font-500 w-full border-b-2 border-gray-700" htmlFor="primary_color">
                    Color Primario
                </label>
                <input
                    className="w-full h-full"
                    type="color"
                    name="primary_color"
                    id="primary_color"
                    value={primaryColorInput}
                    onChange={(e) => {
                        setPrimaryColorInput(e.target.value);
                        onInputColor(e);
                    }}
                    required
                />
            </div>
            <div className="w-full h-24 flex flex-col gap-1">
                <label className="text-lg trancking-wide font-500 w-full border-b-2 border-gray-700" htmlFor="secondary_color">
                    Color Secundario
                </label>
                <input
                    className="w-full h-full"
                    type="color"
                    name="secondary_color"
                    id="secondary_color"
                    value={secondaryColorInput}
                    onChange={(e) => {
                        setSecondaryColorInput(e.target.value);
                        onInputColor(e);
                    }}
                    required
                />
            </div>
            <div className="w-full h-24 flex flex-col gap-1">
                <label className="text-lg trancking-wide font-500 w-full border-b-2 border-gray-700">
                    Color Terciario
                </label>
                <input
                    className="w-full h-full"
                    type="color"
                    name="ternary_color"
                    id="ternary_color"
                    value={ternaryColorInput}
                    onChange={(e) => {
                        setTernaryColorInput(e.target.value);
                        onInputColor(e);
                    }}
                    required
                />
            </div>
            <div className="w-full h-24 flex flex-col gap-1">
                <label className="text-lg trancking-wide font-500 w-full border-b-2 border-gray-700" htmlFor="cuarternary_color">
                    Color cuaternario
                </label>
                <input
                    className="w-full h-full"
                    type="color"
                    name="cuarternary_color"
                    id="cuarternary_color"
                    value={cuarternaryColorInput}
                    onChange={(e) => {
                        setCuarternaryColorInput(e.target.value);
                        onInputColor(e);
                    }}
                    required
                />
            </div>
            <div className="w-full h-24 flex flex-col gap-1">
                <label className="text-lg trancking-wide font-500 w-full border-b-2 border-gray-700" htmlFor="neutral_color">
                    Color neutral
                </label>
                <input
                    className="w-full h-full"
                    type="color"
                    name="neutral_color"
                    id="neutral_color"
                    value={neutralColorInput}
                    onChange={(e) => {
                        setNeutralColorInput(e.target.value);
                        onInputColor(e);
                    }}
                    required
                />
            </div>
            { invalidData && (
                <span className="text-red-600">
                    Complete todos los campos.
                </span>
            )}
            <div className="w-full flex justify-between">
                <button type="submit" className="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3" onClick={onSaveColors}>Crear</button>
                <button type="submit" className="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3" onClick={onEditColors}>Editar</button>
            </div>
        </form>
    )
}

export default FormColors;