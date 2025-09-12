<script setup>
import { ref } from 'vue';
import FormVideos from '@/components/FormVideos.vue';
import ListVideos from '@/components/ListVideos.vue';

const modoCrear = ref(true);
const videoEdit = ref(null);
const previewData = ref({
  videoUrl: null,
  primarySubtitleUrl: null,
  secondarySubtitleUrl: null,
  primaryAudioUrl: null,
  secondaryAudioUrl: null,
  videoMetadata: null,
});

const handleEditClick = (video) => {
  modoCrear.value = false;
  videoEdit.value = {
    id: video.id_video,
    url_video: video.url_video,
    url_primary_subtitle: video.url_primary_subtitle,
    url_secondary_subtitle: video.url_secondary_subtitle,
    url_primary_audio: video.url_primary_audio,
    url_secondary_audio: video.url_secondary_audio,
    file_name: video.name_video,
    file_format: video.format_video,
    duration: String(video.duration_video),
    size: String(video.size_video),
  };
};

const handleSuccess = () => {
  // Volver al modo crear tras crear/actualizar
  modoCrear.value = true;
  videoEdit.value = null;
};

const handlePreviewChange = (data) => {
  previewData.value = data;
};
</script>

<template>
  <section class="p-4">
    <h2 class="text-xl font-semibold mb-4 text-center">Administrar Videos</h2>
    <div class="flex flex-col lg:flex-row gap-6">
      <FormVideos
        :modoCrear="modoCrear"
        :videoEdit="videoEdit"
        @success="handleSuccess"
        @previewChange="handlePreviewChange"
      />
      <ListVideos @edit="handleEditClick" />
    </div>

    <!-- Vista previa simple -->
    <div v-if="previewData.videoUrl" class="mt-6">
      <h3 class="text-lg font-semibold mb-2">Previsualización</h3>
      <video :src="previewData.videoUrl" controls class="max-w-full rounded" />
    </div>
  </section>
</template>
