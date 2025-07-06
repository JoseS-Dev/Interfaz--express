const Hero = () => {
  return (
    <section 
      id="inicio" 
      className="relative bg-cover bg-center font-primary" 
      style={{
        backgroundImage: "url('/src/assets/img/banner-image.webp')",
      }}
    >
      <div className="absolute inset-0 bg-secondary/50"></div>
      <div className="relative z-10 flex items-center justify-center min-h-[500px] md:min-h-[600px] px-4">
        <div className="text-center text-quaternary">
          <h1 className="text-3xl text-subtitle md:text-title font-bold mb-4 font-secondary">
            Tu Bienestar es Nuestra Prioridad
          </h1>
          <p className="text-lg text-paragraph md:text-subtitle max-w-3xl mx-auto">
            Servicios de salud integral para toda la familia
          </p>
          <button className="mt-8 bg-tertiary text-quaternary font-medium py-3 px-6 rounded-md transition-colors cursor-pointer text-paragraph">
            Agendar Cita
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
