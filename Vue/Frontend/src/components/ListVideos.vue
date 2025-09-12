<script setup>
import { ref, onMounted } from 'vue';
import { axiosInstance } from '@/utilities/axios';
import { confirmAction, successAlert } from '@/utilities/swalHelper';

const emit = defineEmits(['edit']);

const videos = ref([]);
const loading = ref(false);
const error = ref(null);

const loadVideos = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axiosInstance.get('/videos');
    videos.value = response.data.data || response.data || [];
  } catch (err) {
    console.error('Error al obtener los videos:', err);
    error.value = 'Error al obtener los videos';
  } finally {
    loading.value = false;
  }
};

onMounted(loadVideos);

const onToggleSelectVideo = async (id_video, currentSelected) => {
  try {
    const newSelected = currentSelected === 1 ? 0 : 1;
    await axiosInstance.patch('/videos/select', {
      id_video,
      is_selected: newSelected,
    });
    await loadVideos();
    successAlert({
      title: newSelected === 1 ? 'Video seleccionado' : 'Video deseleccionado',
      text: `El video con ID ${id_video} ha sido ${newSelected === 1 ? 'seleccionado' : 'deseleccionado'}.`,
      position: 'center',
    });
  } catch (e) {
    console.error('Error al cambiar selección del video:', e);
    error.value = 'Error al cambiar selección del video';
  }
};

const onDeleteVideo = async (id_video) => {
  const result = await confirmAction({
    title: '¿Estás seguro?',
    text: '¡Esta acción eliminará el video y no se puede deshacer!',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
  });
  if (!result.isConfirmed) return;

  try {
    await axiosInstance.delete(`/videos/${id_video}`);
    await loadVideos();
    successAlert({ title: '¡Eliminado!', text: 'El video ha sido eliminado correctamente.' });
  } catch (e) {
    console.error('Error al eliminar el video:', e);
    error.value = 'Error al eliminar el video';
  }
};

const formatDuration = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

const formatSize = (bytes) => `${(bytes / 1024).toFixed(2)} KB`;
</script>

<template>
  <article class="flex flex-col lg:border-l-2 gap-6 p-2 px-4 min-w-0 grow-40 basis-[100%] lg:basis-0 mt-6 lg:mt-0 max-h-[600px] overflow-y-auto">
    <h2 class="w-full text-xl font-bold text-center border-b-2">Registro de Videos</h2>

    <div v-if="loading">Cargando videos...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>
    <p v-else-if="videos.length === 0" class="text-center">No hay videos disponibles.</p>

    <div v-else>
      <div
        v-for="video in videos"
        :key="video.id_video"
        class="flex items-center justify-around w-full border-b-2 border-blue-800 my-2 py-2 gap-2 rounded-md cursor-pointer"
        :class="{ 'bg-[#BFCEDF]': video.is_selected === 1 }"
        :data-id_video="video.id_video"
        @click="onToggleSelectVideo(video.id_video, video.is_selected)"
      >
        <div class="font-bold text-center grow-1" aria-label="ID">{{ video.id_video }}</div>
        <div class="text-center grow-1" aria-label="Nombre">{{ video.name_video }}</div>
        <div class="text-center grow-1" aria-label="Formato">{{ video.format_video }}</div>
        <div class="text-center grow-1" aria-label="Duración">{{ formatDuration(video.duration_video) }}</div>
        <div class="text-center grow-1" aria-label="Tamaño">{{ formatSize(video.size_video) }}</div>

        <button class="px-2 py-1 text-blue-700 hover:underline" @click.stop="emit('edit', video)">Editar</button>
        <button class="px-2 py-1 text-red-600 hover:underline" @click.stop="onDeleteVideo(video.id_video)">Eliminar</button>
      </div>
    </div>
  </article>
</template>
