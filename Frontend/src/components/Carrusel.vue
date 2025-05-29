<script setup>
import { onMounted } from 'vue';
import ImgCarruselDesktop from './ImgCarruselDesktop.vue';
import ImgCarruselMobile from './ImgCarruselMobile.vue';
import img4 from '@/assets/img/img4.avif';
import img5 from '@/assets/img/img5.avif';
import img6 from '@/assets/img/img6.avif';
import img7 from '@/assets/img/img7.jpeg';
import img8 from '@/assets/img/img8.avif';
import img9 from '@/assets/img/img9.avif';
import img10 from '@/assets/img/img10.avif';
import img11 from '@/assets/img/img11.avif';
import img12 from '@/assets/img/img12.avif';


const groupImagesInThrees = (images) => {
    const groupedImages = [];
    for (let i = 0; i < images.length; i += 3) {
        groupedImages.push(images.slice(i, i + 3));
    }
    return groupedImages;
};
const images = [
    { title: 'Recepción moderna', imgUrl: img4 },
    { title: 'Sala de espera', imgUrl: img5 },
    { title: 'Consultorio médico', imgUrl: img6 },
    { title: 'Laboratorio', imgUrl: img7 },
    { title: 'Sala de rehabilitación', imgUrl: img8 },
    { title: 'Área de nutrición', imgUrl: img9 },
    { title: 'Quirófano', imgUrl: img10 },
    { title: 'Farmacia', imgUrl: img11 },
    { title: 'Jardín terapéutico', imgUrl: img12 },
];
const imagesDesktop = groupImagesInThrees(images);


/* Carrusel Desktop */

// Carrusel Desktop (3 en 3)
let currentSlideDesktop = 0;
const totalSlidesDesktop = imagesDesktop.length;

// Auto-play para ambos carruseles
const nextSlideDesktop = () => {
    currentSlideDesktop = (currentSlideDesktop + 1) % totalSlidesDesktop;
    updateCarouselDesktop();
};
let carouselIntervalDesktop = setInterval(nextSlideDesktop, 6000);


const updateCarouselDesktop = () => {
    const carousel = document.getElementById('carousel-inner-desktop');
    if (carousel) {
        carousel.style.transform = `translateX(-${currentSlideDesktop * 100}%)`;

        // Actualizar indicadores desktop
        for (let i = 0; i < totalSlidesDesktop; i++) {
            const indicator = document.getElementById(`indicator-desktop-${i}`);
            if (indicator) {
                if (i === currentSlideDesktop) {
                    indicator.classList.add('bg-secondary');
                    indicator.classList.remove('bg-quaternary/60');
                } else {
                    indicator.classList.remove('bg-secondary');
                    indicator.classList.add('bg-quaternary/60');
                }
            }
        }
    }
};



const onPauseAutoPlayDesktop = () => {
    clearInterval(carouselIntervalDesktop);
};

const onResumeAutoPlayDesktop = () => {
    carouselIntervalDesktop = setInterval(nextSlideDesktop, 6000);
};

const prevSlideDesktop = () => {
    currentSlideDesktop = (currentSlideDesktop - 1 + totalSlidesDesktop) % totalSlidesDesktop;
    updateCarouselDesktop();
};

const goToSlideDesktop = (slideIndex) => {
    currentSlideDesktop = slideIndex;
    updateCarouselDesktop();
};

/* Carrusel Mobile */

let currentSlideMobile = 0;
const totalSlidesMobile = images.length;

// Auto-play para carrusel móvil
const nextSlideMobile = () => {
    currentSlideMobile = (currentSlideMobile + 1) % totalSlidesMobile;
    updateCarouselMobile();
};
let carouselIntervalMobile = setInterval(nextSlideMobile, 4000);



const updateCarouselMobile = () => {
    const carousel = document.getElementById('carousel-inner-mobile');
    const counter = document.getElementById('slide-counter');
    if (carousel) {
        carousel.style.transform = `translateX(-${currentSlideMobile * 100}%)`;
    }
    if (counter) {
        counter.textContent = `${currentSlideMobile + 1} / ${totalSlidesMobile}`;
    }
};

// Inicializar los carruseles al montar el componente
onMounted(updateCarouselDesktop);
onMounted(updateCarouselMobile);

