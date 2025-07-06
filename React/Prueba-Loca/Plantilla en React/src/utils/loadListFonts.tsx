import { axiosInstance } from "../context/axiosInstances";

const loadListFonts = async (): Promise<object> => {
  const objFonts = {};
  const response = await axiosInstance.get("/Tipography");
  if (response.status !== 200) throw new Error(`Error de API: ${response.status}`);
  const dataFonts = response.data.data;

  for (let i = 0; i < dataFonts.length; i++) {
    const font = dataFonts[i];
    const fontName1 = `Custom-${font.name_tipography_main
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9\-]/g, "-")}-${Date.now()}`;
    const fontName2 = `Custom-${font.name_tipography_secondary
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9\-]/g, "-")}-${Date.now()}`;

    const url1 = `url('${import.meta.env.VITE_BACKEND_URL}/font/${
      font.name_tipography_main
    }')`;
    const url2 = `url('${import.meta.env.VITE_BACKEND_URL}/font/${
      font.name_tipography_secondary
    }')`;
    const fontFace1 = new FontFace(fontName1, url1, {
      style: "normal",
      weight: "100 900",
      display: "swap",
    });
    const fontFace2 = new FontFace(fontName2, url2, {
      style: "normal",
      weight: "100 900",
      display: "swap",
    });
    fontFace1
      .load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);
      })
      .catch((error) => {
        console.error("Error al cargar la fuente:", error);
      });

    fontFace2
      .load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);
      })
      .catch((error) => {
        console.error("Error al cargar la fuente:", error);
      });
    const fonts = {
      primaryFont: fontName1,
      secondaryFont: fontName2,
    };

    objFonts[dataFonts[i].id_tipography] = fonts;
  }
  return objFonts;
};

export default loadListFonts;
