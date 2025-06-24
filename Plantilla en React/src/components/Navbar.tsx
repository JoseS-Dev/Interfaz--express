import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const {logout} = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const onLogout = () => {
    logout();
  };

  const toggleLogin = () => {
    const modal = document.getElementById("loginModal");
    if (modal) {
      modal.classList.toggle("hidden");
    }
  };

  return (
    <nav className="bg-quaternary shadow-sm sticky top-0 z-50 font-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
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
              >
                Inicio
              </a>
              <a
                href="#servicios"
                className="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium scroll-smooth text-paragraph"
              >
                Servicios
              </a>
              <a
                href="#galeria"
                className="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium scroll-smooth text-paragraph"
              >
                Galería
              </a>
              <a
                href="#contacto"
                className="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium scroll-smooth text-paragraph"
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
                <Link to={"/admin"} className="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium text-paragraph cursor-pointer" >
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
        } md:hidden bg-quaternary`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#inicio"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-quinary hover:text-secondary px-3 py-2 text-base font-medium text-paragraph"
          >
            Inicio
          </a>
          <a
            href="#servicios"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-quinary hover:text-secondary px-3 py-2 text-base font-medium text-paragraph"
          >
            Servicios
          </a>
          <a
            href="#galeria"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-quinary hover:text-secondary px-3 py-2 text-base font-medium text-paragraph"
          >
            Galería
          </a>
          <a
            href="#contacto"
            onClick={() => setIsMobileMenuOpen(false)}
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
            <Link to={"/admin"} className="block text-quinary hover:text-secondary px-3 py-2 text-base font-medium text-paragraph" >
              Settings
            </Link>
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
