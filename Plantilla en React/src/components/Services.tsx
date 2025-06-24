const Services = () => {
  const services = [
    {
      title: "Consulta Médica",
      description: "Atención médica personalizada con profesionales especializados",
      image: "/src/assets/img/img1.avif"
    },
    {
      title: "Terapia Física",
      description: "Rehabilitación y tratamiento para mejorar tu movilidad",
      image: "/src/assets/img/img2.avif"
    },
    {
      title: "Nutrición",
      description: "Planes alimenticios personalizados para tu bienestar",
      image: "/src/assets/img/img3.avif"
    }
  ];

  return (
    <section id="servicios" className="py-16 bg-quartinary font-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-subtitle md:text-title font-bold text-center text-secondary mb-12 font-secondary">Nuestros Servicios</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.title} className="text-center font-primary">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl text-paragraph md:text-subtitle font-semibold text-secondary mb-2">{service.title}</h3>
              <p className="text-quinary text-paragraph">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
