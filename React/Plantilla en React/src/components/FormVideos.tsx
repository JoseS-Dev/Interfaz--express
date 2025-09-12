import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { axiosInstance } from '../context/axiosInstances';
import { PreviewData, VideoType } from '../types/video';

type PreviewVideoMetadata = {
  fileName?: string;
  fileFormat?: string;
  duration?: string;
  size?: string;
};

type FormVideosProps = {
  modoCrear: boolean;
  videoEdit: VideoType | null;
  onSuccess: () => void;
  onPreviewChange: (previewData: PreviewData) => void;
};

export const FormVideos = ({ modoCrear, videoEdit, onSuccess, onPreviewChange }: FormVideosProps) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [audioMainFile, setAudioMainFile] = useState<File | null>(null);
  const [audioSecondaryFile, setAudioSecondaryFile] = useState<File | null>(null);
  const [subtitleMainFile, setSubtitleMainFile] = useState<File | null>(null);
  const [subtitleSecondaryFile, setSubtitleSecondaryFile] = useState<File | null>(null);
  const [localPreview, setLocalPreview] = useState<PreviewData>({
    videoUrl: null,
    primarySubtitleUrl: null,
    secondarySubtitleUrl: null,
    primaryAudioUrl: null,
    secondaryAudioUrl: null,
    videoMetadata: null,
  });

  // Efecto para rellenar el formulario o limpiarlo al cambiar el modo
  useEffect(() => {
    if (!modoCrear && videoEdit) {
      console.log("[FormVideos] ✏️ Rellenando formulario con datos de video a editar:", videoEdit);
      const newPreviewData: PreviewData = {
        videoUrl: videoEdit.url_video,
        primarySubtitleUrl: videoEdit.url_primary_subtitle,
        secondarySubtitleUrl: videoEdit.url_secondary_subtitle,
        primaryAudioUrl: videoEdit.url_primary_audio,
        secondaryAudioUrl: videoEdit.url_secondary_audio,
        videoMetadata: {
          fileName: videoEdit.file_name,
          fileFormat: videoEdit.file_format,
          duration: videoEdit.duration,
          size: videoEdit.size,
        },
      };
      setLocalPreview(newPreviewData);
      onPreviewChange(newPreviewData);
      // No rellenamos los inputs de tipo file, ya que no se puede por seguridad
    } else {
      console.log("[FormVideos] ✨ Limpiando formulario para modo creación.");
      const cleanPreviewData = {
        videoUrl: null,
        primarySubtitleUrl: null,
        secondarySubtitleUrl: null,
        primaryAudioUrl: null,
        secondaryAudioUrl: null,
        videoMetadata: null,
      };
      setLocalPreview(cleanPreviewData);
      onPreviewChange(cleanPreviewData);
      // Limpiar también los estados de los archivos
      setVideoFile(null);
      setAudioMainFile(null);
      setAudioSecondaryFile(null);
      setSubtitleMainFile(null);
      setSubtitleSecondaryFile(null);
    }
  }, [videoEdit, modoCrear]);

  // --- Funciones de manejo de archivos ---

  // Función genérica para manejar cambios en archivos que no son de video principal
  const handleOtherFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    fileSetter: (file: File | null) => void,
    previewKey: keyof PreviewData
  ) => {
    const file = e.target.files?.[0] || null;
    fileSetter(file);
    const localUrl = file ? URL.createObjectURL(file) : null;

    setLocalPreview(prev => {
      const newState = { ...prev, [previewKey]: localUrl };
      onPreviewChange(newState);
      return newState;
    });
  };

  // Función específica para el archivo de video (incluye metadatos)
  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setVideoFile(file);

    if (file) {
      const localUrl = URL.createObjectURL(file);
      const metadata: PreviewVideoMetadata = {
        fileName: file.name,
        fileFormat: file.type,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        // Duración no se puede obtener de forma síncrona, se puede omitir o implementar un método asíncrono
      };
      setLocalPreview(prev => {
        const newState = { ...prev, videoUrl: localUrl, videoMetadata: metadata };
        onPreviewChange(newState);
        return newState;
      });
    } else {
      setLocalPreview(prev => {
        const newState = { ...prev, videoUrl: null, videoMetadata: null };
        onPreviewChange(newState);
        return newState;
      });
    }
  };

  // Funciones que llaman a la función genérica
  const handleAudioMainChange = (e: ChangeEvent<HTMLInputElement>) => handleOtherFileChange(e, setAudioMainFile, 'primaryAudioUrl');
  const handleAudioSecondaryChange = (e: ChangeEvent<HTMLInputElement>) => handleOtherFileChange(e, setAudioSecondaryFile, 'secondaryAudioUrl');
  const handleSubtitleMainChange = (e: ChangeEvent<HTMLInputElement>) => handleOtherFileChange(e, setSubtitleMainFile, 'primarySubtitleUrl');
  const handleSubtitleSecondaryChange = (e: ChangeEvent<HTMLInputElement>) => handleOtherFileChange(e, setSubtitleSecondaryFile, 'secondarySubtitleUrl');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("[FormVideos] 📤 Enviando formulario...");

    if (modoCrear && !videoFile) {
      alert('El video es obligatorio.');
      return;
    }

    try {
      if (modoCrear) {
        // CREAR VIDEO
        const videoFormData = new FormData();
        videoFormData.append('url_video', videoFile as File);

        if (videoFile) {
          videoFormData.append('file_name', videoFile.name);
          videoFormData.append('file_format', videoFile.type);
          videoFormData.append('size', videoFile.size.toString());
        }

        const videoRes = await axiosInstance.post('/videos/create', videoFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        const id_video = videoRes.data.data?.id_video;
        if (!id_video) throw new Error('No se pudo crear el video');

        if (audioMainFile || audioSecondaryFile) {
          const audioFormData = new FormData();
          if (audioMainFile) audioFormData.append('url_audio_main', audioMainFile);
          if (audioSecondaryFile) audioFormData.append('url_audio_secondary', audioSecondaryFile);
          await axiosInstance.post(`/videos/create/track/${id_video}`, audioFormData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        }

        if (subtitleMainFile || subtitleSecondaryFile) {
          const subtitleFormData = new FormData();
          if (subtitleMainFile) subtitleFormData.append('subtitle_main_video', subtitleMainFile);
          if (subtitleSecondaryFile) subtitleFormData.append('subtitle_secondary_video', subtitleSecondaryFile);
          await axiosInstance.post(`/videos/create/subtitles/${id_video}`, subtitleFormData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        }

        alert('Video y pistas creados correctamente');
        onSuccess();

      } else {
        // ACTUALIZAR VIDEO (parcialmente)
        if (!videoEdit) return;

        const updateFormData = new FormData();

        // Solo añadimos los archivos si el usuario ha seleccionado uno nuevo
        if (videoFile) updateFormData.append('url_video', videoFile);
        if (audioMainFile) updateFormData.append('url_audio_main', audioMainFile);
        if (audioSecondaryFile) updateFormData.append('url_audio_secondary', audioSecondaryFile);
        if (subtitleMainFile) updateFormData.append('subtitle_main_video', subtitleMainFile);
        if (subtitleSecondaryFile) updateFormData.append('subtitle_secondary_video', subtitleSecondaryFile);

        // Opcional: si permites editar metadatos que no son de los archivos, agrégalos aquí

        await axiosInstance.patch(`/videos/update/${videoEdit.id}`, updateFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        alert('Video actualizado correctamente');
        onSuccess();
      }
    } catch (error) {
      console.error('Error en la operación:', error);
      alert('Error al crear o actualizar video');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center min-w-0 gap-6 p-2 px-4 grow-30 basis-0">
      <h2 className="w-full text-xl font-bold text-center border-b-2">
        {modoCrear ? 'Crear Video' : 'Editar Video'}
      </h2>
      <div className="flex flex-col w-full gap-3">
        <label>
          <span className="block mb-1 text-lg font-500">Cargar Video</span>
          <input type="file" accept="video/*" className="px-4 py-2 border-2 border-gray-300 bg-[#DFEEFF]/50 rounded-lg w-full" onChange={handleVideoChange} />
        </label>
        <label>
          <span className="block mb-1 text-lg font-500">Pistas de audio</span>
          <div className="flex gap-2">
            <input type="file" accept=".mp3,.wav,.m4a,.webm" className="px-4 py-2 border-2 border-gray-300 bg-[#DFEEFF]/50 rounded-lg min-w-0 flex-1" placeholder="Audio Principal" onChange={handleAudioMainChange} />
            <input type="file" accept=".mp3,.wav,.m4a, .webm" className="px-4 py-2 border-2 border-gray-300 bg-[#DFEEFF]/50 rounded-lg min-w-0 flex-1" placeholder="Audio Secundario" onChange={handleAudioSecondaryChange} />
          </div>
        </label>
        <label>
          <span className="block mb-1 text-lg font-500">Subtítulos</span>
          <div className="flex gap-2">
            <input type="file" accept=".srt,.vtt" className="px-4 py-2 border-2 border-gray-300 bg-[#DFEEFF]/50 rounded-lg min-w-0 flex-1" placeholder="Subtítulo Principal" onChange={handleSubtitleMainChange} />
            <input type="file" accept=".srt,.vtt" className="px-4 py-2 border-2 border-gray-300 bg-[#DFEEFF]/50 rounded-lg min-w-0 flex-1" placeholder="Subtítulo Secundario" onChange={handleSubtitleSecondaryChange} />
          </div>
        </label>
      </div>
      <div className="flex justify-between w-full">
        <button type="submit" className="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3 text-[16px] max-w-32">
          {modoCrear ? 'Crear' : 'Actualizar'}
        </button>
        {!modoCrear && (
          <button
            type="button"
            className="bg-gray-300 px-3 py-2 rounded-md font-medium hover:bg-gray-400 transition-colors cursor-pointer w-1/3 text-[16px] max-w-32"
            onClick={() => onSuccess()}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};