<script setup>
import { computed } from 'vue';
const props = defineProps({
  selectedImage: { type: Object, default: null },
});
const emit = defineEmits(['close']);

const imageSrc = computed(() => {
  if (!props.selectedImage?.url_image) return null;
  const filename = props.selectedImage.url_image.split('\\').pop();
  return `${import.meta.env.VITE_BACKEND_URL}/imagen/${filename}`;
});
</script>

<template>
  <dialog v-if="selectedImage" open class="z-10 border-2 border-black w-full max-w-md bg-gray-400 fixed top-10 left-1/2 -translate-x-1/2 p-4 rounded-2xl">
    <div class="w-full flex flex-col gap-4">
      <h3 class="text-2xl text-white border-b-2 border-white">Detalles de la Imagen</h3>
      <div class="w-full">
        <img :src="imageSrc" :alt="selectedImage?.name_image" class="w-full h-auto rounded-2xl object-cover" />
      </div>
      <div class="w-full border-b-2 border-white grid grid-cols-2 gap-2 text-white">
        <div class="flex flex-col p-2 gap-1">
          <h4 class="text-xl">Dimensión: {{ selectedImage?.dimension_image }}</h4>
          <h4 class="text-xl">Formato: {{ selectedImage?.format_image }}</h4>
        </div>
        <div class="flex flex-col p-2 gap-1">
          <h4 class="text-xl">Nombre: {{ selectedImage?.name_image }}</h4>
          <h4 class="text-xl">Tamaño: {{ selectedImage?.size_image }} KB</h4>
        </div>
      </div>
      <button
        class="w-full h-12 mt-2 border-2 border-white bg-blue-700 text-lg text-white hover:bg-white hover:text-black transition-colors rounded-2xl"
        @click="emit('close')"
      >
        Cerrar Modal
      </button>
    </div>
  </dialog>
</template>
