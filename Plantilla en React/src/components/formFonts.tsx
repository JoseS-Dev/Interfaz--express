import { useState } from "react";
import { axiosInstance } from "../context/axiosInstances";
import { confirmAction, successAlert } from "../utils/swalHelper";

const FormFonts = ({ onRefreshListFonts, onRefreshFontsPreview }) => {
  const [primaryInputFont, setPrimaryInputFont] = useState("");
  const [secondaryInputFont, setSecondaryInputFont] = useState("");
  const [titleInputSize, setTitleInputSize] = useState("");
  const [subtitleInputSize, setSubtitleInputSize] = useState("");
  const [paragraphInputSize, setParagraphInputSize] = useState("");
  const [invalidData, setInvalidData] = useState(false);

  const loadFont = (file: File, fontType: string): Promise<string> => {
    return new Promise((resolve) => {
      const fontUrl = URL.createObjectURL(file);
      const fontName = `Custom-${fontType}-${Date.now()}`;
      const fontFace = new FontFace(fontName, `url(${fontUrl})`, {
        style: "normal",
        weight: "100 900",
        display: "swap",
      });
      fontFace.load().then((loadFont) => {
        document.fonts.add(loadFont);
        URL.revokeObjectURL(fontUrl);
        resolve(fontName);
      });
    });
  };
  const onInputFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidData(false);
    const file = event.target.files?.[0] || null;
    if (!file) {
      setInvalidData(true);
      return;
    }
    const fontType = event.target.name;
    try {
      const fontName = await loadFont(file, fontType);
      console.log("Fuente cargada:", fontName);
      const setter =
        fontType === "primary" ? setPrimaryInputFont : setSecondaryInputFont;
      setter(fontName);

      onRefreshFontsPreview({
        primaryFont: fontType === "primary" ? fontName : primaryInputFont,
        secondaryFont: fontType === "secondary" ? fontName : secondaryInputFont,
        textTitle: titleInputSize,
        textSubtitle: subtitleInputSize,
        textParagraph: paragraphInputSize,
      });
    } catch (error) {
      console.error("Error al cargar la fuente:", error);
    }
  };
  const onInputTam = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInvalidData(false);
    const id = event.target.id;
    if (event.target.value[0] === "-" || event.target.value[0] === "0") {
      event.target.value = "1";

      if (id === "tam_paragraph") {
        setParagraphInputSize(event.target.value);
      } else if (id === "tam_title") {
        setTitleInputSize(event.target.value);
      } else if (id === "tam_subtitle") {
        setSubtitleInputSize(event.target.value);
      }
    }
    onRefreshFontsPreview({
      primaryFont: primaryInputFont,
      secondaryFont: secondaryInputFont,
      textTitle: id === "tam_title" ? event.target.value : titleInputSize,
      textSubtitle:
        id === "tam_subtitle" ? event.target.value : subtitleInputSize,
      textParagraph:
        id === "tam_paragraph" ? event.target.value : paragraphInputSize,
    });
  };
  const onSaveFonts = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      primaryInputFont === "" ||
      secondaryInputFont === "" ||
      titleInputSize === "" ||
      subtitleInputSize === "" ||
      paragraphInputSize === ""
    ) {
      setInvalidData(true);
      return;
    }

    const result = await confirmAction({
      title: "¿Estás seguro?",
      text: "¡Vas a crear una nueva tipografía!",
      confirmButtonText: "Sí, crear",
      cancelButtonText: "Cancelar",
    });
    if (!result.isConfirmed) return;

    const mainInputFile = document.getElementById(
      "primaryFont"
    ) as HTMLInputElement;
    const secondaryInputFile = document.getElementById(
      "secondaryFont"
    ) as HTMLInputElement;
    const formData = new FormData();
    formData.append("tam_paragraph", paragraphInputSize);
    formData.append("tam_title", titleInputSize);
    formData.append("tam_subtitle", subtitleInputSize);
    formData.append("is_selected", "true");
    if (mainInputFile.files && mainInputFile.files[0]) {
      formData.append("main_font", mainInputFile.files[0]);
    }
    if (secondaryInputFile.files && secondaryInputFile.files[0]) {
      formData.append("secondary_font", secondaryInputFile.files[0]);
    }
    try {
      const response = await axiosInstance.post("/Tipography/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onRefreshListFonts();
      setPrimaryInputFont("");
      setSecondaryInputFont("");
      setTitleInputSize("");
      setSubtitleInputSize("");
      setParagraphInputSize("");
      onRefreshFontsPreview({
        primaryFont: "",
        secondaryFont: "",
        textTitle: "",
        textSubtitle: "",
        textParagraph: "",
      });
      mainInputFile.value = "";
      secondaryInputFile.value = "";
      successAlert({
        title: "¡Tipografía creada!",
        text: "La tipografía se creó correctamente.",
      });
    } catch (error) {
      console.error("Error al guardar las fuentes:", error);
    }
  };
  const onEditFonts = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      primaryInputFont === "" ||
      secondaryInputFont === "" ||
      titleInputSize === "" ||
      subtitleInputSize === "" ||
      paragraphInputSize === ""
    ) {
      setInvalidData(true);
      return;
    }

    const result = await confirmAction({
      title: "¿Estás seguro?",
      text: "¡Vas a editar la tipografía seleccionada!",
      confirmButtonText: "Sí, editar",
      cancelButtonText: "Cancelar",
    });
    if (!result.isConfirmed) return;

    const formData = new FormData();
    const mainInputFile = document.getElementById(
      "primaryFont"
    ) as HTMLInputElement;
    const secondaryInputFile = document.getElementById(
      "secondaryFont"
    ) as HTMLInputElement;
    formData.append("tam_paragraph", paragraphInputSize);
    formData.append("tam_title", titleInputSize);
    formData.append("tam_subtitle", subtitleInputSize);
    formData.append("is_selected", "true");
    if (mainInputFile.files && mainInputFile.files[0]) {
      formData.append("main_font", mainInputFile.files[0]);
    }
    if (secondaryInputFile.files && secondaryInputFile.files[0]) {
      formData.append("secondary_font", secondaryInputFile.files[0]);
    }
    try {
      const selectedTipography = (
        await axiosInstance.get("/Tipography/selected")
      ).data.data;
      const response = await axiosInstance.patch(
        `/Tipography/${selectedTipography.id_tipography}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      onRefreshListFonts();
      setPrimaryInputFont("");
      setSecondaryInputFont("");
      setTitleInputSize("");
      setSubtitleInputSize("");
      setParagraphInputSize("");
      onRefreshFontsPreview({
        primaryFont: "",
        secondaryFont: "",
        textTitle: "",
        textSubtitle: "",
        textParagraph: "",
      });
      mainInputFile.value = "";
      secondaryInputFile.value = "";
      successAlert({
        title: "¡Tipografía editada!",
        text: "La tipografía se editó correctamente.",
      });
    } catch (error) {
      console.error("Error al guardar las fuentes:", error);
    }
  };
  return (
    <form className="w-full h-152 flex flex-col items-center gap-1 px-2 py-3 bg-white">
      <div className="w-full h-22 px-3 flex flex-col gap-1">
        <label
          className="w-full trancking-widese font-500 text-lg"
          htmlFor="primaryFont"
        >
          Fuente Principal
        </label>
        <input
          className="w-full h-1/2 rounded-sm border border-[#374151]/25 text-center cursor-pointer px-3 py-2 bg-[#DFEEFF]/50 text-[#374151] text-sm text-[16px] focus:outline-none focus:border-secondary"
          type="file"
          accept=".ttf"
          name="primary"
          id="primaryFont"
          onChange={(e) => {
            setPrimaryInputFont(e.target.value);
            onInputFile(e);
          }}
          required
        />
      </div>

      <div className="w-full h-22 px-3 flex flex-col gap-1">
        <label
          className="w-full trancking-widese font-500 text-lg"
          htmlFor="secondaryFont"
        >
          Fuente Secundaria
        </label>
        <input
          className="w-full h-1/2 rounded-sm border border-[#374151]/25 text-center cursor-pointer px-3 py-2 bg-[#DFEEFF]/50 text-[#374151] text-sm text-[16px] focus:outline-none focus:border-secondary"
          type="file"
          accept=".ttf"
          name="secondary"
          id="secondaryFont"
          onChange={(e) => {
            setSecondaryInputFont(e.target.value);
            onInputFile(e);
          }}
          required
        />
      </div>

      <div className="w-full h-19 px-3 flex flex-col gap-1">
        <label
          className="w-full trancking-widese font-500 text-lg"
          htmlFor="tam_title"
        >
          Tamaño de los titulos
        </label>
        <input
          className="w-full h-1/2 rounded-sm border border-[#374151]/25 cursor-pointer px-3 py-2 bg-[#DFEEFF]/50 text-[#374151] text-sm text-[16px] focus:outline-none focus:border-secondary"
          id="tam_title"
          name="tam_title"
          placeholder="Ingrese el tamaño de los titulos"
          value={titleInputSize}
          onChange={(e) => {
            setTitleInputSize(e.target.value);
            onInputTam(e);
          }}
          required
          type="number"
        />
      </div>

      <div className="w-full h-19 px-3 flex flex-col gap-1">
        <label
          className="w-full trancking-widese font-500 text-lg"
          htmlFor="tam_subtitle"
        >
          Tamaño de los subtitulos
        </label>
        <input
          className="w-full h-1/2 rounded-sm border border-[#374151]/25 cursor-pointer px-3 py-2 bg-[#DFEEFF]/50 text-[#374151] text-sm text-[16px] focus:outline-none focus:border-secondary"
          type="number"
          name="tam_subtitle"
          id="tam_subtitle"
          value={subtitleInputSize}
          onChange={(e) => {
            setSubtitleInputSize(e.target.value);
            onInputTam(e);
          }}
          placeholder="Ingrese el tamaño de los subtitulos"
          required
        />
      </div>

      <div className="w-full h-19 px-3 flex flex-col gap-1">
        <label
          className="w-full trancking-widese font-500 text-lg"
          htmlFor="tam_paragraph"
        >
          Tamaño de los párrafos
        </label>
        <input
          className="w-full h-1/2 rounded-sm border border-[#374151]/25 cursor-pointer px-3 py-2 bg-[#DFEEFF]/50 text-[#374151] text-sm text-[16px] focus:outline-none focus:border-secondary"
          type="number"
          name="tam_paragraph"
          id="tam_paragraph"
          value={paragraphInputSize}
          onChange={(e) => {
            setParagraphInputSize(e.target.value);
            onInputTam(e);
          }}
          placeholder="Ingrese el tamaño de los párrafos"
          required
        />
      </div>
      {invalidData ? (
        <span className="text-red-600">Complete todos los campos.</span>
      ) : null}
      <div className="w-full flex justify-between px-3 mt-1.5">
        <button
          type="submit"
          className="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3 text-[16px] max-w-32"
          onClick={onSaveFonts}
        >
          Crear
        </button>
        <button
          type="submit"
          className="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3 text-[16px] max-w-32"
          onClick={onEditFonts}
        >
          Editar
        </button>
      </div>
    </form>
  );
};

export default FormFonts;
