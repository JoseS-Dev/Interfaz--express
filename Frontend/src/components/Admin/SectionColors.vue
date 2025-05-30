<script setup>
    import formColors from '../formColors.vue';
</script>

<template>
    <main class="w-full h-164 flex border-2 border-black">
        <section class="w-2/5 h-full border-r-2 border-black px-3 py-3">
            <article class="flex flex-col items-center text-lg tracking-widese">
                <h3 class="w-full font-bold border-b-2 border-gray text-center">Colores plantilla</h3>
                <formColors/>
            </article>
        </section>
    </main>
</template>