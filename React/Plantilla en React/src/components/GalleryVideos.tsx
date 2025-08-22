import React, { useState, useEffect } from 'react';
import { CardVideos } from './CardVideos'; // Asegúrate de que la ruta sea correcta
import { PreviewData } from '../types/video'; // Asegúrate de que la ruta y el tipo existan

// --- Tipos para la respuesta de la API (sin cambios) ---
interface ApiVideoData {
  id_video: number;
  name_video: string;
  format_video: string;
  duration_video: number;
  size_video: number;
  name_audio_main?: string;
  name_audio_secondary?: string;
  subtitle_main_video?: string;
  subtitle_secondary_video?: string;
}

// --- Funciones Auxiliares (sin cambios) ---
const formatDuration = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const formatSize = (bytes: number): string => {
  if (isNaN(bytes) || bytes === 0) return "0 KB";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const GalleryVideos = () => {
  // --- Estado para datos y carga ---
  const [videos, setVideos] = useState<PreviewData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // --- Estado para la lógica del carrusel ---
  const [currentSlideDesktop, setCurrentSlideDesktop] = useState(0);
  const [currentSlideMobile, setCurrentSlideMobile] = useState(0);

  // Los totales ahora se calculan dinámicamente
  const totalSlidesMobile = videos.length;
  const totalSlidesDesktop = Math.ceil(videos.length / 3);

  // --- Lógica de obtención de datos ---
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:3500/videos/selected');
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const apiResponse = await response.json();

        if (apiResponse.data && Array.isArray(apiResponse.data)) {
          const baseUrl = "http://localhost:3500";
          const transformedData: PreviewData[] = apiResponse.data.map((video: ApiVideoData) => ({
            videoUrl: `${baseUrl}/video/${video.name_video}`,
            primaryAudioUrl: video.name_audio_main ? `${baseUrl}/audio/${video.name_audio_main}` : undefined,
            secondaryAudioUrl: video.name_audio_secondary ? `${baseUrl}/audio/${video.name_audio_secondary}` : undefined,
            primarySubtitleUrl: video.subtitle_main_video ? `${baseUrl}/subtitle/${video.subtitle_main_video}` : undefined,
            secondarySubtitleUrl: video.subtitle_secondary_video ? `${baseUrl}/subtitle/${video.subtitle_secondary_video}` : undefined,
            videoMetadata: {
              fileName: video.name_video,
              fileFormat: video.format_video,
              duration: formatDuration(video.duration_video),
              size: formatSize(video.size_video),
            }
          }));
          setVideos(transformedData);
        } else {
          setVideos([]);
        }
      } catch (err: any) {
        setError("No se pudieron cargar los videos. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // --- Funciones de control del carrusel ---
  const nextSlideDesktop = () => setCurrentSlideDesktop((prev) => (prev + 1) % totalSlidesDesktop);
  const prevSlideDesktop = () => setCurrentSlideDesktop((prev) => (prev - 1 + totalSlidesDesktop) % totalSlidesDesktop);
  const goToSlideDesktop = (slideIndex: number) => setCurrentSlideDesktop(slideIndex);

  const nextSlideMobile = () => setCurrentSlideMobile((prev) => (prev + 1) % totalSlidesMobile);
  const prevSlideMobile = () => setCurrentSlideMobile((prev) => (prev - 1 + totalSlidesMobile) % totalSlidesMobile);

  // --- Efecto para el auto-play del carrusel ---
  useEffect(() => {
    // Solo inicia los intervalos si hay slides que mostrar
    if (totalSlidesDesktop > 0 && totalSlidesMobile > 0) {
      const intervalDesktop = setInterval(nextSlideDesktop, 6000);
      const intervalMobile = setInterval(nextSlideMobile, 4000);

      return () => {
        clearInterval(intervalDesktop);
        clearInterval(intervalMobile);
      };
    }
  }, [totalSlidesDesktop, totalSlidesMobile]); // Se re-ejecuta si los totales cambian

  // --- Funciones de Renderizado ---
  const renderDesktopSlide = (slideIndex: number) => {
    const startIndex = slideIndex * 3;
    const itemsForSlide = videos.slice(startIndex, startIndex + 3);
    return (
      <div className="grid flex-shrink-0 w-full grid-cols-3 gap-4" key={slideIndex}>
        {itemsForSlide.map((videoData, index) => (
          // Usamos CardVideos en lugar del <video> simple
          <CardVideos key={`${slideIndex}-${index}`} previewData={videoData} />
        ))}
      </div>
    );
  };

  const renderContent = () => {
    if (loading) return <p className="text-xl text-center text-secondary">Cargando videos...</p>;
    if (error) return <p className="p-4 text-center text-red-500 bg-red-100 rounded-lg">{error}</p>;
    if (videos.length === 0) return <p className="text-xl text-center text-quaternary">No hay videos seleccionados para mostrar.</p>;

    return (
      <>
        {/* Carrusel Desktop (3 en 3) */}
        <div className="relative hidden lg:block">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlideDesktop * 100}%)` }}
            >
              {Array.from({ length: totalSlidesDesktop }, (_, index) => renderDesktopSlide(index))}
            </div>
          </div>
          <button onClick={prevSlideDesktop} className="absolute z-10 p-3 transform -translate-y-1/2 rounded-full shadow-md cursor-pointer left-4 top-1/2 bg-quaternary/80 hover:bg-quaternary/100 focus:outline-none">
            <i className="text-xl fas fa-chevron-left text-secondary text-paragraph"></i>
          </button>
          <button onClick={nextSlideDesktop} className="absolute z-10 p-3 transform -translate-y-1/2 rounded-full shadow-md cursor-pointer right-4 top-1/2 bg-quaternary/80 hover:bg-quaternary/100 focus:outline-none">
            <i className="text-xl fas fa-chevron-right text-secondary text-paragraph"></i>
          </button>
          <div className="absolute left-0 right-0 flex justify-center space-x-2 bottom-4">
            {Array.from({ length: totalSlidesDesktop }, (_, index) => (
              <button key={index} onClick={() => goToSlideDesktop(index)} className={`h-2 w-8 rounded-full transition-all ${index === currentSlideDesktop ? 'bg-secondary' : 'bg-quaternary/60 hover:bg-quaternary/100'}`} />
            ))}
          </div>
        </div>

        {/* Carrusel Mobile/Tablet (1 en 1) */}
        <div className="relative lg:hidden">
          <div className="absolute z-10 px-3 py-1 text-sm rounded-full top-4 right-4 bg-quinary/50 text-quaternary text-paragraph">
            <span>{currentSlideMobile + 1} / {totalSlidesMobile}</span>
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlideMobile * 100}%)` }}>
              {videos.map((videoData, index) => (
                <div key={index} className="flex-shrink-0 w-full">
                  <CardVideos previewData={videoData} />
                </div>
              ))}
            </div>
          </div>
          <button onClick={prevSlideMobile} className="absolute z-10 p-3 transform -translate-y-1/2 rounded-full shadow-md cursor-pointer left-4 top-1/2 bg-quaternary/80 hover:bg-quaternary/100 focus:outline-none">
            <i className="text-xl fas fa-chevron-left text-secondary text-paragraph"></i>
          </button>
          <button onClick={nextSlideMobile} className="absolute z-10 p-3 transform -translate-y-1/2 rounded-full shadow-md cursor-pointer right-4 top-1/2 bg-quaternary/80 hover:bg-quaternary/100 focus:outline-none">
            <i className="text-xl fas fa-chevron-right text-secondary text-paragraph"></i>
          </button>
        </div>
      </>
    );
  };

  return (
    <section id="galeria" className="py-16 bg-primary font-primary">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className="mb-12 text-3xl font-bold text-center text-subtitle md:text-title text-secondary font-secondary">
          Galería de Videos
        </h2>
        {renderContent()}
      </div>
    </section>
  );
};

export default GalleryVideos;