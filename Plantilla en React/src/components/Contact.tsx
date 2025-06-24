
import React from 'react';

const Contact = () => {
  return (
    <section id="contacto" className="py-16 bg-quaternary scroll-smooth font-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-subtitle md:text-title font-bold text-center text-secondary mb-12 font-secondary">Contáctanos</h2>
        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-quinary mb-2 text-paragraph">Nombre</label>
                <input 
                  type="text" 
                  className="bg-primary/50 w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary text-quinary text-paragraph"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-quinary mb-2 text-paragraph">Teléfono</label>
                <input 
                  type="tel" 
                  className="bg-primary/50 w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary text-quinary text-paragraph"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-quinary mb-2 text-paragraph">Email</label>
              <input 
                type="email" 
                className="bg-primary/50 w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary text-quinary text-paragraph"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-quinary mb-2 text-paragraph">Mensaje</label>
              <textarea 
                rows={4} 
                className="bg-primary/50 w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary text-quinary text-paragraph"
              ></textarea>
            </div>
            <div className="text-center">
              <button 
                type="submit" 
                className="bg-tertiary text-quaternary px-8 py-3 rounded-md font-medium hover:bg-tertiary/75 transition-colors cursor-pointer text-paragraph"
              >
                Enviar Mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
