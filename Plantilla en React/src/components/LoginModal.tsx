/// <reference types="vite/client" />

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
const LoginModal = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(Boolean);
  const { login } = useAuth();

  const onCorreoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorreo(event.target.value);
    setError(false);
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setError(false);
  };
  const toggleLogin = () => {
    const modal = document.getElementById("loginModal");
    if (modal) {
      modal.classList.toggle("hidden");
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleLogin();
    }
  };

  const onLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/Users/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_user: correo,
            password_user: password,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        login(data.user, data.token);
      } else {
        console.error("Login failed:", data.message);
        setError(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(true);
    }
  };
  return (
    <div
      id="loginModal"
      className="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={handleModalClick}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-secondary">
            Acceso Administrador
          </h2>
          <button
            onClick={toggleLogin}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Correo
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary"
              value={correo}
              onChange={onCorreoChange}
              placeholder="Ingrese su correo"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary"
              value={password}
              onChange={onPasswordChange}
              placeholder="Ingrese su contraseña"
            />
          </div>
          <div className="flex justify-between flex-wrap">
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
              onClick={onLogin}
            >
              Ingresar
            </button>
            {error && (
              <span className="text-quinary text-paragraph pt-1 block w-full text-center mt-0.5">
                Credenciales invalidas
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
