const getNameFont = (font) => {
  const partes = ruta.split("\\"); // Separar por el carácter de backslash (Windows)
  return partes[partes.length - 1]; // Obtener el último elemento
};

export default getNameFont;