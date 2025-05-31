<script setup>
    import formFonts from '../formFonts.vue';
    import CardFonts from '../CardFonts.vue';
</script>

<template>
    <main class="border-2 border-black w-full h-164 flex">
        <section class="w-3/10 h-full border-r-2 border-black px-3 py-3">
            <article class="text-xl flex flex-col items-center tracking-widese">
                <h3 class="w-full font-bold text-center border-b-2 border-black">Configuración de Fuentes</h3>
                <formFonts/>
            </article>
        </section>
        <section class="border-2 border-black w-3/10 h-full px-3 py-3">
            <article class="text-xl flex flex-col items-center tracking-widese">
                <h3 class="w-full font-bold text-center border-b-2 border-black">Vista Previa</h3>
                <CardFonts/>
            </article>
        </section>
    </main>
</template>