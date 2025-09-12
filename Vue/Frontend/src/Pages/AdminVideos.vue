<template>
  <section class="admin-videos">
    <h1 class="mb-4 text-2xl font-bold text-center">Administración de Videos</h1>

    <div class="flex flex-col gap-6 lg:flex-row">
      <FormVideos
        :modoCrear="modoCrear"
        :videoEdit="videoEdit"
        @success="handleSuccess"
        @previewChange="handlePreviewChange"
      />

      <ListVideos @edit="handleEdit" />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import FormVideos from '@/components/FormVideos.vue';
import ListVideos from '@/components/ListVideos.vue';

const modoCrear = ref(true);
const videoEdit = ref(null);

const handleSuccess = () => {
  modoCrear.value = true;
  videoEdit.value = null;
};

const handleEdit = (video) => {
  modoCrear.value = false;
  videoEdit.value = video;
};

const handlePreviewChange = (preview) => {
  console.log('Preview actualizado:', preview);
};
</script>

<style scoped>
.admin-videos {
  padding: 1rem;
}
</style>
