import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import AdminColors from "./Pages/AdminColors";
import AdminFonts from "./Pages/AdminFonts";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import AdminUsers from "./Pages/AdminUsers";
import PrivateRouteUser from "./components/PrivateRouteUser";
import Settings from "./Pages/Settings";
import { axiosInstance } from "./context/axiosInstances";
import { useEffect } from "react";
import AdminImages from "./Pages/AdminImages";
import AdminVideos from "./Pages/AdminVideos";

const loadFont = (nameFont: string) => {
  return new Promise((resolve) => {
    // Sanear el nombre: eliminar extensión y caracteres no permitidos
    const sanitizedFontName = nameFont
      .replace(/\.[^/.]+$/, "") // Elimina extensión
      .replace(/[^a-zA-Z0-9\-]/g, "-"); // Reemplaza caracteres inválidos

    const fontName = `Custom-${sanitizedFontName}-${Date.now()}`;

    // Agregar comillas simples a la URL
    const url = `url('${import.meta.env.VITE_BACKEND_URL}/font/${nameFont}')`;

    const fontFace = new FontFace(fontName, url, {
      style: "normal",
      weight: "100 900",
      display: "swap",
    });

    fontFace
      .load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);
        resolve(fontName);
      })
      .catch((error) => {
        console.error("Error al cargar la fuente:", error);
        // Fallback a fuente segura
        resolve("Arial");
      });
  });
};

const loadStyles = async () => {
  try {
    /* Obtener colores */
    const response = await axiosInstance.get("/Colors/selected");
    if (response.status !== 200)
      throw new Error(`Error de API: ${response.status}`);
    const selectedColor = response.data.data;
    if (!selectedColor) throw new Error("No se encontraron colores");
    const root = document.documentElement;
    root.style.setProperty(
      "--color-primary",
      `#${selectedColor.primary_color}`
    );
    root.style.setProperty(
      "--color-secondary",
      `#${selectedColor.secondary_color}`
    );
    root.style.setProperty(
      "--color-tertiary",
      `#${selectedColor.ternary_color}`
    );
    root.style.setProperty(
      "--color-quaternary",
      `#${selectedColor.cuarternary_color}`
    );
    root.style.setProperty(
      "--color-quinary",
      `#${selectedColor.neutral_color}`
    );

    /* Obtener fuentes */
    const otherResponse = await axiosInstance.get("/Tipography/selected");
    if (otherResponse.status !== 200)
      throw new Error(`Error de API: ${otherResponse.status}`);
    const selectedFont = otherResponse.data.data;
    if (!selectedFont)
      throw new Error("No se encontro una fuente seleccionada");
    const primaryFont = await loadFont(selectedFont.name_tipography_main);
    const secondaryFont = await loadFont(
      selectedFont.name_tipography_secondary
    );

    root.style.setProperty("--font-primary", `'${primaryFont}'`);
    root.style.setProperty("--font-secondary", `'${secondaryFont}'`);
    root.style.setProperty("--text-title", `${selectedFont.tam_title}px`);
    root.style.setProperty("--text-subtitle", `${selectedFont.tam_subtitle}px`);
    root.style.setProperty(
      "--text-paragraph",
      `${selectedFont.tam_paragraph}px`
    );

    console.log("Fuentes Cargadas Correctamente");
  } catch (err) {
    const error = err.message;
    console.error("Error al cargar los estilos seleccionados:", error);
  }
};
function App() {
  useEffect(() => {
    loadStyles();
  });
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRouteAdmin />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/colors" element={<AdminColors />} />
          <Route path="/admin/fonts" element={<AdminFonts />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/images" element={<AdminImages />} />
          <Route path="/admin/videos" element={<AdminVideos />} />
        </Route>
        <Route element={<PrivateRouteUser />}>
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
