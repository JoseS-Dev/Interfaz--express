<script setup>
import formColors from "../formColors.vue";
import CardPrevious from "../CardColors.vue";
import listColors from "../listColors.vue";
import { defineProps } from "vue";
import { ref } from "vue";

const refresh = ref(false);
const colorsPreview = ref({});
const setColorsPreview = (colors) => {
  colorsPreview.value = colors;
};
const setRefreshListColors = () => {
  refresh.value = !refresh.value;
};
</script>

<template>
  <main class="w-full h-175 flex flex-col gap-4 lg:flex-row">
    <section
      class="w-full lg:w-1/4 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-800 px-3 py-3"
    >
      <article
        class="flex flex-col items-center text-xl tracking-widese gap-4 py-4"
      >
        <h3 class="w-full font-bold border-b-2 border-black text-center">
          Colores plantilla
        </h3>
        <formColors
          :onRefreshListColors="setRefreshListColors"
          :onRefreshColorsPreview="setColorsPreview"
        />
      </article>
    </section>
    <section
      class="w-full lg:w-3/12 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-800 flex px-3 py-3"
    >
      <article
        class="w-full text-xl tracking-widese flex flex-col items-center gap-4 py-4"
      >
        <h3 class="w-full font-bold border-b-2 border-gray text-center">
          Vista Previa
        </h3>
        <CardPrevious :colors="colorsPreview" />
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
    <section class="w-full lg:w-1/2 flex flex-col items-center px-3 py-3">
      <article
        class="border-b-2 w-full border-black flex justify-between items-center text-xl tracking-widese py-2"
      >
        <h3 class="font-bold">Registro de colores</h3>
      </article>
      <listColors :refresh="refresh" />
    </section>
  </main>
</template>
