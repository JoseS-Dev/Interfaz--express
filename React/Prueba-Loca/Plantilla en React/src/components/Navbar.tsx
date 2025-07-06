import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from "../assets/icons/logo";
import Swal from 'sweetalert2';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const {logout} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Función para obtener variables CSS
  const getCssVar = (name: string) => {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const onLogout = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Vas a cerrar tu sesión.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: getCssVar("--color-tertiary"),
      cancelButtonColor: getCssVar("--color-quinary"),
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
      background: getCssVar("--color-primary"),
      color: getCssVar("--color-secondary"),
      customClass: {
        popup: "rounded-xl",
        confirmButton: "font-bold",
        cancelButton: "font-bold",
        title: "font-bold",
        htmlContainer: "font-primary",
      },
    });

    if (result.isConfirmed) {
      logout();
      Swal.fire({
        icon: "success",
        title: "Sesión cerrada",
        background: getCssVar("--color-primary"),
        color: getCssVar("--color-secondary"),
        showConfirmButton: false,
        timer: 1200,
        customClass: {
          popup: "rounded-xl",
          title: "font-bold",
          htmlContainer: "font-primary",
        },
      });
      navigate("/");
    }
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
    <nav className="bg-quaternary sticky top-0 z-50 font-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-1">
            <Logo/>
            <h1 className="text-xl font-bold text-secondary text-subtitle">
              Bienestar Total
            </h1>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-quinary hover:text-secondary focus:outline-none cursor-pointer"
            >
              <i className="fas fa-bars text-xl text-subtitle"></i>
            </button>
          </div>
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#inicio"
                className="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium scroll-smooth text-paragraph"
                onClick={(e) => handleNavigation(e, '#inicio')}
              >
                Inicio
              </a>
              <a
                href="#servicios"
                className="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium scroll-smooth text-paragraph"
                onClick={(e) => handleNavigation(e, '#servicios')}
              >
                Servicios
              </a>
              <a
                href="#galeria"
                className="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium scroll-smooth text-paragraph"
                onClick={(e) => handleNavigation(e, '#galeria')}
              >
                Galería
              </a>
              <a
                href="#contacto"
                className="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium scroll-smooth text-paragraph"
                onClick={(e) => handleNavigation(e, '#contacto')}
              >
                Contacto
              </a>
              {!isAuthenticated ? (
                <button
                  onClick={toggleLogin}
                  className="bg-secondary text-quaternary px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary/75 cursor-pointer text-paragraph"
                >
                  Admin
                </button>
              ) : (
                <>
                  {user ? (
                    user.role_user === 'admin' ? (
                      <Link to={"/admin"} className="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium text-paragraph cursor-pointer">
                        Admin
                      </Link>
                    ) : (
                      <Link to={"/settings"} className="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium text-paragraph cursor-pointer">
                        Settings
                      </Link>
                    )
                  ) : (
                    <Link to={"/login"} className="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium text-paragraph cursor-pointer">
                      Login
                    </Link>
                  )}
                </> 
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
        } md:hidden bg-quaternary`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#inicio"
            onClick={(e) => {
              setIsMobileMenuOpen(false);
              handleNavigation(e, '#inicio');
            }}
            className="block text-quinary hover:text-secondary px-3 py-2 text-base font-medium text-paragraph"
          >
            Inicio
          </a>
          <a
            href="#servicios"
            onClick={(e) => {
              setIsMobileMenuOpen(false);
              handleNavigation(e, '#servicios');
            }}
            className="block text-quinary hover:text-secondary px-3 py-2 text-base font-medium text-paragraph"
          >
            Servicios
          </a>
          <a
            href="#galeria"
            onClick={(e) => {
              setIsMobileMenuOpen(false);
              handleNavigation(e, '#galeria');
            }}
            className="block text-quinary hover:text-secondary px-3 py-2 text-base font-medium text-paragraph"
          >
            Galería
          </a>
          <a
            href="#contacto"
            onClick={(e) => {
              setIsMobileMenuOpen(false);
              handleNavigation(e, '#contacto');
            }}
            className="block text-quinary hover:text-secondary px-3 py-2 text-base font-medium text-paragraph"
          >
            Contacto
          </a>
          { !isAuthenticated ? (
            <button
              onClick={toggleLogin}
              className="w-full text-left bg-secondary text-quaternary px-3 py-2 rounded-md text-base font-medium hover:bg-secondary/75 cursor-pointer text-paragraph"
            >
              Admin
            </button>
          ) : (
            <>
                  {user ? (
                    user.role_user === 'admin' ? (
                      <Link to={"/admin"} className="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium text-paragraph cursor-pointer">
                        Admin
                      </Link>
                    ) : (
                      <Link to={"/settings"} className="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium text-paragraph cursor-pointer">
                        Settings
                      </Link>
                    )
                  ) : (
                    <Link to={"/login"} className="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium text-paragraph cursor-pointer">
                      Login
                    </Link>
                  )}
              </> 
          )}
          { isAuthenticated && (
            <button className="w-full text-left bg-secondary text-quaternary px-3 py-2 rounded-md text-base font-medium hover:bg-secondary/75 cursor-pointer text-paragraph" onClick={onLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
