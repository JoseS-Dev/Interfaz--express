<script setup>
import { ref, watch, computed, onMounted } from 'vue';
const props = defineProps({
    refresh: {
        type: Boolean,
        required: true
    }
});

const tipographyData = ref([]);
const loadFonts = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Tipography`);
        if (!response.ok) throw new Error(`Error de API: ${response.status}`);
        const data = await response.json();
        tipographyData.value = data.data;
    } catch (error) {
        error.value = error.message;
        console.error('Error al cargar las tipografias:', error);
    }
}

onMounted(() => {
    loadFonts();
});

watch(() => props.refresh, (newVal) => {
    console.log('Prop refresh cambió, recargando tipografias...', newVal);
    loadFonts();
})

const onSelectFont = async (id) => {
    const id_user = 1; //OJO
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Tipography/select`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_user,
                id_tipography: id,
            })
        });
        if (!response.ok) throw new Error(`Error de API: ${response.status}`);
        loadFonts();
    } catch (error) {
        error.value = error.message;
        console.error('Error al seleccionar tipografia:', error);
    }
}

const onDeleteFont = async (id) => {
    const font = tipographyData.value.find(font => font.id_tipography === id);
    if (font.is_selected === 1) {
        try {
            const id_user = 1;
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Tipography/select`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_user,
                    id_tipography: 1,
                })
            });
            if (!response.ok) throw new Error(`Error de API: ${response.status}`);
            
        } catch (error) {
            error.value = error.message;
            console.error('Error al deseleccionar tipografia:', error);
        }
    };
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Tipography/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(`Error de API: ${response.status}`);
        loadFonts();
    } catch (error) {
        error.value = error.message;
        console.error('Error al eliminar tipografia:', error);
    }
}
</script>

<template>
    <article class="w-full h-145 my-2 p-3 overflow-y-auto flex flex-col items-center gap-3 max-h-140">
        <div v-for="font in tipographyData" :key="font.id_tipography" @click="onSelectFont(font.id_tipography)" class="flex justify-around items-center w-full h-1/8 border-b-2 border-blue-800" :style="font.is_selected === 1 ? 'background-color: #BFCEDF;' : ''">
            <h4 class="font-bold text-lg tracking-widest px-3">{{font.id_tipography}}</h4>
            <span class="font-sans text-lg flex-grow-30 basis-0">{{ font.name_tipography_main.length <= 12 ? font.name_tipography_main : font.name_tipography_main.slice(0, 12) + '...' }} </span>
            <span class="font-serif text-lg flex-grow-30 basis-0">{{ font.name_tipography_secondary.length <= 12 ? font.name_tipography_secondary : font.name_tipography_secondary.slice(0, 12)+'...' }}</span>
            <div class="flex gap-3 flex-grow-30 basis-0">
                <span class="font-bold" title="tam_title">{{ `${font.tam_title}px` }}</span>
                <span class="font-bold" title="tam_subtitle">{{ `${font.tam_subtitle}px` }}</span>
                <span class="font-bold" title="tam_paragraph">{{ `${font.tam_paragraph}px` }}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" @click.stop="onDeleteFont(font.id_tipography)"
                    class="lucide lucide-trash2-icon lucide-trash-2 hover:text-red-600 transition-colors duration-300 cursor-pointer" :style="font.id_tipography === 1 ? 'visibility: hidden;' : ''">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
        </div>
        <div>
            
        </div>
    </article>
</template>