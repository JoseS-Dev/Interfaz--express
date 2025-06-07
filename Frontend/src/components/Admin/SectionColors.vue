<script setup>
    import formColors from '../formColors.vue';
    import CardPrevious from '../CardColors.vue';
    import listColors from '../listColors.vue';
    import { defineProps } from 'vue';
    import { ref } from 'vue';

    const refresh = ref(false);
    const colorsPreview = ref({});
    const setColorsPreview = (colors) => {
        colorsPreview.value = colors;
    }
    const setRefreshListColors = () => {
        refresh.value = !refresh.value;
    };
</script>

<template>
    <main class="w-full h-164 flex">
        <section class="w-1/4 h-full border-r-2 border-gray-800 px-3 py-3">
            <article class="flex flex-col items-center  text-xl tracking-widese">
                <h3 class="w-full font-bold border-b-2 border-black text-center">Colores plantilla</h3>
                <formColors :onRefreshListColors="setRefreshListColors" :onRefreshColorsPreview="setColorsPreview"/>
            </article>
        </section>
        <section class="w-3/10 h-164 border-r-2  border-gray-800 flex px-3 py-3">
            <article class=" tems-center text-xl tracking-widese">
                <h3 class="w-full font-bold border-b-2 border-gray text-center">Vista Previa</h3>
                <CardPrevious :colors="colorsPreview"/>
            </article>
        </section>
        <section class="w-1/2 h-164 flex flex-col items-center px-3 py-3">
            <article class="border-b-2 h-1/20 w-full border-black flex justify-between items-center text-xl trackig-widese">
                <h3 class="font-bold">Registro de colores</h3>
            </article>
            <listColors :refresh="refresh"/>
        </section>
    </main>
</template>