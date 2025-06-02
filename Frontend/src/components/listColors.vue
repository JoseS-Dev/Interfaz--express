<script setup>
import { ref, watch, computed, onMounted } from 'vue';

const props = defineProps({
    refresh: {
        type: Boolean,
        required: true
    }
});

const colorsData = ref([]);
const loading = ref(false);
const error = ref(null);


const loadColors = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Colors`);
        if (!response.ok) throw new Error(`Error de API: ${response.status}`);
        colorsData.value = await response.json();
    } catch (err) {
        error.value = err.message;
        console.error('Error al cargar colores:', err);
    } finally {
        loading.value = false;
    }
};


onMounted(loadColors);


watch(() => props.refresh, (newVal) => {
    console.log('Prop refresh cambió, recargando colores...', newVal);
    loadColors();

});


const listColors = computed(() => colorsData.value);
</script>

<template>
    <article class="w-full h-full my-2 overflow-y-auto flex flex-col items-center gap-3 max-h-140">
        <div v-for="color in listColors" :key="color.id"
            class="flex items-center justify-around w-full h-1/10 border-b-2 border-blue-800 my-2">

            <h4 class="h-4/5 w-1/20 flex justify-center items-center font-bold text-xl">{{ color.id_colors }}</h4>
            <div :class="`border-2 border-black rounded-full w-1/10 h-4/5`"
                :style="`background-color: #${color.primary_color};`" :title="color.primary_color"></div>
            <div :class="`border-2 border-black rounded-full w-1/10 h-4/5`"
                :style="`background-color: #${color.secondary_color}`" :title="color.secondary_color"></div>
            <div :class="`border-2 border-black rounded-full w-1/10 h-4/5`"
                :style="`background-color: #${color.ternary_color}`" :title="color.ternary_color"></div>
            <div :class="`border-2 border-black rounded-full w-1/10 h-4/5`"
                :style="`background-color: #${color.cuarternary_color}`" :title="color.cuarternary_color"></div>
            <div :class="`border-2 border-black rounded-full w-1/10 h-4/5`"
                :style="`background-color: #${color.neutral_color}`" :title="color.neutral_color"></div>
            <i class="fa-solid fa-check text-green-600"></i>
        </div>
    </article>
</template>