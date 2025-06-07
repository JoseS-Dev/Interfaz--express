<script setup>
    import formFonts from '../formFonts.vue';
    import CardFonts from '../CardFonts.vue';
    import listFonts from '../listFonts.vue';
    import { ref } from 'vue';
    const refresh = ref(false);
    const tipographyPreview = ref({});
    const setTipographyPreview = (tipography) => {
        tipographyPreview.value = tipography;
    }
    const setRefreshListFonts = () => {
        refresh.value = !refresh.value;
    }
</script>

<template>
    <main class="w-full h-164 flex">
        <section class="w-3/10 h-full border-r-2 border-gray-800 px-3 py-3">
            <article class="text-xl flex flex-col items-center tracking-widese">
                <h3 class="w-full font-bold text-center border-b-2 border-black">Configuración de Fuentes</h3>
                <formFonts :onRefreshListFonts="setRefreshListFonts" :onRefreshFontsPreview="setTipographyPreview"/>
            </article>
        </section>
        <section class="border-r-2 border-gray-800 w-3/10 h-full px-3 py-3">
            <article class="text-xl h-full flex flex-col items-center tracking-widese">
                <h3 class="w-full font-bold text-center border-b-2 border-black">Vista Previa</h3>
                <CardFonts :fonts="tipographyPreview"/>
            </article>
        </section>
        <section class="w-2/5 h-full px-3 py-3">
            <article class="border-b-2 h-1/20 w-full border-black flex justify-between items-center text-xl trackig-widese">
                <h3 class="font-bold">Registro de Fuentes</h3>
            </article>
            <listFonts :refresh="refresh"/>
        </section>
    </main>
</template>