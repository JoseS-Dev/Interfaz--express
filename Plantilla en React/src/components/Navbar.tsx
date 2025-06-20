import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLogin = () => {
    const modal = document.getElementById("loginModal");
    if (modal) {
      modal.classList.toggle("hidden");
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
                className="text-gray-700 hover:text-secondary px-3 py-2 text-sm font-medium"
              >
                Inicio
              </a>
              <a
                href="#servicios"
                className="text-gray-700 hover:text-secondary px-3 py-2 text-sm font-medium"
              >
                Servicios
              </a>
              <a
                href="#galeria"
                className="text-gray-700 hover:text-secondary px-3 py-2 text-sm font-medium"
              >
                Galería
              </a>
              <a
                href="#contacto"
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
                <a className="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium text-paragraph cursor-pointer" >
                  Settings
                </a>
              )}
              { isAuthenticated && (
                <button className="bg-secondary hover:bg-secondary/75 text-quaternary px-4 py-2 rounded-md text-sm font-medium cursor-pointer text-paragraph">
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
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-secondary px-3 py-2 text-base font-medium"
          >
            Inicio
          </a>
          <a
            href="#servicios"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-secondary px-3 py-2 text-base font-medium"
          >
            Servicios
          </a>
          <a
            href="#galeria"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-secondary px-3 py-2 text-base font-medium"
          >
            Galería
          </a>
          <a
            href="#contacto"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-secondary px-3 py-2 text-base font-medium"
          >
            Contacto
          </a>
          <button
            onClick={toggleLogin}
            className="w-full text-left bg-secondary text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
          >
            Admin
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
