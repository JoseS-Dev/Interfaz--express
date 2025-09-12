<script setup>
import { ref, watch } from 'vue';
import { axiosInstance } from '@/utilities/axios';

const props = defineProps({
  modoCrear: { type: Boolean, default: true },
  videoEdit: { type: Object, default: null },
});

const emit = defineEmits(['success', 'previewChange']);

const videoFile = ref(null);
const audioMainFile = ref(null);
const audioSecondaryFile = ref(null);
const subtitleMainFile = ref(null);
const subtitleSecondaryFile = ref(null);

const localPreview = ref({
  videoUrl: null,
  primarySubtitleUrl: null,
  secondarySubtitleUrl: null,
  primaryAudioUrl: null,
  secondaryAudioUrl: null,
  videoMetadata: null,
});

watch(
  () => [props.modoCrear, props.videoEdit],
  () => {
    if (!props.modoCrear && props.videoEdit) {
      const v = props.videoEdit;
      const preview = {
        videoUrl: v.url_video ?? null,
        primarySubtitleUrl: v.url_primary_subtitle ?? null,
        secondarySubtitleUrl: v.url_secondary_subtitle ?? null,
        primaryAudioUrl: v.url_primary_audio ?? null,
        secondaryAudioUrl: v.url_secondary_audio ?? null,
        videoMetadata: {
          fileName: v.file_name,
          fileFormat: v.file_format,
          duration: v.duration,
          size: v.size,
        },
      };
      localPreview.value = preview;
      emit('previewChange', preview);
      videoFile.value = null;
      audioMainFile.value = null;
      audioSecondaryFile.value = null;
      subtitleMainFile.value = null;
      subtitleSecondaryFile.value = null;
    } else {
      const clean = {
        videoUrl: null,
        primarySubtitleUrl: null,
        secondarySubtitleUrl: null,
        primaryAudioUrl: null,
        secondaryAudioUrl: null,
        videoMetadata: null,
      };
      localPreview.value = clean;
      emit('previewChange', clean);
      videoFile.value = null;
      audioMainFile.value = null;
      audioSecondaryFile.value = null;
      subtitleMainFile.value = null;
      subtitleSecondaryFile.value = null;
    }
  },
  { immediate: true }
);

const handleOtherFileChange = (e, fileRef, previewKey) => {
  const file = e.target.files?.[0] || null;
  fileRef.value = file;
  const localUrl = file ? URL.createObjectURL(file) : null;
  const newState = { ...localPreview.value, [previewKey]: localUrl };
  localPreview.value = newState;
  emit('previewChange', newState);
};

