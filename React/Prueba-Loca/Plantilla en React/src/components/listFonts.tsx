import React, { useEffect, useState } from "react";
import { axiosInstance } from "../context/axiosInstances";
import loadListFonts from "../utils/loadListFonts";
import Swal from "sweetalert2";

const ListFonts = ({ refreshListFonts }: { refreshListFonts: boolean }) => {
  const [tipographyData, setTipographyData] = useState([]);
  const [savedFontsNames, setSavedFontsNames] = useState({});
  const loadFonts = async () => {
    try {
      const response = await axiosInstance.get("/Tipography");
      const { data } = response.data;
      setTipographyData(data);
    } catch (error) {
      console.error("Error al cargar las fuentes:", error);
    }
  };
  const loadSavedFontsNames = async () => {
    const savedFontsNames = await loadListFonts();
    setSavedFontsNames(savedFontsNames);
  };
  const loadFontsInUseEffect = async () => {
    await loadSavedFontsNames();
    loadFonts();
  };
  useEffect(() => {
    loadFontsInUseEffect();
  }, [refreshListFonts]);

  const onSelectFont = async (id) => {
    try {
      const response = await axiosInstance.patch("/Tipography/select", {
        id_tipography: id,
      });
      
      // Mensaje de éxito tipo toast
      Swal.fire({
        icon: "success",
        title: "¡Tipografía cambiada exitosamente!",
        background: "#DFEEFF",
        color: "#2563EB",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "rounded-xl",
        },
      });
      
      loadFonts();
    } catch (error) {
      console.error("Error al seleccionar la fuente:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al seleccionar la tipografía",
        background: "#DFEEFF",
        color: "#2563EB",
        confirmButtonColor: "#2563EB",
        customClass: {
          popup: "rounded-xl",
        },
      });
    }
  };

  const onDeleteFont = async (id) => {
    // SweetAlert2 de confirmación
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F97316", // Naranja
      cancelButtonColor: "#374151", // Gris oscuro
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#DFEEFF",
      color: "#2563EB",
      customClass: {
        popup: "rounded-xl",
        confirmButton: "font-bold",
        cancelButton: "font-bold",
      },
    });

    if (result.isConfirmed) {
      const font: any = tipographyData.find(
        (font: any) => font.id_tipography === id
      );
      if (font && font.is_selected === 1) {
        try {
          const response = await axiosInstance.patch("/Tipography/select", {
            id_tipography: 1,
          });
        } catch (error) {
          console.error("Error al seleccionar la fuente 1:", error);
        }
      }
      try {
        const response = await axiosInstance.delete(`/Tipography/${id}`);
        
        Swal.fire({
          icon: "success",
          title: "¡Tipografía eliminada exitosamente!",
          background: "#DFEEFF",
          color: "#2563EB",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "rounded-xl",
          },
        });
        
        loadFonts();
      } catch (error) {
        console.error("Error al eliminar la fuente:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al eliminar la tipografía",
          background: "#DFEEFF",
          color: "#2563EB",
          confirmButtonColor: "#2563EB",
          customClass: {
            popup: "rounded-xl",
          },
        });
      }
    }
  };
  return (
    <article className="w-full my-2 p-3 overflow-y-auto flex flex-col items-center gap-3 max-h-140">
      {tipographyData.map((font) => {
        const {
          id_tipography,
          is_selected,
          tam_title,
          tam_subtitle,
          tam_paragraph,
        } = font;
        const {
            name_tipography_main,
            name_tipography_secondary,
        }: { name_tipography_main: string; name_tipography_secondary: string } = font;
        const fonts: any = savedFontsNames[id_tipography];
        const mainName =
          name_tipography_main.length <= 12
            ? name_tipography_main
            : name_tipography_main.slice(0, 12) + "...";
        const secondaryName =
          name_tipography_secondary.length <= 12
            ? name_tipography_secondary
            : name_tipography_secondary.slice(0, 12) + "...";

        return (
          <div
            key={id_tipography}
            className="flex flex-wrap justify-around items-center w-full border-b-2 border-blue-800 py-2 gap-2 rounded-md"
            style={
              is_selected === 1 ? { backgroundColor: "#BFCEDF" } : undefined
            }
            onClick={() => onSelectFont(id_tipography)}
          >
            <h4 className="font-bold text-lg tracking-widest px-3">
              {id_tipography}
            </h4>

            <span
              className="font-sans text-lg flex-1 min-w-[80px] truncate"
              style={{ fontFamily: fonts.primaryFont }}
            >
              {mainName}
            </span>

            <span
              className="font-serif text-lg flex-1 min-w-[80px] truncate"
              style={{ fontFamily: fonts.secondaryFont }}
            >
              {secondaryName}
            </span>

            <div className="flex gap-3 flex-1 min-w-[120px] justify-center">
              <span className="font-bold" title="tam_title">
                {`${tam_title}px`}
              </span>
              <span className="font-bold" title="tam_subtitle">
                {`${tam_subtitle}px`}
              </span>
              <span className="font-bold" title="tam_paragraph">
                {`${tam_paragraph}px`}
              </span>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteFont(id_tipography);
              }}
              className="lucide lucide-trash2-icon lucide-trash-2 hover:text-red-600 transition-colors duration-300 cursor-pointer"
              style={id_tipography === 1 ? { visibility: "hidden" } : undefined}
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </div>
        );
      })}
    </article>
  );
};
export default ListFonts;
