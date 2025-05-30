<script setup>

</script>

<template>
    <form class="w-full h-152 flex flex-col items-center gap-5 px-2 py-3">
        <div class=" w-full h-22 flex flex-col gap-1">
            <label class="text-xl trancking-wide font-500 w-full border-b-3 border-gray-900" for="primary_color">Color Primario</label>
            <input class="w-full h-full" type="color" placeholder="Ingrese el color primario de la platilla" name="primary_color" id="primary_color" required/>
        </div>
        <div class=" w-full h-22 flex flex-col gap-1">
            <label class="text-xl trancking-wide font-500 w-full border-b-3 border-gray-500" for="secondary_color">Color Secundario</label>
            <input class="w-full h-full" type="color" name="secondary_color" id="secondary_color" required/>
        </div>
        <div class=" w-full h-22 flex flex-col gap-1">
            <label class="text-xl trancking-wide font-500 w-full border-b-3 border-gray-500">Color Terciario</label>
            <input class="w-full h-full" type="color" name="ternary_color" id="ternary_color" required/>
        </div>
        <div class=" w-full h-22 flex flex-col gap-1">
            <label class="text-xl trancking-wide font-500 w-full border-b-3 border-gray-500">Color cuaternario</label>
            <input class="w-full h-full" type="color" name="cuarternary_color" id="cuarternary_color" required/>
        </div>
        <div class=" w-full h-22 flex flex-col gap-1">
            <label class="text-xl trancking-wide font-500 w-full border-b-3 border-gray-500">Color neutral</label>
            <input class="w-full h-full" type="color" name="neutral_color" id="neutral_color" required/>
        </div>
        <button type="submit" class="border-2 border-black w-2/5 h-auto px-2 py-2 bg-gray-700 rounded-xl text-white text-xl cursor-pointer hover:bg-blue-500 hover:border-black hover:font-bold transition-colors duration-300">Guardar</button>
    </form>
</template>