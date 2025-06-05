<script setup>
import { computed } from 'vue';


const props = defineProps({
    fonts: {
        type: Object,
        required: true
    }
});

const primaryFont = computed(() => {
    return props.fonts.primaryFont || 'RobotoSans';
})

const secondaryFont = computed(() => {
    return props.fonts.secondaryFont || 'RobotoSerif';
})

const textTitle = computed(() => {
    return props.fonts.textTitle || '36';
})

const textSubtitle = computed(() => {
    return props.fonts.textSubtitle || '24';
})

const textParagraph = computed(() => {
    return props.fonts.textParagraph || '16';
})

</script>

<template>
    <div class="w-full h-120 border-2 border-black flex flex-col items-center justify-center p-5 my-2 rounded-lg">
        <div class="text-center ">
            <h1 class="text-md md:text-5xl font-bold mb-4" :style="`font-family: ${secondaryFont}; font-size: ${textTitle}px;`">Tu Bienestar es Nuestra Prioridad</h1>
            <p class="text-sm sm:text-2xl max-w-3xl mx-auto" :style="`font-family: ${primaryFont}; font-size: ${textSubtitle}px;`">Servicios de salud integral para toda la familia</p>
            <button class="mt-8 bg-[#F97316] text-white font-medium py-3 px-6 rounded-md transition-colors" :style="`font-family: ${primaryFont}; font-size: ${textParagraph}px;`">
                Agendar Cita
            </button>
        </div>
    </div>
</template>