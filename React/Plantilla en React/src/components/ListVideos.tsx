import { useState, useEffect } from "react";
import React from "react";
import { axiosInstance } from "../context/axiosInstances";
import { confirmAction, successAlert } from "../utils/swalHelper";

interface Video {
    id_video: number;
    name_video: string;
    format_video: string;
    duration_video: number; // en segundos
    size_video: number; // bytes
    is_selected: number; // 1 o 0 para seleccionado
}

export const ListVideos = ({ videos, onEditClick }) => {
  const [videosData, setVideosData] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/videos");
      // Asumo que la data está en response.data.data o ajusta según tu API
      setVideosData(response.data.data || response.data);
    } catch (err) {
      console.error("Error al obtener los videos:", err);
      setError("Error al obtener los videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const onToggleSelectVideo = async (id_video: number, currentSelected: number) => {
    try {
      // Si el video está seleccionado (1), lo deseleccionamos (0) y viceversa
      const newSelected = currentSelected === 1 ? 0 : 1;

      // PATCH para cambiar el estado is_selected
      await axiosInstance.patch("/videos/select", {
        id_video,
        is_selected: newSelected,
      });

      await loadVideos();

      successAlert({
        title: newSelected === 1 ? "Video seleccionado" : "Video deseleccionado",
        text: `El video con ID ${id_video} ha sido ${
          newSelected === 1 ? "seleccionado" : "deseleccionado"
        }.`,
        position: "center",
      });
    } catch (error) {
      console.error("Error al cambiar selección del video:", error);
      setError("Error al cambiar selección del video");
    }
  };

  const onDeleteVideo = async (id_video: number) => {
    const result = await confirmAction({
      title: "¿Estás seguro?",
      text: "¡Esta acción eliminará el video y no se puede deshacer!",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosInstance.delete(`/videos/${id_video}`);
      await loadVideos();
      successAlert({
        title: "¡Eliminado!",
        text: "El video ha sido eliminado correctamente.",
      });
    } catch (error) {
      console.error("Error al eliminar el video:", error);
      setError("Error al eliminar el video");
    }
  };

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const formatSize = (bytes: number) => {
    // Mostrar en KB con 2 decimales
    return `${(bytes / 1024).toFixed(2)} KB`;
  };

  if (loading) return <div>Cargando videos...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <article className="flex flex-col lg:border-l-2 gap-6 p-2 px-4 min-w-0 grow-40 basis-[100%] lg:basis-0 mt-6 lg:mt-0 max-h-[600px] overflow-y-auto">
      <h2 className="w-full text-xl font-bold text-center border-b-2">Registro de Videos</h2>
      {videosData.length === 0 && <p className="text-center">No hay videos disponibles.</p>}
      {Array.isArray(videosData) && videosData.map((video) => {
        const isSelected = video.is_selected === 1;
        const baseClasses =
          "flex items-center justify-around w-full border-b-2 border-blue-800 my-2 py-2 gap-2 rounded-md cursor-pointer";
        const selectedBg = "bg-[#BFCEDF]";

        return (
          <div
            key={video.id_video}
            className={`${baseClasses} ${isSelected ? selectedBg : ""}`}
            data-id_video={video.id_video}
            onClick={() => onToggleSelectVideo(video.id_video, video.is_selected)}
          >
            <div className="font-bold text-center grow-1" aria-label="ID">
              {video.id_video}
            </div>
            <div className="text-center grow-1" aria-label="Nombre">
              {video.name_video}
            </div>
            <div className="text-center grow-1" aria-label="Formato">
              {video.format_video}
            </div>
            <div className="text-center grow-1" aria-label="Duración">
              {formatDuration(video.duration_video)}
            </div>
            <div className="text-center grow-1" aria-label="Tamaño">
              {formatSize(video.size_video)}
            </div>

            <svg
              id="edit"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors duration-300 cursor-pointer lucide lucide-pencil hover:text-blue-600"
              onClick={(e) => {
                e.stopPropagation();
                onEditClick(video);
              }}
              role="button"
              tabIndex={0}
            >
              <path d="M16.862 3.487a2.046 2.046 0 0 1 2.89 2.898l-10.07 10.07-4.199 1.302 1.292-4.193 10.087-10.077z" />
              <path d="M19.409 7.441l-2.849-2.849" />
            </svg>


            {/* Icono eliminar */}
            <svg
              id="deleted"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors duration-300 cursor-pointer lucide lucide-trash2-icon lucide-trash-2 hover:text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteVideo(video.id_video);
              }}
              role="button"
              tabIndex={0}
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

export default ListVideos;
