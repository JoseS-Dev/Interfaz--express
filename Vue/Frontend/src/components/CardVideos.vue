<template>
    <div class="flex flex-col min-w-0 gap-6 p-2 px-4 grow-30 basis-0">
      <div class="w-full h-auto cursor-pointer" @click="openModal">
        <template v-if="previewData.videoUrl">
          <!-- Audios ocultos para la vista previa -->
          <audio v-if="previewData.primaryAudioUrl" ref="previewPrimaryAudioRef" :src="previewData.primaryAudioUrl" loop></audio>
          <audio v-if="previewData.secondaryAudioUrl" ref="previewSecondaryAudioRef" :src="previewData.secondaryAudioUrl" loop></audio>
          <video
            ref="previewVideoRef"
            :key="`preview-${previewData.videoUrl}`"
            :src="previewData.videoUrl"
            class="object-cover w-full h-auto max-w-full rounded-lg pointer-events-none"
            muted
            autoplay
            loop
            @play="handlePreviewPlay"
            @pause="handlePreviewPause"
            @timeupdate="handlePreviewSeek"
            crossorigin="anonymous"
          >
            <track v-if="previewData.primarySubtitleUrl" kind="subtitles" :src="previewData.primarySubtitleUrl" srclang="es" label="Español" />
            <track v-if="previewData.secondarySubtitleUrl" kind="subtitles" :src="previewData.secondarySubtitleUrl" srclang="en" label="Inglés" />
          </video>
        </template>
        <template v-else>
          <div class="flex items-center justify-center w-full h-48 bg-gray-200 rounded-md">
            <p class="text-gray-500">Selecciona un video y sus pistas</p>
          </div>
        </template>
      </div>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" @click="closeModal">
      <div class="relative flex flex-col w-11/12 max-w-4xl p-4 bg-white rounded-lg shadow-xl md:p-6" @click.stop>
        <svg @click="closeModal" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="absolute text-3xl text-gray-700 transition-colors duration-200 cursor-pointer lucide lucide-circle-x top-2 right-2 hover:text-red-500"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
        <h3 class="mb-4 text-2xl font-bold text-center border-b-2 border-gray-200 md:mb-6">Reproductor de Video</h3>
        <div class="flex flex-col gap-4 md:flex-row md:gap-8">
          <div class="flex-1">
            <div class="flex flex-wrap gap-4 mb-4">
              <!-- Selector de Audio -->
              <div>
                <label class="mr-2 font-semibold">Audio:</label>
                <select v-model="activeAudio" @change="switchAudioTrack($event.target.value)" class="px-2 py-1 border rounded" :disabled="!previewData.primaryAudioUrl && !previewData.secondaryAudioUrl">
                  <option value="none">Sin audio</option>
                  <option value="primary" :disabled="!previewData.primaryAudioUrl">Opción 1</option>
                  <option value="secondary" :disabled="!previewData.secondaryAudioUrl">Opción 2</option>
                </select>
              </div>
              <!-- Selector de Subtítulos -->
              <div>
                <label class="mr-2 font-semibold">Subtítulos:</label>
                <select v-model="activeSubtitle" class="px-2 py-1 border rounded" :disabled="!previewData.primarySubtitleUrl && !previewData.secondarySubtitleUrl">
                  <option value="none">Sin subtítulos</option>
                  <option value="es" :disabled="!previewData.primarySubtitleUrl">Opción 1</option>
                  <option value="en" :disabled="!previewData.secondarySubtitleUrl">Opción 2</option>
                </select>
              </div>
            </div>

            <!-- Elementos multimedia de la modal -->
            <audio v-if="previewData.primaryAudioUrl" ref="modalPrimaryAudioRef" :src="previewData.primaryAudioUrl"></audio>
            <audio v-if="previewData.secondaryAudioUrl" ref="modalSecondaryAudioRef" :src="previewData.secondaryAudioUrl"></audio>
            <video ref="modalVideoRef" :key="`modal-${previewData.videoUrl}`" :src="previewData.videoUrl ?? ''" class="w-full h-auto rounded-md" controls autoplay muted @play="handleModalPlay" @pause="handleModalPause" @timeupdate="handleModalSeek" crossorigin="anonymous">
              <track v-if="previewData.primarySubtitleUrl" kind="subtitles" :src="previewData.primarySubtitleUrl" srclang="es" label="Español" />
              <track v-if="previewData.secondarySubtitleUrl" kind="subtitles" :src="previewData.secondarySubtitleUrl" srclang="en" label="Inglés" />
            </video>
          </div>
          <div class="flex-1 max-w-xs p-4 bg-gray-100 rounded-lg">
            <h4 class="mb-2 text-xl font-semibold border-b-2 border-gray-300">Detalles del Archivo</h4>
            <ul v-if="previewData.videoMetadata && previewData.videoMetadata.fileName" class="space-y-2 text-gray-700 break-words">
              <li><strong class="text-gray-900">Nombre:</strong> {{ previewData.videoMetadata.fileName }}</li>
              <li><strong class="text-gray-900">Formato:</strong> {{ previewData.videoMetadata.fileFormat }}</li>
              <li><strong class="text-gray-900">Duración:</strong> {{ previewData.videoMetadata.duration }}</li>
              <li><strong class="text-gray-900">Tamaño:</strong> {{ previewData.videoMetadata.size }}</li>
            </ul>
            <p v-else class="text-sm italic text-gray-500">No hay metadatos disponibles.</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  previewData: {
    type: Object,
    required: true,
  },
});

