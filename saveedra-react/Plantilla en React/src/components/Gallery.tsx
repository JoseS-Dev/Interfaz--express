
import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [currentSlideDesktop, setCurrentSlideDesktop] = useState(0);
  const [currentSlideMobile, setCurrentSlideMobile] = useState(0);
  const totalSlidesDesktop = 3;
  const totalSlidesMobile = 9;

  const images = [
    {
      src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Recepción Moderna",
      description: "Área de bienvenida cómoda y acogedora",
      alt: "Recepción moderna"
    },
    {
      src: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Sala de Espera",
      description: "Espacios cómodos para nuestros pacientes",
      alt: "Sala de espera"
    },
    {
      src: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Consultorio Médico",
      description: "Equipamiento médico de última generación",
      alt: "Consultorio médico"
    },
    {
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Laboratorio",
      description: "Análisis clínicos con tecnología avanzada",
      alt: "Laboratorio"
    },
    {
      src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Sala de Rehabilitación",
      description: "Terapia física y rehabilitación integral",
      alt: "Sala de rehabilitación"
    },
    {
      src: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Área de Nutrición",
      description: "Consultas nutricionales personalizadas",
      alt: "Área de nutrición"
    },
    {
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Quirófano",
      description: "Cirugías con los más altos estándares",
      alt: "Quirófano"
    },
    {
      src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Farmacia",
      description: "Medicamentos y productos de salud",
      alt: "Farmacia"
    },
    {
      src: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
      title: "Jardín Terapéutico",
      description: "Espacios verdes para la recuperación",
      alt: "Jardín terapéutico"
    }
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
      <div className="w-full flex-shrink-0 grid grid-cols-3 gap-4">
        {images.slice(startIndex, startIndex + 3).map((image, index) => (
          <div key={index} className="aspect-w-16 aspect-h-12">
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="galeria" className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-secondary mb-12">Nuestras Instalaciones</h2>
        
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
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-md focus:outline-none z-10"
          >
            <i className="fas fa-chevron-left text-secondary text-xl"></i>
          </button>
          <button 
            onClick={nextSlideDesktop}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-md focus:outline-none z-10"
          >
            <i className="fas fa-chevron-right text-secondary text-xl"></i>
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
                    : 'bg-white bg-opacity-60 hover:bg-opacity-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Carrusel Mobile/Tablet (1 en 1) */}
        <div className="lg:hidden relative">
          {/* Contador de slides para móvil */}
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm z-10">
            <span>{currentSlideMobile + 1} / {totalSlidesMobile}</span>
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlideMobile * 100}%)` }}
            >
              {images.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img 
                    src={image.src.replace('w=600&h=400', 'w=800&h=600')} 
                    alt={image.alt} 
                    className="w-full h-64 sm:h-80 object-cover rounded-lg"
                  />
                  <div className="text-center mt-4">
                    <h3 className="text-lg font-semibold text-secondary">{image.title}</h3>
                    <p className="text-gray-600 text-sm">{image.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={prevSlideMobile}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-md focus:outline-none z-10"
          >
            <i className="fas fa-chevron-left text-secondary text-xl"></i>
          </button>
          <button 
            onClick={nextSlideMobile}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-md focus:outline-none z-10"
          >
            <i className="fas fa-chevron-right text-secondary text-xl"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
