<template>
    <section id="galeria-videos" class="py-16 bg-primary font-primary relative">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl text-subtitle md:text-title font-bold text-center text-secondary mb-12 font-secondary">Galería de Videos</h2>
            <div v-if="loading" class="text-center text-secondary">Cargando videos...</div>
            <div v-if="error" class="text-center text-red-500">{{ error }}</div>
            
            <div v-if="videos.length > 0">
                <!-- Carrusel Desktop -->
                <div class="hidden lg:block relative">
                    <div class="rounded-lg shadow-lg">
                        <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentSlideDesktop * 100}%)` }">
                            <div v-for="(slide, slideIndex) in desktopSlides" :key="slideIndex" class="w-full flex-shrink-0 grid grid-cols-3 gap-4">
                                <CardVideos v-for="(video, videoIndex) in slide" :key="videoIndex" :previewData="video" />
                            </div>
                        </div>
                    </div>
                    <button @click="prevSlideDesktop" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-quaternary/80 hover:bg-quaternary/100 rounded-full p-3 shadow-md focus:outline-none z-10 cursor-pointer">
                        <i class="fas fa-chevron-left text-secondary text-xl text-paragraph"></i>
                    </button>
                    <button @click="nextSlideDesktop" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-quaternary/80 hover:bg-quaternary/100 rounded-full p-3 shadow-md focus:outline-none z-10 cursor-pointer">
                        <i class="fas fa-chevron-right text-secondary text-xl text-paragraph"></i>
                    </button>
                    <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                        <button v-for="(_, index) in desktopSlides" :key="index" @click="goToSlideDesktop(index)" :class="['h-2 w-8 rounded-full transition-all', { 'bg-secondary': index === currentSlideDesktop, 'bg-quaternary/60 hover:bg-quaternary/100': index !== currentSlideDesktop }]"></button>
                    </div>
                </div>

                <!-- Carrusel Mobile -->
                <div class="lg:hidden relative">
                    <div class="absolute z-10 top-4 right-4 bg-quinary/50 text-quaternary px-3 py-1 rounded-full text-sm text-paragraph">
                        <span>{{ currentSlideMobile + 1 }} / {{ videos.length }}</span>
                    </div>
                    <div class=" rounded-lg shadow-lg">
                        <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentSlideMobile * 100}%)` }">
                            <div v-for="(video, index) in videos" :key="index" class="w-full flex-shrink-0">
                                <CardVideos :previewData="video" />
                            </div>
                        </div>
                    </div>
                     <button @click="prevSlideMobile" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-quaternary/80 hover:bg-quaternary/100 rounded-full p-3 shadow-md focus:outline-none z-10 cursor-pointer">
                        <i class="fas fa-chevron-left text-secondary text-xl text-paragraph"></i>
                    </button>
                    <button @click="nextSlideMobile" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-quaternary/80 hover:bg-quaternary/100 rounded-full p-3 shadow-md focus:outline-none z-10 cursor-pointer">
                        <i class="fas fa-chevron-right text-secondary text-xl text-paragraph"></i>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { videoService } from '@/services/videoService';
import CardVideos from './CardVideos.vue';

const videos = ref([]);
const loading = ref(true);
const error = ref(null);

const currentSlideDesktop = ref(0);
const currentSlideMobile = ref(0);

let desktopInterval = null;
let mobileInterval = null;

const formatDuration = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const formatSize = (bytes) => {
  if (isNaN(bytes) || bytes === 0) return "0 KB";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

onMounted(async () => {
    try {
        const rawVideos = await videoService.getSelectedVideos();
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        videos.value = rawVideos.map(video => ({
            videoUrl: `${baseUrl}/video/${video.name_video}`,
            primaryAudioUrl: video.name_audio_main ? `${baseUrl}/audio/${video.name_audio_main}` : undefined,
            secondaryAudioUrl: video.name_audio_secondary ? `${baseUrl}/audio/${video.name_audio_secondary}` : undefined,
            primarySubtitleUrl: video.subtitle_main_video ? `${baseUrl}/subtitle/${video.subtitle_main_video}` : undefined,
            secondarySubtitleUrl: video.subtitle_secondary_video ? `${baseUrl}/subtitle/${video.subtitle_secondary_video}` : undefined,
            videoMetadata: {
              fileName: video.name_video,
              fileFormat: video.format_video,
              duration: formatDuration(video.duration_video),
              size: formatSize(video.size_video),
            }
        }));
        startIntervals();
    } catch (err) {
        error.value = 'No se pudieron cargar los videos.';
        console.error(err);
    } finally {
        loading.value = false;
    }
});

onUnmounted(() => {
    clearInterval(desktopInterval);
    clearInterval(mobileInterval);
});

const desktopSlides = computed(() => {
    const slides = [];
    for (let i = 0; i < videos.value.length; i += 3) {
        slides.push(videos.value.slice(i, i + 3));
    }
    return slides;
});

const nextSlideDesktop = () => {
    currentSlideDesktop.value = (currentSlideDesktop.value + 1) % desktopSlides.value.length;
};

const prevSlideDesktop = () => {
    currentSlideDesktop.value = (currentSlideDesktop.value - 1 + desktopSlides.value.length) % desktopSlides.value.length;
};

const goToSlideDesktop = (index) => {
    currentSlideDesktop.value = index;
};

const nextSlideMobile = () => {
    currentSlideMobile.value = (currentSlideMobile.value + 1) % videos.value.length;
};

const prevSlideMobile = () => {
    currentSlideMobile.value = (currentSlideMobile.value - 1 + videos.value.length) % videos.value.length;
};

const startIntervals = () => {
    if (desktopSlides.value.length > 1) {
        desktopInterval = setInterval(nextSlideDesktop, 6000);
    }
    if (videos.value.length > 1) {
        mobileInterval = setInterval(nextSlideMobile, 4000);
    }
};
</script>