const isModalOpen = ref(false);

// --- Referencias para la VISTA PREVIA ---
const previewVideoRef = ref(null);
const previewPrimaryAudioRef = ref(null);
const previewSecondaryAudioRef = ref(null);

// --- Referencias para la MODAL ---
const modalVideoRef = ref(null);
const modalPrimaryAudioRef = ref(null);
const modalSecondaryAudioRef = ref(null);

// --- Estado Global para el componente ---
const activeAudio = ref('none');
const activeSubtitle = ref('none');

// --- Lógica de Sincronización ---
const switchAudioTrack = (newTrack) => {
  [modalPrimaryAudioRef, modalSecondaryAudioRef, previewPrimaryAudioRef, previewSecondaryAudioRef].forEach(ref => ref.value?.pause());

  const currentVideoTime = modalVideoRef.value?.currentTime || previewVideoRef.value?.currentTime || 0;
  const wasPlaying = !modalVideoRef.value?.paused || !previewVideoRef.value?.paused;

  activeAudio.value = newTrack;

  const newModalAudio = newTrack === 'primary' ? modalPrimaryAudioRef.value : modalSecondaryAudioRef.value;
  if (isModalOpen.value && newModalAudio) {
    newModalAudio.currentTime = currentVideoTime;
    if (wasPlaying) newModalAudio.play();
  }

  const newPreviewAudio = newTrack === 'primary' ? previewPrimaryAudioRef.value : previewSecondaryAudioRef.value;
  if (!isModalOpen.value && newPreviewAudio) {
    newPreviewAudio.currentTime = currentVideoTime;
    if (wasPlaying) newPreviewAudio.play();
  }
};

// --- Controladores de eventos para la MODAL ---
const handleModalPlay = () => (activeAudio.value === 'primary' ? modalPrimaryAudioRef.value?.play() : modalSecondaryAudioRef.value?.play());
const handleModalPause = () => {
  modalPrimaryAudioRef.value?.pause();
  modalSecondaryAudioRef.value?.pause();
};
const handleModalSeek = () => {
  const videoTime = modalVideoRef.value?.currentTime || 0;
  const activeAudioEl = activeAudio.value === 'primary' ? modalPrimaryAudioRef.value : modalSecondaryAudioRef.value;
  if (activeAudioEl) activeAudioEl.currentTime = videoTime;
};

// --- Controladores de eventos para la VISTA PREVIA ---
const handlePreviewPlay = () => (activeAudio.value === 'primary' ? previewPrimaryAudioRef.value?.play() : previewSecondaryAudioRef.value?.play());
const handlePreviewPause = () => {
  previewPrimaryAudioRef.value?.pause();
  previewSecondaryAudioRef.value?.pause();
};
const handlePreviewSeek = () => {
  const videoTime = previewVideoRef.value?.currentTime || 0;
  const activeAudioEl = activeAudio.value === 'primary' ? previewPrimaryAudioRef.value : previewSecondaryAudioRef.value;
  if (activeAudioEl) activeAudioEl.currentTime = videoTime;
};

// --- Manejadores de la Modal ---
const openModal = () => {
  if (props.previewData.videoUrl) {
    previewVideoRef.value?.pause();
    handlePreviewPause();
    isModalOpen.value = true;
  }
};

const closeModal = () => {
  modalVideoRef.value?.pause();
  handleModalPause();
  isModalOpen.value = false;
  previewVideoRef.value?.play();
};

// Observador para mostrar/ocultar subtítulos
watch([activeSubtitle, isModalOpen], () => {
  [modalVideoRef, previewVideoRef].forEach(ref => {
    if (ref.value) {
      const tracks = Array.from(ref.value.textTracks);
      tracks.forEach(track => {
        track.mode = track.language === activeSubtitle.value ? 'showing' : 'hidden';
      });
    }
  });
});
</script>
