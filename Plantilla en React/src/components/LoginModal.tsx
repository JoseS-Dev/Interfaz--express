
import React from 'react';

const LoginModal = () => {
  const toggleLogin = () => {
    const modal = document.getElementById('loginModal');
    if (modal) {
      modal.classList.toggle('hidden');
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleLogin();
    }
  };

  return (
    <div 
      id="loginModal" 
      className="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleModalClick}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-secondary">Acceso Administrador</h2>
          <button onClick={toggleLogin} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Usuario</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary"
            />
          </div>
          <div className="flex justify-between">
            <button 
              type="button" 
              onClick={toggleLogin} 
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