const onPausedAutoPlayMobile = () => {
    clearInterval(carouselIntervalMobile);
};

const onResumedAutoPlayMobile = () => {
    carouselIntervalMobile = setInterval(nextSlideMobile, 4000);
};

const prevSlideMobile = () => {
    currentSlideMobile = (currentSlideMobile - 1 + totalSlidesMobile) % totalSlidesMobile;
    updateCarouselMobile();
};

</script>
<template>
    <section id="galeria" class="py-16 bg-primary">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-bold text-center text-secondary mb-12">Nuestras Instalaciones</h2>

            <!-- Carrusel Desktop (3 en 3) -->
            <div class="hidden lg:block relative">
                <div id="carousel-desktop" @mouseenter="onPauseAutoPlayDesktop" @mouseleave="onResumeAutoPlayDesktop"
                    class="overflow-hidden rounded-lg shadow-lg">
                    <div id="carousel-inner-desktop" class="flex transition-transform duration-500 ease-in-out">
                        <div v-for="group, index in imagesDesktop" :keys="index"
                            class="w-full flex-shrink-0 grid grid-cols-3 gap-4">
                            <ImgCarruselDesktop v-for="(image) in group" :key="image.title" :title="image.title"
                                :imgUrl="image.imgUrl" />
                        </div>
                    </div>
                </div>
                <button @click="prevSlideDesktop"
                    class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-quaternary/80 hover:bg-quaternary/100 rounded-full p-3 shadow-md focus:outline-none z-10 cursor-pointer">
                    <i class="fas fa-chevron-left text-secondary text-xl"></i>
                </button>
                <button @click="nextSlideDesktop"
                    class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-quaternary bg-quaternary/80 hover:bg-quaternary/100 rounded-full p-3 shadow-md focus:outline-none z-10 cursor-pointer">
                    <i class="fas fa-chevron-right text-secondary text-xl"></i>
                </button>
                <!-- Indicadores Desktop -->
                <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    <button @click="() => goToSlideDesktop(0)"
                        class="h-2 w-8 rounded-full bg-quaternary bg-quaternary/60 hover:bg-quaternary/100 transition-all cursor-pointer"
                        id="indicator-desktop-0"></button>
                    <button @click="() => goToSlideDesktop(1)"
                        class="h-2 w-8 rounded-full bg-quaternary bg-quaternary/60 hover:bg-quaternary/100 transition-all cursor-pointer"
                        id="indicator-desktop-1"></button>
                    <button @click="() => goToSlideDesktop(2)"
                        class="h-2 w-8 rounded-full bg-quaternary bg-quaternary/60 hover:bg-quaternary/100 transition-all cursor-pointer"
                        id="indicator-desktop-2"></button>
                </div>
            </div>

            <!-- Carrusel Mobile (1 en 1) -->
            <div class="lg:hidden relative">
                <!-- Contador de slides para móvil -->
                <div
                    class="absolute z-10 top-4 right-4 bg-quinary/50 text-quaternary px-3 py-1 rounded-full text-sm">
                    <span id="slide-counter">1 / {{ imagesDesktop.length }}</span>
                </div>
                <div id="carousel-mobile" @touchstart="onPausedAutoPlayMobile" @touchend="onResumedAutoPlayMobile"
                    class="overflow-hidden rounded-lg shadow-lg">
                    <div id="carousel-inner-mobile" class="flex transition-transform duration-500 ease-in-out">
                        <ImgCarruselMobile v-for="(image) in images" :key="images.title" :title="image.title"
                            :imgUrl="image.imgUrl" />
                    </div>
                </div>
                <button @click="prevSlideMobile"
                    class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-quaternary/80 hover:bg-quaternary/100 rounded-full p-3 shadow-md focus:outline-none z-10 cursor-pointer">
                    <i class="fas fa-chevron-left text-secondary text-xl"></i>
                </button>
                <button @click="nextSlideMobile"
                    class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-quaternary/80 hover:bg-quaternary/100 rounded-full p-3 shadow-md focus:outline-none z-10 cursor-pointer">
                    <i class="fas fa-chevron-right text-secondary text-xl"></i>
                </button>
            </div>
        </div>
    </section>
</template>