const handleVideoChange = (e) => {
  const file = e.target.files?.[0] || null;
  videoFile.value = file;
  if (file) {
    const localUrl = URL.createObjectURL(file);
    const metadata = {
      fileName: file.name,
      fileFormat: file.type,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
    };
    const newState = { ...localPreview.value, videoUrl: localUrl, videoMetadata: metadata };
    localPreview.value = newState;
    emit('previewChange', newState);
  } else {
    const newState = { ...localPreview.value, videoUrl: null, videoMetadata: null };
    localPreview.value = newState;
    emit('previewChange', newState);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (props.modoCrear) {
      if (!videoFile.value) {
        alert('El video es obligatorio.');
        return;
      }
      const videoFormData = new FormData();
      videoFormData.append('url_video', videoFile.value);
      if (videoFile.value) {
        videoFormData.append('file_name', videoFile.value.name);
        videoFormData.append('file_format', videoFile.value.type);
        videoFormData.append('size', String(videoFile.value.size));
      }

      const videoRes = await axiosInstance.post('/videos/create', videoFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const id_video = videoRes.data?.data?.id_video;
      if (!id_video) throw new Error('No se pudo crear el video');

      if (audioMainFile.value || audioSecondaryFile.value) {
        const audioFormData = new FormData();
        if (audioMainFile.value) audioFormData.append('url_audio_main', audioMainFile.value);
        if (audioSecondaryFile.value) audioFormData.append('url_audio_secondary', audioSecondaryFile.value);
        await axiosInstance.post(`/videos/create/track/${id_video}`, audioFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (subtitleMainFile.value || subtitleSecondaryFile.value) {
        const subtitleFormData = new FormData();
        if (subtitleMainFile.value) subtitleFormData.append('subtitle_main_video', subtitleMainFile.value);
        if (subtitleSecondaryFile.value) subtitleFormData.append('subtitle_secondary_video', subtitleSecondaryFile.value);
        await axiosInstance.post(`/videos/create/subtitles/${id_video}`, subtitleFormData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      alert('Video y pistas creados correctamente');
      emit('success');
    } else {
      if (!props.videoEdit) return;
      const updateFormData = new FormData();
      if (videoFile.value) updateFormData.append('url_video', videoFile.value);
      if (audioMainFile.value) updateFormData.append('url_audio_main', audioMainFile.value);
      if (audioSecondaryFile.value) updateFormData.append('url_audio_secondary', audioSecondaryFile.value);
      if (subtitleMainFile.value) updateFormData.append('subtitle_main_video', subtitleMainFile.value);
      if (subtitleSecondaryFile.value) updateFormData.append('subtitle_secondary_video', subtitleSecondaryFile.value);

      await axiosInstance.patch(`/videos/update/${props.videoEdit.id}`, updateFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Video actualizado correctamente');
      emit('success');
    }
  } catch (error) {
    console.error('Error en la operación:', error);
    alert('Error al crear o actualizar video');
  }
};
</script>

<template>
  <form @submit="handleSubmit" class="flex flex-col items-center min-w-0 gap-6 p-2 px-4 grow-30 basis-0">
    <h2 class="w-full text-xl font-bold text-center border-b-2">{{ props.modoCrear ? 'Crear Video' : 'Editar Video' }}</h2>

    <div class="flex flex-col w-full gap-3">
      <label>
        <span class="block mb-1 text-lg font-500">Cargar Video</span>
        <input type="file" accept="video/*" class="px-4 py-2 border-2 border-gray-300 bg-[#DFEEFF]/50 rounded-lg w-full" @change="handleVideoChange" />
      </label>

      <label>
        <span class="block mb-1 text-lg font-500">Pistas de audio</span>
        <div class="flex gap-2">
          <input type="file" accept=".mp3,.wav,.m4a" class="px-4 py-2 border-2 border-gray-300 bg-[#DFEEFF]/50 rounded-lg min-w-0 flex-1" placeholder="Audio Principal" @change="(e) => handleOtherFileChange(e, audioMainFile, 'primaryAudioUrl')" />
          <input type="file" accept=".mp3,.wav,.m4a" class="px-4 py-2 border-2 border-gray-300 bg-[#DFEEFF]/50 rounded-lg min-w-0 flex-1" placeholder="Audio Secundario" @change="(e) => handleOtherFileChange(e, audioSecondaryFile, 'secondaryAudioUrl')" />
        </div>
      </label>

      <label>
        <span class="block mb-1 text-lg font-500">Subtítulos</span>
        <div class="flex gap-2">
          <input type="file" accept=".srt,.vtt" class="px-4 py-2 border-2 border-gray-300 bg-[#DFEEFF]/50 rounded-lg min-w-0 flex-1" placeholder="Subtítulo Principal" @change="(e) => handleOtherFileChange(e, subtitleMainFile, 'primarySubtitleUrl')" />
          <input type="file" accept=".srt,.vtt" class="px-4 py-2 border-2 border-gray-300 bg-[#DFEEFF]/50 rounded-lg min-w-0 flex-1" placeholder="Subtítulo Secundario" @change="(e) => handleOtherFileChange(e, subtitleSecondaryFile, 'secondarySubtitleUrl')" />
        </div>
      </label>
    </div>

    <div class="flex justify-between w-full">
      <button type="submit" class="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3 text-[16px] max-w-32">
        {{ props.modoCrear ? 'Crear' : 'Actualizar' }}
      </button>
      <button v-if="!props.modoCrear" type="button" class="bg-gray-300 px-3 py-2 rounded-md font-medium hover:bg-gray-400 transition-colors cursor-pointer w-1/3 text-[16px] max-w-32" @click="emit('success')">
        Cancelar
      </button>
    </div>
  </form>
</template>
