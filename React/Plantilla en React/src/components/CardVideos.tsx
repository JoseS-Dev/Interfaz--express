import { useState, useRef, useEffect } from 'react';
import { PreviewData } from '../types/video';

interface CardVideosProps {
  previewData: PreviewData;
}

export const CardVideos = ({ previewData }: CardVideosProps) => {
  const {
    videoUrl,
    primaryAudioUrl,
    secondaryAudioUrl,
    primarySubtitleUrl,
    secondarySubtitleUrl,
    videoMetadata
  } = previewData;

  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Referencias para la VISTA PREVIA ---
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const previewPrimaryAudioRef = useRef<HTMLAudioElement>(null);
  const previewSecondaryAudioRef = useRef<HTMLAudioElement>(null);

  // --- Referencias para la MODAL ---
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const modalPrimaryAudioRef = useRef<HTMLAudioElement>(null);
  const modalSecondaryAudioRef = useRef<HTMLAudioElement>(null);

  // --- Estado Global para el componente ---
  const [activeAudio, setActiveAudio] = useState<'primary' | 'secondary' | 'none'>('none');
  const [activeSubtitle, setActiveSubtitle] = useState<string>('none'); // 'none', 'es', 'en'

  // --- Lógica de Sincronización ---
  const switchAudioTrack = (newTrack: 'primary' | 'secondary') => {
    // Pausar todos los audios (tanto de la modal como de la vista previa)
    [modalPrimaryAudioRef, modalSecondaryAudioRef, previewPrimaryAudioRef, previewSecondaryAudioRef].forEach(ref => ref.current?.pause());

    // Sincronizar el tiempo del video activo
    const currentVideoTime = modalVideoRef.current?.currentTime || previewVideoRef.current?.currentTime || 0;
    const wasPlaying = !modalVideoRef.current?.paused || !previewVideoRef.current?.paused;

    setActiveAudio(newTrack);

    // Sincronizar y reproducir el nuevo audio en el reproductor correspondiente
    const newModalAudio = newTrack === 'primary' ? modalPrimaryAudioRef.current : modalSecondaryAudioRef.current;
    if (isModalOpen && newModalAudio) {
      newModalAudio.currentTime = currentVideoTime;
      if (wasPlaying) newModalAudio.play();
    }

    const newPreviewAudio = newTrack === 'primary' ? previewPrimaryAudioRef.current : previewSecondaryAudioRef.current;
    if (!isModalOpen && newPreviewAudio) {
      newPreviewAudio.currentTime = currentVideoTime;
      if (wasPlaying) newPreviewAudio.play();
    }
  };

  // --- Controladores de eventos para la MODAL ---
  const handleModalPlay = () => (activeAudio === 'primary' ? modalPrimaryAudioRef.current?.play() : modalSecondaryAudioRef.current?.play());
  const handleModalPause = () => {
    modalPrimaryAudioRef.current?.pause();
    modalSecondaryAudioRef.current?.pause();
  };
  const handleModalSeek = () => {
    const videoTime = modalVideoRef.current?.currentTime || 0;
    const activeAudioEl = activeAudio === 'primary' ? modalPrimaryAudioRef.current : modalSecondaryAudioRef.current;
    if (activeAudioEl) activeAudioEl.currentTime = videoTime;
  };

  // --- Controladores de eventos para la VISTA PREVIA ---
  const handlePreviewPlay = () => (activeAudio === 'primary' ? previewPrimaryAudioRef.current?.play() : previewSecondaryAudioRef.current?.play());
  const handlePreviewPause = () => {
    previewPrimaryAudioRef.current?.pause();
    previewSecondaryAudioRef.current?.pause();
  };
  const handlePreviewSeek = () => {
    const videoTime = previewVideoRef.current?.currentTime || 0;
    const activeAudioEl = activeAudio === 'primary' ? previewPrimaryAudioRef.current : previewSecondaryAudioRef.current;
    if (activeAudioEl) activeAudioEl.currentTime = videoTime;
  };

  // --- Manejadores de la Modal ---
  const openModal = () => {
    if (videoUrl) {
      // Pausar la vista previa antes de abrir la modal
      previewVideoRef.current?.pause();
      handlePreviewPause();
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    // Pausar la modal antes de cerrarla
    modalVideoRef.current?.pause();
    handleModalPause();
    setIsModalOpen(false);
    // Reanudar la vista previa
    previewVideoRef.current?.play();
  };

  // Efecto para mostrar/ocultar subtítulos en AMBOS reproductores
  useEffect(() => {
    [modalVideoRef, previewVideoRef].forEach(ref => {
      if (ref.current) {
        const tracks = Array.from(ref.current.textTracks);
        tracks.forEach(track => {
          track.mode = track.language === activeSubtitle ? 'showing' : 'hidden';
        });
      }
    });
  }, [activeSubtitle, isModalOpen, videoUrl]);

  return (
    <>
      <div className="flex flex-col min-w-0 gap-6 p-2 px-4 grow-30 basis-0">
        <div className="w-full h-auto cursor-pointer" onClick={openModal}>
          {videoUrl ? (
            <>
              {/* Audios ocultos para la vista previa */}
              {primaryAudioUrl && <audio ref={previewPrimaryAudioRef} src={primaryAudioUrl} loop />}
              {secondaryAudioUrl && <audio ref={previewSecondaryAudioRef} src={secondaryAudioUrl} loop />}
              <video
                ref={previewVideoRef}
                key={`preview-${videoUrl}`}
                src={videoUrl}
                className="object-cover w-full h-auto max-w-full rounded-lg pointer-events-none"
                muted
                autoPlay
                loop
                onPlay={handlePreviewPlay}
                onPause={handlePreviewPause}
                onTimeUpdate={handlePreviewSeek}
                crossOrigin="anonymous"
              >
                {primarySubtitleUrl && <track kind="subtitles" src={primarySubtitleUrl} srcLang="es" label="Español" />}
                {secondarySubtitleUrl && <track kind="subtitles" src={secondarySubtitleUrl} srcLang="en" label="Inglés" />}
              </video>
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-48 bg-gray-200 rounded-md">
              <p className="text-gray-500">Selecciona un video y sus pistas</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={closeModal}>
          <div className="relative flex flex-col w-11/12 max-w-4xl p-4 bg-white rounded-lg shadow-xl md:p-6" onClick={(e) => e.stopPropagation()}>
            <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute text-3xl text-gray-700 transition-colors duration-200 cursor-pointer lucide lucide-circle-x top-2 right-2 hover:text-red-500"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
            <h3 className="mb-4 text-2xl font-bold text-center border-b-2 border-gray-200 md:mb-6">Reproductor de Video</h3>
            <div className="flex flex-col gap-4 md:flex-row md:gap-8">
              <div className="flex-1">
                <div className="flex flex-wrap gap-4 mb-4">
                  {/* Selector de Audio */}
                  <div>
                    <label className="mr-2 font-semibold">Audio:</label>
                    <select value={activeAudio} onChange={e => switchAudioTrack(e.target.value as 'primary' | 'secondary')} className="px-2 py-1 border rounded" disabled={!primaryAudioUrl && !secondaryAudioUrl}>
                      <option value="none">Sin audio</option>
                      <option value="primary" disabled={!primaryAudioUrl}>Opción 1</option>
                      <option value="secondary" disabled={!secondaryAudioUrl}>Opción 2</option>
                    </select>
                  </div>
                  {/* Selector de Subtítulos */}
                  <div>
                    <label className="mr-2 font-semibold">Subtítulos:</label>
                    <select value={activeSubtitle} onChange={e => setActiveSubtitle(e.target.value)} className="px-2 py-1 border rounded" disabled={!primarySubtitleUrl && !secondarySubtitleUrl}>
                      <option value="none">Sin subtítulos</option>
                      <option value="es" disabled={!primarySubtitleUrl}>Opción 1</option>
                      <option value="en" disabled={!secondarySubtitleUrl}>Opción 2</option>
                    </select>
                  </div>
                </div>

                {/* Elementos multimedia de la modal */}
                {primaryAudioUrl && <audio ref={modalPrimaryAudioRef} src={primaryAudioUrl} />}
                {secondaryAudioUrl && <audio ref={modalSecondaryAudioRef} src={secondaryAudioUrl} />}
                <video ref={modalVideoRef} key={`modal-${videoUrl}`} src={videoUrl ?? ''} className="w-full h-auto rounded-md" controls autoPlay muted onPlay={handleModalPlay} onPause={handleModalPause} onTimeUpdate={handleModalSeek} crossOrigin="anonymous">
                  {primarySubtitleUrl && <track kind="subtitles" src={primarySubtitleUrl} srcLang="es" label="Español" />}
                  {secondarySubtitleUrl && <track kind="subtitles" src={secondarySubtitleUrl} srcLang="en" label="Inglés" />}
                </video>
              </div>
              <div className="flex-1 max-w-xs p-4 bg-gray-100 rounded-lg">
                <h4 className="mb-2 text-xl font-semibold border-b-2 border-gray-300">Detalles del Archivo</h4>
                {videoMetadata && videoMetadata.fileName ? (
                  <ul className="space-y-2 text-gray-700 break-words">
                    <li><strong className="text-gray-900">Nombre:</strong> {videoMetadata.fileName}</li>
                    <li><strong className="text-gray-900">Formato:</strong> {videoMetadata.fileFormat}</li>
                    <li><strong className="text-gray-900">Duración:</strong> {videoMetadata.duration}</li>
                    <li><strong className="text-gray-900">Tamaño:</strong> {videoMetadata.size}</li>
                  </ul>
                ) : (
                  <p className="text-sm italic text-gray-500">No hay metadatos disponibles.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
