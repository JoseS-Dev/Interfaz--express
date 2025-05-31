<script setup>
    import formColors from '../formColors.vue';
    import CardPrevious from '../CardPrevious.vue';
    import listColors from '../tableColors.vue';
</script>

<template>
    <main class="w-full h-164 flex border-2 border-black">
        <section class="w-1/4 h-full border-r-2 border-black px-3 py-3">
            <article class="flex flex-col items-center text-lg tracking-widese">
                <h3 class="w-full font-bold border-b-2 border-gray text-center">Colores plantilla</h3>
                <formColors/>
            </article>
        </section>
        <section class="w-3/10 h-164 border-r-2 flex px-3 py-3">
            <article class=" tems-center text-lg tracking-widese">
                <h3 class="w-full font-bold border-b-2 border-gray text-center">Vista Previa</h3>
                <CardPrevious/>
            </article>
        </section>
        <section class="w-1/2 h-164 flex flex-col items-center px-3 py-3">
            <article class="border-b-2 h-1/20 w-full border-black items-center text-lg trackig-widese">
                <h3 class="font-bold">Colores en la DB</h3>
                <div>
                    <!--SVG-->
                </div>
            </article>
            <listColors/>
        </section>
    </main>
</template>