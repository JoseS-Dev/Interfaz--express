
import React from 'react';

const Hero = () => {
  return (
    <section 
      id="inicio" 
      className="relative bg-cover bg-center" 
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')"
      }}
    >
      <div className="absolute inset-0 bg-secondary bg-opacity-50"></div>
      <div className="relative z-10 flex items-center justify-center min-h-[500px] md:min-h-[600px] px-4">
        <div className="text-center text-white">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            Tu Bienestar es Nuestra Prioridad
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto">
            Servicios de salud integral para toda la familia
          </p>
          <button className="mt-8 bg-accent hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-md transition-colors">
            Agendar Cita
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
