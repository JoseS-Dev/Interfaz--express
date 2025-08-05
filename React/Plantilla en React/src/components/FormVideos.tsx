import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { axiosInstance } from '../context/axiosInstances';

type VideoType = {
  id_video: number;
  name_video: string;
  format_video: string;
  duration_video?: number;
  size_video?: number;
};

type FormVideosProps = {
  modoCrear: boolean;
  videoEdit: VideoType | null;
  onSuccess: () => void;
};

export const FormVideos = ({ modoCrear, videoEdit, onSuccess }: FormVideosProps) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [nameVideo, setNameVideo] = useState<string>('');
  const [formatVideo, setFormatVideo] = useState<string>('');
  const [durationMinutes, setDurationMinutes] = useState<string>('');
  const [durationSeconds, setDurationSeconds] = useState<string>('');
  const [sizeFile, setSizeFile] = useState<string>('');

  const [audioMainFile, setAudioMainFile] = useState<File | null>(null);
  const [audioSecondaryFile, setAudioSecondaryFile] = useState<File | null>(null);

  const [subtitleMainFile, setSubtitleMainFile] = useState<File | null>(null);
  const [subtitleSecondaryFile, setSubtitleSecondaryFile] = useState<File | null>(null);

  // Carga datos cuando cambia videoEdit
  useEffect(() => {
    if (videoEdit) {
      setNameVideo(videoEdit.name_video || '');
      setFormatVideo(videoEdit.format_video || '');
      if (videoEdit.duration_video) {
        const m = Math.floor(videoEdit.duration_video / 60);
        const s = Math.floor(videoEdit.duration_video % 60);
        setDurationMinutes(m.toString());
        setDurationSeconds(s.toString());
      } else {
        setDurationMinutes('');
        setDurationSeconds('');
      }
      if (videoEdit.size_video) {
        setSizeFile(Math.round(videoEdit.size_video / 1024).toString());
      } else {
        setSizeFile('');
      }
      // Resetea archivos, pues upload es solo si usuario carga nuevos
      setVideoFile(null);
      setAudioMainFile(null);
      setAudioSecondaryFile(null);
      setSubtitleMainFile(null);
      setSubtitleSecondaryFile(null);
    } else {
      // Limpiar formulario
      setNameVideo('');
      setFormatVideo('');
      setDurationMinutes('');
      setDurationSeconds('');
      setSizeFile('');
      setVideoFile(null);
      setAudioMainFile(null);
      setAudioSecondaryFile(null);
      setSubtitleMainFile(null);
      setSubtitleSecondaryFile(null);
    }
  }, [videoEdit]);

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setVideoFile(file || null);
  };
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => setNameVideo(e.target.value);
  const handleFormatChange = (e: ChangeEvent<HTMLInputElement>) => setFormatVideo(e.target.value);
  const handleDurationMinutesChange = (e: ChangeEvent<HTMLInputElement>) => setDurationMinutes(e.target.value);
  const handleDurationSecondsChange = (e: ChangeEvent<HTMLInputElement>) => setDurationSeconds(e.target.value);
  const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => setSizeFile(e.target.value);
  const handleAudioMainChange = (e: ChangeEvent<HTMLInputElement>) => setAudioMainFile(e.target.files ? e.target.files[0] : null);
  const handleAudioSecondaryChange = (e: ChangeEvent<HTMLInputElement>) => setAudioSecondaryFile(e.target.files ? e.target.files[0] : null);
  const handleSubtitleMainChange = (e: ChangeEvent<HTMLInputElement>) => setSubtitleMainFile(e.target.files ? e.target.files[0] : null);
  const handleSubtitleSecondaryChange = (e: ChangeEvent<HTMLInputElement>) => setSubtitleSecondaryFile(e.target.files ? e.target.files[0] : null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (modoCrear && (!videoFile || !nameVideo)) {
      alert('El video y nombre son obligatorios');
      return;
    }
    if (!nameVideo) {
      alert('El nombre es obligatorio');
      return;
    }

    try {
      if (modoCrear) {
        // CREAR VIDEO
        const videoFormData = new FormData();
        videoFormData.append('url_video', videoFile as File);
        videoFormData.append('name_video', nameVideo);

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

        const formData = new FormData();
        console.log('Actualizando video:', nameVideo);
        formData.append('name_video', nameVideo);
        console.log('Actualizando video:', nameVideo);
        console.log('Actualizando video:', formData);
        if (formatVideo) formData.append('format_video', formatVideo);
        // No envíes duración ni tamaño pues usualmente se extraen de archivo

        if (videoFile) formData.append('url_video', videoFile);
        if (audioMainFile) formData.append('url_audio_main', audioMainFile);
        if (audioSecondaryFile) formData.append('url_audio_secondary', audioSecondaryFile);
        if (subtitleMainFile) formData.append('subtitle_main_video', subtitleMainFile);
        if (subtitleSecondaryFile) formData.append('subtitle_secondary_video', subtitleSecondaryFile);

        await axiosInstance.patch(`/videos/update/${videoEdit.id_video}`, formData, {
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
          <span className="block mb-1 text-lg font-500">Nombre</span>
          <input type="text" className="px-4 py-2 border-2 border-gray-300 bg-[#DFEEFF]/50 rounded-lg w-full" placeholder="Nombre del video" onChange={handleNameChange} value={nameVideo} />
        </label>
        <label>
          <span className="block mb-1 text-lg font-500">Pistas de audio</span>
          <div className="flex gap-2">
            <input type="file" accept=".mp3,.wav,.m4a" className="px-4 py-2 border-2 border-gray-300 bg-[#DFEEFF]/50 rounded-lg min-w-0 flex-1" placeholder="Audio Principal" onChange={handleAudioMainChange} />
            <input type="file" accept=".mp3,.wav,.m4a" className="px-4 py-2 border-2 border-gray-300 bg-[#DFEEFF]/50 rounded-lg min-w-0 flex-1" placeholder="Audio Secundario" onChange={handleAudioSecondaryChange} />
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
