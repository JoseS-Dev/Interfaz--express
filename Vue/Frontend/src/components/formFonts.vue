<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";

const primaryFont = ref("");
const secondaryFont = ref("");
const textTitle = ref("");
const textSubtitle = ref("");
const textParagraph = ref("");
const invalidData = ref(false);

const props = defineProps({
  onRefreshListFonts: {
    type: Function,
    required: true,
  },
  onRefreshFontsPreview: {
    type: Function,
    required: true,
  },
});

const loadFont = (file, fontType) => {
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

const onInputFile = async (event) => {
  invalidData.value = false;
  const file = event.target.files[0];
  const fontType = event.target.name;
  try {
    const fontName = await loadFont(file, fontType);
    console.log("Fuente cargada:", fontName);
    if (fontType === "primary") {
      primaryFont.value = fontName;
      props.onRefreshFontsPreview({
        primaryFont: fontName,
        secondaryFont: secondaryFont.value,
        textTitle: textTitle.value,
        textSubtitle: textSubtitle.value,
        textParagraph: textParagraph.value,
      });
    } else if (fontType === "secondary") {
      secondaryFont.value = fontName;
      props.onRefreshFontsPreview({
        primaryFont: primaryFont.value,
        secondaryFont: fontName,
        textTitle: textTitle.value,
        textSubtitle: textSubtitle.value,
        textParagraph: textParagraph.value,
      });
    }
  } catch (error) {
    console.error("Error al cargar la fuente:", error);
  }
};

const onInputTam = (event) => {
  invalidData.value = false;
  if (event.target.value[0] === "-" || event.target.value[0] === "0") {
    event.target.value = "1";
    const id = event.target.id;
    if (id === "tam_paragraph") {
      textParagraph.value = event.target.value;
    } else if (id === "tam_title") {
      textTitle.value = event.target.value;
    } else if (id === "tam_subtitle") {
      textSubtitle.value = event.target.value;
    }
  }
  props.onRefreshFontsPreview({
    primaryFont: primaryFont.value,
    secondaryFont: secondaryFont.value,
    textTitle: textTitle.value,
    textSubtitle: textSubtitle.value,
    textParagraph: textParagraph.value,
  });
};

const onSaveFonts = async (event) => {
  event.preventDefault();
  if (
    !primaryFont.value ||
    !secondaryFont.value ||
    !textTitle.value ||
    !textSubtitle.value ||
    !textParagraph.value
  ) {
    invalidData.value = true;
    return;
  }

  const result = await Swal.fire({
    title: "¿Deseas guardar los cambios?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    denyButtonText: "No guardar",
    cancelButtonText: "Cancelar",
    background: "#DFEEFF", // Fondo azul claro
    color: "#2563EB", // Texto azul
    confirmButtonColor: "#2563EB", // Azul
    denyButtonColor: "#F97316", // Naranja
    cancelButtonColor: "#374151", // Gris oscuro
    customClass: {
      popup: "rounded-xl",
      confirmButton: "font-bold",
      denyButton: "font-bold",
      cancelButton: "font-bold",
    },
  });

  if (result.isConfirmed) {
    const mainInputFile = document.getElementById("primaryFont");
    const secondaryInputFile = document.getElementById("secondaryFont");
    const formData = new FormData();
    formData.append("tam_paragraph", textParagraph.value);
    formData.append("tam_title", textTitle.value);
    formData.append("tam_subtitle", textSubtitle.value);
    formData.append("is_selected", "false");
    formData.append("main_font", mainInputFile.files[0]);
    formData.append("secondary_font", secondaryInputFile.files[0]);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/Tipography/1`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) throw new Error(`Error de API: ${response.status}`);
      Swal.fire({
        icon: "success",
        title: "¡Guardado!",
        background: "#DFEEFF",
        color: "#2563EB",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "rounded-xl",
        },
      });
      props.onRefreshListFonts();
      primaryFont.value = "";
      secondaryFont.value = "";
      textTitle.value = "";
      textSubtitle.value = "";
      textParagraph.value = "";
      props.onRefreshFontsPreview({
        primaryFont: "",
        secondaryFont: "",
        textTitle: "",
        textSubtitle: "",
        textParagraph: "",
      });
      mainInputFile.value = null;
      secondaryInputFile.value = null;
    } catch (error) {
      console.error("Error al guardar la tipografia: ", error);
    }
  } else if (result.isDenied) {
    Swal.fire("Los cambios no se guardaron", "", "info");
  }
};
const onEditFonts = async (event) => {
  event.preventDefault();
  if (
    !primaryFont.value ||
    !secondaryFont.value ||
    !textTitle.value ||
    !textSubtitle.value ||
    !textParagraph.value
  ) {
    invalidData.value = true;
    return;
  }

  const result = await Swal.fire({
    title: "¿Deseas guardar los cambios?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    denyButtonText: "No guardar",
    cancelButtonText: "Cancelar",
    background: "#DFEEFF", // Fondo azul claro
    color: "#2563EB", // Texto azul
    confirmButtonColor: "#2563EB", // Azul
    denyButtonColor: "#F97316", // Naranja
    cancelButtonColor: "#374151", // Gris oscuro
    customClass: {
      popup: "rounded-xl",
      confirmButton: "font-bold",
      denyButton: "font-bold",
      cancelButton: "font-bold",
    },
  });

  if (result.isConfirmed) {
    const mainInputFile = document.getElementById("primaryFont");
    const secondaryInputFile = document.getElementById("secondaryFont");
    const formData = new FormData();
    formData.append("tam_paragraph", textParagraph.value);
    formData.append("tam_title", textTitle.value);
    formData.append("tam_subtitle", textSubtitle.value);
    formData.append("is_selected", "true");
    formData.append("main_font", mainInputFile.files[0]);
    formData.append("secondary_font", secondaryInputFile.files[0]);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/Tipography`
      );
      if (!response.ok) throw new Error(`Error de API: ${response.status}`);
      const listFonts = (await response.json()).data;
      const selectedFont = listFonts.find((font) => font.is_selected === 1);
      const otherResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/Tipography/${
          selectedFont.id_tipography
        }`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      if (!otherResponse.ok)
        throw new Error(`Error de API: ${otherResponse.status}`);
      Swal.fire({
        icon: "success",
        title: "¡Guardado!",
        background: "#DFEEFF",
        color: "#2563EB",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: "rounded-xl",
        },
      });
      props.onRefreshListFonts();
      primaryFont.value = "";
      secondaryFont.value = "";
      textTitle.value = "";
      textSubtitle.value = "";
      textParagraph.value = "";
      props.onRefreshFontsPreview({
        primaryFont: "",
        secondaryFont: "",
        textTitle: "",
        textSubtitle: "",
        textParagraph: "",
      });
      mainInputFile.value = null;
      secondaryInputFile.value = null;
    } catch (error) {
      console.error("Error al editar la tipografia: ", error);
    }
  } else if (result.isDenied) {
    Swal.fire("Los cambios no se guardaron", "", "info");
  }
};
</script>

<template>
  <form
    class="w-full h-152 flex flex-col items-center gap-1 px-2 py-3 bg-white"
  >
    <div class="w-full h-22 px-3 flex flex-col gap-1">
      <label class="w-full trancking-widese font-500 text-lg" for="primaryFont"
        >Fuente Principal</label
      >
      <input
        class="w-full h-1/2 rounded-sm border border-[#374151]/25 text-center cursor-pointer px-3 py-2 bg-[#DFEEFF]/50 text-[#374151] text-sm text-[16px] focus:outline-none focus:border-secondary"
        type="file"
        accept=".ttf"
        name="primary"
        id="primaryFont"
        required
        @input="onInputFile"
      />
    </div>
    <div class="w-full h-22 px-3 flex flex-col gap-1">
      <label
        class="w-full trancking-widese font-500 text-lg"
        for="secondaryFont"
        >Fuente Secundaria</label
      >
      <input
        class="w-full h-1/2 rounded-sm border border-[#374151]/25 text-center cursor-pointer px-3 py-2 bg-[#DFEEFF]/50 text-[#374151] text-sm text-[16px] focus:outline-none focus:border-secondary"
        type="file"
        accept=".ttf"
        name="secondary"
        id="secondaryFont"
        required
        @input="onInputFile"
      />
    </div>

    <div class="w-full h-19 px-3 flex flex-col gap-1">
      <label class="w-full trancking-widese font-500 text-lg" for="tam_title"
        >Tamaño de los titulos</label
      >
      <input
        class="w-full h-1/2 rounded-sm border border-[#374151]/25 cursor-pointer px-3 py-2 bg-[#DFEEFF]/50 text-[#374151] text-sm text-[16px] focus:outline-none focus:border-secondary"
        id="tam_title"
        name="tam_title"
        placeholder="Ingrese el tamaño de los titulos"
        required
        type="number"
        v-model="textTitle"
        @input="onInputTam"
      />
    </div>
    <div class="w-full h-19 px-3 flex flex-col gap-1">
      <label class="w-full trancking-widese font-500 text-lg" for="tam_subtitle"
        >Tamaño de los subtitulos</label
      >
      <input
        class="w-full h-1/2 rounded-sm border border-[#374151]/25 cursor-pointer px-3 py-2 bg-[#DFEEFF]/50 text-[#374151] text-sm text-[16px] focus:outline-none focus:border-secondary"
        type="number"
        name="tam_subtitle"
        id="tam_subtitle"
        placeholder="Ingrese el tamaño de los subtitulos"
        required
        v-model="textSubtitle"
        @input="onInputTam"
      />
    </div>
    <div class="w-full h-19 px-3 flex flex-col gap-1">
      <label
        class="w-full trancking-widese font-500 text-lg"
        for="tam_paragraph"
        >Tamaño de los párrafos</label
      >
      <input
        class="w-full h-1/2 rounded-sm border border-[#374151]/25 cursor-pointer px-3 py-2 bg-[#DFEEFF]/50 text-[#374151] text-sm text-[16px] focus:outline-none focus:border-secondary"
        type="number"
        name="tam_paragraph"
        id="tam_paragraph"
        placeholder="Ingrese el tamaño de los párrafos"
        required
        v-model="textParagraph"
        @input="onInputTam"
      />
    </div>
    <span v-if="invalidData" class="text-red-600"
      >Complete todos los campos.</span
    >
    <div class="w-full flex justify-between px-3 mt-1.5">
      <button
        type="submit"
        class="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3 text-[16px] max-w-32"
        @click="onSaveFonts"
      >
        Crear
      </button>
      <button
        type="submit"
        class="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3 text-[16px] max-w-32"
        @click="onEditFonts"
      >
        Editar
      </button>
    </div>
  </form>
</template>
