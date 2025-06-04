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
const onSelectColor = async (id) => {
    const color = listColors.value.find((color) => color.id_colors === id);
    const olColor = listColors.value.find((color) => color.is_selected === 1);
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Colors/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                primary_color: color.primary_color,
                secondary_color: color.secondary_color,
                ternary_color: color.ternary_color,
                cuarternary_color: color.cuarternary_color,
                neutral_color: color.neutral_color,
                is_selected: true
            })
        });
        const response2 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Colors/${olColor.id_colors}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                primary_color: olColor.primary_color,
                secondary_color: olColor.secondary_color,
                ternary_color: olColor.ternary_color,
                cuarternary_color: olColor.cuarternary_color,
                neutral_color: olColor.neutral_color,
                is_selected: false
            })
        });
        if (!response.ok) throw new Error(`Error de API: ${response.status}`);
        if (!response2.ok) throw new Error(`Error de API: ${response2.status}`);
        loadColors();
    } catch (err) {
        error.value = err.message;
        console.error('Error al seleccionar paleta de colores:', err);
    }
}

const onDeleteColor = async (id) => {
    const color = listColors.value.find((color) => color.id_colors === id);
    if ( color.is_selected === 1) {
        const olColor = listColors.value.find((color) => color.id_colors === 1);
        const response2 = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Colors/${olColor.id_colors}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                primary_color: olColor.primary_color,
                secondary_color: olColor.secondary_color,
                ternary_color: olColor.ternary_color,
                cuarternary_color: olColor.cuarternary_color,
                neutral_color: olColor.neutral_color,
                is_selected: true
            })
        });
        if (!response2.ok) throw new Error(`Error de API: ${response2.status}`);
    }
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Colors/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(`Error de API: ${response.status}`);
        loadColors();
    } catch (err) {
        error.value = err.message;
        console.error('Error al eliminar paleta de colores:', err);
    }
}
</script>

<template>
    <article class="w-full h-full my-2 overflow-y-auto flex flex-col items-center max-h-140">
        <div v-for="color in listColors" :key="color.id" class="w-full h-1/10">
            <div v-if="color.is_selected === 1"
                class="flex items-center justify-around w-full h-full border-b-2 border-blue-800 my-2 bg-[#BFCEDF] py-0.5"
                :data-id_color="color.id_colors" @click="onSelectColor(color.id_colors)">

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
                <svg v-if="color.id_colors !== 1" id="deleted" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-trash2-icon lucide-trash-2 hover:text-red-600 transition-colors duration-300 cursor-pointer" @click.stop="onDeleteColor(color.id_colors)">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
                <svg v-else id="deleted" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-trash2-icon lucide-trash-2 hover:text-red-600 transition-colors duration-300 invisible">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
            </div>
            <div v-else class="flex items-center justify-around w-full border-b-2 border-blue-800 my-2 h-full py-0.5" @click="onSelectColor(color.id_colors)">

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
                <svg v-if="color.id_colors !== 1" id="deleted" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-trash2-icon lucide-trash-2 hover:text-red-600 transition-colors duration-300 cursor-pointer" @click.stop="onDeleteColor(color.id_colors)">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
                <svg v-else id="deleted" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-trash2-icon lucide-trash-2 hover:text-red-600 transition-colors duration-300 invisible">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
            </div>

        </div>

    </article>
</template>