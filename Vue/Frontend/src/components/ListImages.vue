<script setup>
import { ref, onMounted } from 'vue';
import { axiosInstance } from '@/utilities/axios';
import { confirmAction, successAlert } from '@/utilities/swalHelper';
import ModalImage from '@/components/ModalImage.vue';

const images = ref([]);
const loading = ref(false);
const error = ref(null);
const selectedImage = ref(null);

const loadImages = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axiosInstance.get('/images');
    images.value = response.data.data || response.data || [];
  } catch (err) {
    console.error('Error al obtener las imágenes:', err);
    error.value = 'Error al obtener las imágenes';
  } finally {
    loading.value = false;
  }
};

onMounted(loadImages);

const openModal = (image) => {
  selectedImage.value = image;
};

const closeModal = () => {
  selectedImage.value = null;
};

const onToggleSelectImage = async (id_image, currentSelected) => {
  try {
    const newSelected = currentSelected === 1 ? 0 : 1;
    await axiosInstance.patch('/images/select', {
      id_image,
      is_selected: newSelected,
    });
    await loadImages();
    successAlert({
      title: newSelected === 1 ? 'Imagen seleccionada' : 'Imagen deseleccionada',
      text: `La imagen con ID ${id_image} ha sido ${newSelected === 1 ? 'seleccionada' : 'deseleccionada'}.`,
      position: 'center',
    });
  } catch (e) {
    console.error('Error al cambiar selección de la imagen:', e);
    error.value = 'Error al cambiar selección de la imagen';
  }
};

const onDeleteImage = async (id_image) => {
  try {
    const ask = await confirmAction({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar la imagen con ID ${id_image}?`,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      icon: 'warning',
    });
    if (ask.isConfirmed) {
      await axiosInstance.delete(`/images/delete/${id_image}`);
      successAlert({
        title: 'Imagen eliminada',
        text: `La imagen con ID ${id_image} ha sido eliminada.`,
        position: 'center',
      });
      await loadImages();
    }
  } catch (e) {
    console.error('Error al eliminar la imagen:', e);
    error.value = 'Error al eliminar la imagen';
  }
};
</script>

<template>
  <div class="flex flex-col lg:border-l-2 gap-6 p-2 px-4 min-w-0 grow-40 basis-[100%] lg:basis-0 mt-6 lg:mt-0">
    <h2 class="w-full text-xl font-bold border-b-2 text-center">Registro de Imágenes</h2>

    <div v-if="loading" class="text-center">Cargando...</div>
    <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>
    <p v-else-if="images.length === 0" class="text-2xl font-semibold text-center">No hay imágenes registradas.</p>

    <div v-else class="text-center">
      <div v-for="image in images" :key="image.id_image" class="flex items-center w-full border-b-2 px-0.5">
        <button
          class="flex gap-2 p-2 hover:bg-gray-200 cursor-pointer w-4/5 text-left"
          :class="{ 'bg-blue-100 border-blue-500': image.is_selected === 1 }"
          @click="onToggleSelectImage(image.id_image, image.is_selected)"
          aria-label="row"
        >
          <div class="grow-1" aria-label="id">{{ image.id_image }}</div>
          <div class="grow-1" aria-label="name">{{ image.name_image }}</div>
          <div class="grow-1" aria-label="format">{{ image.format_image }}</div>
          <div class="grow-1" aria-label="dimensions">{{ image.dimension_image }}</div>
          <div class="grow-1" aria-label="size">{{ image.size_image }} KB</div>
        </button>
        <div class="flex items-center justify-evenly w-1/5" aria-label="actions">
          <button class="text-blue-700 hover:underline" @click="openModal(image)">Ver</button>
          <button class="text-red-600 hover:underline" @click="onDeleteImage(image.id_image)">Eliminar</button>
        </div>
      </div>
    </div>

    <ModalImage v-if="selectedImage" :selectedImage="selectedImage" @close="closeModal" />
  </div>
</template>
