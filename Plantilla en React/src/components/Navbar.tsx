import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const {logout} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const onLogout = () => {
    Swal.fire({
      title: '¿Deseas cerrar sesión?',
      text: 'Si cierras sesión, perderás acceso a tu perfil',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  const toggleLogin = () => {
    const modal = document.getElementById("loginModal");
    if (modal) {
      modal.classList.toggle("hidden");
    }
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Si estamos en settings y el usuario hace clic en otro enlace, mostrar confirmación
    if (location.pathname === '/settings' && href !== '/settings') {
      e.preventDefault();
      
      Swal.fire({
        title: '¿Deseas abandonar la página?',
        text: 'Tienes cambios sin guardar. Si abandonas la página, tus cambios no serán efectivos.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, abandonar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Navegar a la página principal con el anchor correcto
          navigate('/');
          // Scroll al elemento después de un pequeño delay
          setTimeout(() => {
            const element = document.querySelector(href);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      });
    } else if (location.pathname === '/settings') {
      // Si estamos en settings y no hay confirmación, solo navegar
      e.preventDefault();
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-secondary">
              Bienestar Total
            </h1>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-secondary focus:outline-none"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#inicio"
                onClick={(e) => handleNavigation(e, '#inicio')}
                className="text-gray-700 hover:text-secondary px-3 py-2 text-sm font-medium"
              >
                Inicio
              </a>
              <a
                href="#servicios"
                onClick={(e) => handleNavigation(e, '#servicios')}
                className="text-gray-700 hover:text-secondary px-3 py-2 text-sm font-medium"
              >
                Servicios
              </a>
              <a
                href="#galeria"
                onClick={(e) => handleNavigation(e, '#galeria')}
                className="text-gray-700 hover:text-secondary px-3 py-2 text-sm font-medium"
              >
                Galería
              </a>
              <a
                href="#contacto"
                onClick={(e) => handleNavigation(e, '#contacto')}
                className="text-gray-700 hover:text-secondary px-3 py-2 text-sm font-medium"
              >
                Contacto
              </a>
              {!isAuthenticated ? (
                <button
                  onClick={toggleLogin}
                  className="bg-secondary text-quaternary px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Admin
                </button>
              ) : (
                <Link to={"/settings"} className="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium text-paragraph cursor-pointer" >
                  Settings
                </Link>
              )}
              { isAuthenticated && (
                <button className="bg-secondary hover:bg-secondary/75 text-quaternary px-4 py-2 rounded-md text-sm font-medium cursor-pointer text-paragraph" onClick={onLogout}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden bg-white border-t border-gray-200`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#inicio"
            onClick={(e) => handleNavigation(e, '#inicio')}
            className="block text-gray-700 hover:text-secondary px-3 py-2 text-base font-medium"
          >
            Inicio
          </a>
          <a
            href="#servicios"
            onClick={(e) => handleNavigation(e, '#servicios')}
            className="block text-gray-700 hover:text-secondary px-3 py-2 text-base font-medium"
          >
            Servicios
          </a>
          <a
            href="#galeria"
            onClick={(e) => handleNavigation(e, '#galeria')}
            className="block text-gray-700 hover:text-secondary px-3 py-2 text-base font-medium"
          >
            Galería
          </a>
          <a
            href="#contacto"
            onClick={(e) => handleNavigation(e, '#contacto')}
            className="block text-gray-700 hover:text-secondary px-3 py-2 text-base font-medium"
          >
            Contacto
          </a>
          { !isAuthenticated ? (
            <button
              onClick={toggleLogin}
              className="bg-secondary text-quaternary px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Admin
            </button>
          ) : (
            <Link to={"/settings"} className="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium text-paragraph cursor-pointer block" >
              Settings
            </Link>
          )}
          { isAuthenticated && (
            <button className="bg-secondary hover:bg-secondary/75 text-quaternary px-4 py-2 rounded-md text-sm font-medium cursor-pointer text-paragraph" onClick={onLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
