<script setup>
import { computed } from 'vue';
const props = defineProps({
    colors: {
        type: Object,
        required: true
    }
})
const primaryColor = computed(() => {
    return props.colors.primary_color || 'DFEEFF'
})
const secondaryColor = computed(() => {
    return props.colors.secondary_color || '2563EB'
})
const ternaryColor = computed(() => {
    return props.colors.ternary_color || 'F97316'
})
const quaternaryColor = computed(() => {
    return props.colors.cuarternary_color || 'FFFFFF'
})
const neutralColor = computed(() => {
    return props.colors.neutral_color || '374151'
})
</script>

<template>
    <div class="w-full bg-primary py-2" :style="`background-color: #${primaryColor};`">

        <div
            class="text-center rounded-lg h-110 flex flex-col items-center justify-center my-5 bg-quaternary w-17/20 m-auto shadow-lg border-2 border-primary" :style="`background-color: #${quaternaryColor}; border-color: #${primaryColor};`">
            <div class="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                <img src="../assets/img/img1.avif" alt="Consulta Médica" class="w-full h-full object-cover">
            </div>
            <h3 class="text-2xl font-semibold text-secondary mb-2" :style="`color: #${secondaryColor};`">Consulta Médica</h3>
            <p class="text-quinary text-xl" :style="`color: #${neutralColor};`">Atención médica personalizada con profesionales especializados</p>
            <button
                class="mt-8 bg-tertiary text-quaternary font-medium py-3 px-6 rounded-md transition-colors cursor-pointer text-xl" :style="`background-color: #${ternaryColor}; color: #${quaternaryColor};`">
                Agendar Cita
            </button>
        </div>
    </div>
</template>