
import React, { useState, useEffect } from 'react';

const GalleryVideos = () => {
  const [currentSlideDesktop, setCurrentSlideDesktop] = useState(0);
  const [currentSlideMobile, setCurrentSlideMobile] = useState(0);
  const totalSlidesDesktop = 3;
  const totalSlidesMobile = 9;

  const images = [
    {
      src: "https://cdn.pixabay.com/video/2025/06/03/283533_large.mp4",
      title: "Recepción Moderna",
      description: "Área de bienvenida cómoda y acogedora",
      alt: "Recepción moderna"
    },
    {
      src: "https://cdn.pixabay.com/video/2025/04/29/275633_large.mp4",
      title: "Sala de Espera",
      description: "Espacios cómodos para nuestros pacientes",
      alt: "Sala de espera"
    },
    {
      src: "https://cdn.pixabay.com/video/2025/07/22/292716_large.mp4",
      title: "Consultorio Médico",
      description: "Equipamiento médico de última generación",
      alt: "Consultorio médico"
    },
    {
      src: "https://cdn.pixabay.com/video/2025/06/03/283533_large.mp4",
      title: "Recepción Moderna",
      description: "Área de bienvenida cómoda y acogedora",
      alt: "Recepción moderna"
    },
    {
      src: "https://cdn.pixabay.com/video/2025/04/29/275633_large.mp4",
      title: "Sala de Espera",
      description: "Espacios cómodos para nuestros pacientes",
      alt: "Sala de espera"
    },
    {
      src: "https://cdn.pixabay.com/video/2025/07/22/292716_large.mp4",
      title: "Consultorio Médico",
      description: "Equipamiento médico de última generación",
      alt: "Consultorio médico"
    },
    {
      src: "https://cdn.pixabay.com/video/2025/06/03/283533_large.mp4",
      title: "Recepción Moderna",
      description: "Área de bienvenida cómoda y acogedora",
      alt: "Recepción moderna"
    },
    {
      src: "https://cdn.pixabay.com/video/2025/04/29/275633_large.mp4",
      title: "Sala de Espera",
      description: "Espacios cómodos para nuestros pacientes",
      alt: "Sala de espera"
    },
    {
      src: "https://cdn.pixabay.com/video/2025/07/22/292716_large.mp4",
      title: "Consultorio Médico",
      description: "Equipamiento médico de última generación",
      alt: "Consultorio médico"
    },
    
  ];

  const nextSlideDesktop = () => {
    setCurrentSlideDesktop((prev) => (prev + 1) % totalSlidesDesktop);
  };

  const prevSlideDesktop = () => {
    setCurrentSlideDesktop((prev) => (prev - 1 + totalSlidesDesktop) % totalSlidesDesktop);
  };

  const goToSlideDesktop = (slideIndex: number) => {
    setCurrentSlideDesktop(slideIndex);
  };

  const nextSlideMobile = () => {
    setCurrentSlideMobile((prev) => (prev + 1) % totalSlidesMobile);
  };

  const prevSlideMobile = () => {
    setCurrentSlideMobile((prev) => (prev - 1 + totalSlidesMobile) % totalSlidesMobile);
  };

  // Auto-play
  useEffect(() => {
    const intervalDesktop = setInterval(nextSlideDesktop, 6000);
    const intervalMobile = setInterval(nextSlideMobile, 4000);

    return () => {
      clearInterval(intervalDesktop);
      clearInterval(intervalMobile);
    };
  }, []);

  const renderDesktopSlide = (slideIndex: number) => {
    const startIndex = slideIndex * 3;
    return (
      <div className="w-full flex-shrink-0 grid grid-cols-3 gap-4" key={slideIndex}>
        {images.slice(startIndex, startIndex + 3).map((image, index) => (
          <div key={index} className="aspect-w-16 aspect-h-12">
            <video 
              src={image.src}  
              className="w-full h-64 object-cover rounded-lg"
              muted 
              autoPlay
              loop
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="galeria" className="py-16 bg-primary font-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-subtitle md:text-title font-bold text-center text-secondary mb-12 font-secondary">Videitos UwU</h2>
        
        {/* Carrusel Desktop (3 en 3) */}
        <div className="hidden lg:block relative">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlideDesktop * 100}%)` }}
            >
              {Array.from({ length: totalSlidesDesktop }, (_, index) => renderDesktopSlide(index))}
            </div>
          </div>
          <button 
            onClick={prevSlideDesktop}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-quaternary/80 hover:bg-quaternary/100 rounded-full p-3 shadow-md focus:outline-none z-10 cursor-pointer"
          >
            <i className="fas fa-chevron-left text-secondary text-xl text-paragraph"></i>
          </button>
          <button 
            onClick={nextSlideDesktop}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-quaternary/80 hover:bg-quaternary/100 rounded-full p-3 shadow-md focus:outline-none z-10 cursor-pointer"
          >
            <i className="fas fa-chevron-right text-secondary text-xl text-paragraph"></i>
          </button>
          {/* Indicadores Desktop */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {Array.from({ length: totalSlidesDesktop }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlideDesktop(index)}
                className={`h-2 w-8 rounded-full transition-all ${
                  index === currentSlideDesktop 
                    ? 'bg-secondary' 
                    : 'bg-quaternary/60 hover:bg-quaternary/100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Carrusel Mobile/Tablet (1 en 1) */}
        <div className="lg:hidden relative">
          {/* Contador de slides para móvil */}
          <div className="absolute z-10 top-4 right-4 bg-quinary/50 text-quaternary px-3 py-1 rounded-full text-sm text-paragraph">
            <span>{currentSlideMobile + 1} / {totalSlidesMobile}</span>
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlideMobile * 100}%)` }}
            >
              {images.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <video 
                    src={image.src.replace('w=600&h=400', 'w=800&h=600')} 
                    className="w-full h-64 sm:h-80 object-cover rounded-lg"
                    muted
                    autoPlay
                    loop
                  />
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={prevSlideMobile}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-quaternary/80 hover:bg-quaternary/100 rounded-full p-3 shadow-md focus:outline-none z-10 cursor-pointer"
          >
            <i className="fas fa-chevron-left text-secondary text-xl text-paragraph"></i>
          </button>
          <button 
            onClick={nextSlideMobile}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-quaternary/80 hover:bg-quaternary/100 rounded-full p-3 shadow-md focus:outline-none z-10 cursor-pointer"
          >
            <i className="fas fa-chevron-right text-secondary text-xl text-paragraph"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default GalleryVideos;
