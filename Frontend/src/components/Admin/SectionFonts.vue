<script setup>
import formFonts from "../formFonts.vue";
import CardFonts from "../CardFonts.vue";
import listFonts from "../listFonts.vue";
import { ref } from "vue";
const refresh = ref(false);
const tipographyPreview = ref({});
const setTipographyPreview = (tipography) => {
  tipographyPreview.value = tipography;
};
const setRefreshListFonts = () => {
  refresh.value = !refresh.value;
};
</script>

<template>
  <main class="w-full min-h-screen flex flex-col gap-4 lg:flex-row">
    <section
      class="w-full lg:w-1/3 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-800 px-3 py-3"
    >
      <article
        class="flex flex-col items-center text-xl tracking-widese gap-4 py-4"
      >
        <h3 class="w-full font-bold text-center border-b-2 border-black">
          Configuración de Fuentes
        </h3>
        <formFonts
          :onRefreshListFonts="setRefreshListFonts"
          :onRefreshFontsPreview="setTipographyPreview"
        />
      </article>
    </section>
    <section
      class="w-full lg:w-1/3 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-800 px-3 py-3"
    >
      <article
        class="text-xl flex flex-col items-center tracking-widese gap-4 py-4 w-full"
      >
        <h3 class="w-full font-bold text-center border-b-2 border-black">
          Vista Previa
        </h3>
        <CardFonts :fonts="tipographyPreview" />
        <div class="flex justify-center w-full">
          <button
            @click="$router.push('/')"
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Ver plantilla principal
          </button>
        </div>
      </article>
    </section>
    <section class="w-full lg:w-1/3 flex flex-col items-center px-3 py-3">
      <article
        class="border-b-2 w-full border-black flex justify-between items-center text-xl tracking-widese py-2"
      >
        <h3 class="font-bold">Registro de Fuentes</h3>
      </article>
      <listFonts :refresh="refresh" />
    </section>
  </main>
</template>
