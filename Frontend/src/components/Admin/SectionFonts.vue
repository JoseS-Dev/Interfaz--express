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
        <section class="w-2/5 h-full border-2 border-black px-3 py-3">
            <article class="border-b-2 h-1/20 w-full border-black flex justify-between items-center text-xl trackig-widese">
                <h3 class="font-bold">Registro de Fuentes</h3>
                <div class="flex w-20 h-fit items-center justify-evenly gap-2 cursor-pointer ">
                    <svg id="modified" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil hover:text-orange-500 transition-colors duration-300"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                    <svg id="deleted" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2 hover:text-red-600 transition-colors duration-300"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </div>
            </article>
        </section>
    </main>
</template>