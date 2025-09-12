<script setup>
import { storeToRefs } from 'pinia';
import { useLoaderStore } from '@/store/LoaderStore';

const loaderStore = useLoaderStore();
const { isHidden, isVisible } = storeToRefs(loaderStore);
</script>

<template>
  <section class="p-4">
    <h2 class="text-xl font-semibold mb-4">Loader</h2>
    <div class="flex items-center gap-3">
      <span>Estado actual: <strong>{{ isVisible ? 'Visible' : 'Oculto' }}</strong></span>
      <button class="px-3 py-1 bg-blue-600 text-white rounded" @click="loaderStore.showLoader()">Mostrar</button>
      <button class="px-3 py-1 bg-gray-700 text-white rounded" @click="loaderStore.hideLoader()">Ocultar</button>
    </div>
  </section>
</template>
