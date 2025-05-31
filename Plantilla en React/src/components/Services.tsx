
import React from 'react';

const Services = () => {
  const services = [
    {
      title: "Consulta Médica",
      description: "Atención médica personalizada con profesionales especializados",
      image: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80"
    },
    {
      title: "Terapia Física",
      description: "Rehabilitación y tratamiento para mejorar tu movilidad",
      image: "https://images.unsplash.com/photo-1576858574144-9ae1ebcf5ae5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80"
    },
    {
      title: "Nutrición",
      description: "Planes alimenticios personalizados para tu bienestar",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80"
    }
  ];

  return (
    <section id="servicios" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-secondary mb-12">Nuestros Servicios</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
