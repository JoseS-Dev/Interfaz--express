import { useState, useEffect } from "react";
import { CardVideos } from "../CardVideos";
import { FormVideos } from "../FormVideos";
import { ListVideos } from "../ListVideos";
import { axiosInstance } from "../../context/axiosInstances";

export const SectionsVideo = () => {
  const [videos, setVideos] = useState([]);
  const [videoEdit, setVideoEdit] = useState(null); // video cargado para edición
  const [modoCrear, setModoCrear] = useState(true);

  const loadVideos = async () => {
    try {
      const res = await axiosInstance.get("/videos");
      setVideos(res.data.data || res.data);
    } catch (error) {
      console.error("Error cargando videos:", error);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  // Handler para pasar a FormVideos el video seleccionado para editar y activar modo edición
  const handleEditVideo = (video) => {
    setVideoEdit(video);
    console.log("Editando video:", video);
    setModoCrear(false);
  };

  // Cuando terminas crear o actualizar, limpiar estado y recargar lista
  const handleFormSuccess = () => {
    setModoCrear(true);
    setVideoEdit(null);
    loadVideos();
  };

  return (
    <div className="flex flex-wrap flex-1 gap-6 p-4">
      <FormVideos 
        modoCrear={modoCrear} 
        videoEdit={videoEdit} 
        onSuccess={handleFormSuccess} 
      />
      <CardVideos />
      <ListVideos 
        videos={videos} 
        onEditClick={handleEditVideo} 
      />
    </div>
  );
};
