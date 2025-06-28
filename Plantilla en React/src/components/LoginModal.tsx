/// <reference types="vite/client" />

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Asume que esta ruta es correcta.

const LoginModal = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const { login } = useAuth(); // Obtener la función login del contexto de autenticación

  const onCorreoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorreo(event.target.value);
    setError(false);
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setError(false);
  };
  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setError(false);
  };
  const onConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    setError(false);
  };

  const toggleLogin = () => {
    const modal = document.getElementById("loginModal");
    if (modal) {
      modal.classList.toggle("hidden");
      // Reiniciar estados al cerrar/abrir el modal para evitar datos residuales
      setCorreo("");
      setPassword("");
      setUsername("");
      setConfirmPassword("");
      setError(false);
      setIsRegistering(false); // Asegurarse de que siempre inicie en modo login
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleLogin();
    }
  };

  const onLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(false);

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
        toggleLogin(); // Cerrar modal al iniciar sesión exitosamente
      } else {
        console.error("Login failed:", data.message);
        setError(true);
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError(true);
    }
  };

  const onRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(false);

    if (password !== confirmPassword) {
      setError(true);
      console.error("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/Users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email_user: correo,
            password_user: password,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Registro exitoso:", data.message || "Usuario registrado con éxito.");
        // **NUEVO: Llama a la función login del AuthContext**
        login(data.user, data.token); // Asume que 'data' contiene 'user' y 'token'
        toggleLogin(); // Cierra el modal después de registrarse y loguearse automáticamente
      } else {
        console.error("Registro fallido:", data.message || "Error desconocido al registrar.");
        setError(true);
      }
    } catch (err) {
      console.error("Error durante el registro:", err);
      setError(true);
    }
  };

  return (
    <div
      id="loginModal"
      className="hidden fixed inset-0 bg-quinary/75 z-50 flex items-center justify-center font-primary"
      onClick={handleModalClick}
    >
      <div className="bg-quaternary p-8 rounded-lg shadow-lg w-11/12 max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-secondary text-subtitle">
            {isRegistering ? "Registro de Usuario" : "Acceso Administrador"}
          </h2>
          <button
            onClick={toggleLogin}
            className="text-quinary/50 hover:text-quinary cursor-pointer"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form onSubmit={isRegistering ? onRegister : onLogin}>
          {isRegistering && (
            <div className="mb-4">
              <label className="block text-quinary text-sm font-bold mb-2 text-paragraph" htmlFor="username">
                Nombre de Usuario
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary bg-primary/50"
                value={username}
                onChange={onUsernameChange}
                placeholder="Ingrese su nombre de usuario"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-quinary text-sm font-bold mb-2 text-paragraph" htmlFor="email">
              Correo
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary bg-primary/50"
              value={correo}
              onChange={onCorreoChange}
              placeholder="Ingrese su correo"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-quinary text-sm font-bold mb-2 text-paragraph" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary bg-primary/50"
              value={password}
              onChange={onPasswordChange}
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          {isRegistering && (
            <div className="mb-6">
              <label className="block text-quinary text-sm font-bold mb-2 text-paragraph" htmlFor="confirmPassword">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary bg-primary/50"
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
                placeholder="Confirme su contraseña"
                required
              />
            </div>
          )}

          <div className="flex justify-between flex-wrap items-center">
            <button
              type="button"
              onClick={toggleLogin}
              className="bg-quinary/75 text-quaternary px-4 py-2 rounded-md hover:bg-quinary mb-2 sm:mb-0"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary/85 mb-2 sm:mb-0"
            >
              {isRegistering ? "Registrarse" : "Ingresar"}
            </button>
            {error && (
              <span className="text-quinary text-paragraph pt-1 block w-full text-center mt-0.5">
                {isRegistering ? "Error en el registro. Las contraseñas pueden no coincidir o el usuario/correo ya existe." : "Credenciales inválidas"}
              </span>
            )}
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-quinary text-paragraph">
              {isRegistering ? (
                <>
                  ¿Ya tienes cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegistering(false);
                      setError(false);
                      setUsername("");
                      setConfirmPassword("");
                      setPassword("");
                      setCorreo(""); // Limpiar correo también
                    }}
                    className="text-secondary hover:underline font-bold focus:outline-none"
                  >
                    Iniciar Sesión
                  </button>
                </>
              ) : (
                <>
                  ¿Sin cuenta?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegistering(true);
                      setError(false);
                      setCorreo("");
                      setPassword("");
                    }}
                    className="text-secondary hover:underline font-bold focus:outline-none"
                  >
                    Registrarse aquí
                  </button>
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;