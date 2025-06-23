
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Bienestar Total</h3>
            <p className="text-blue-200">Tu salud y bienestar son nuestra prioridad. Ofrecemos servicios médicos de calidad.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <p className="text-blue-200"><i className="fas fa-map-marker-alt mr-2"></i> Av. Principal 123, Ciudad</p>
            <p className="text-blue-200"><i className="fas fa-phone mr-2"></i> (555) 123-4567</p>
            <p className="text-blue-200"><i className="fas fa-envelope mr-2"></i> info@bienestartotal.com</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Horarios</h3>
            <p className="text-blue-200">Lunes - Viernes: 8:00 - 18:00</p>
            <p className="text-blue-200">Sábados: 9:00 - 14:00</p>
            <p className="text-blue-200">Domingos: Cerrado</p>
          </div>
        </div>
        <div className="border-t border-blue-400 mt-8 pt-8 text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <a href="#" className="text-white hover:text-blue-200"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-white hover:text-blue-200"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-white hover:text-blue-200"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-white hover:text-blue-200"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <p className="text-blue-200">&copy; 2024 Bienestar Total. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
