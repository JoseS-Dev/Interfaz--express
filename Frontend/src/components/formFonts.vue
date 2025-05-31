<script setup></script>

<template>
    <form class="w-full h-152 flex flex-col items-center gap-2 px-2 py-3">
        <div class="w-full h-22  px-3 flex flex-col gap-2">
            <label class="w-full trancking-widese font-500 border-b-2 border-blue-800 text-lg" for="primary_color">Fuente Principal</label>
            <input class="w-full h-1/2 rounded-sm border-1 border-gray-700 text-center cursor-pointer font-semibold px-3 py-2  bg-gray-300 text-black text-lg" type="file" accept=".ttf" name="primary_color" id="primary_color" required/>
        </div>
        <div class="w-full h-22  px-3 flex flex-col gap-2">
            <label class="w-full trancking-widese font-500 border-b-2 border-blue-800 text-lg" for="secondary_color">Fuente Secundaria</label>
            <input class="w-full h-1/2 rounded-sm border-1 border-gray-700 text-center cursor-pointer font-semibold px-3 py-2  bg-gray-300 text-black text-lg" type="file" name="secondary_color" id="secondary_color" required/>
        </div>
        <div class="w-full h-19  px-3 flex flex-col gap-2">
            <label class="w-full trancking-widese font-500 border-b-2 border-blue-800 text-lg" for="tam_font">Tamaño de las fuentes</label>
            <input class="border-b-2 border-r-2 border-gray-700 rounded-sm outline-none h-3/5 bg-gray-300 px-2 text-black text-lg hover:border-blue-700 placeholder:text-gray-800 focus:border-blue-700 transition-color duration-100" type="text" name="tam_font" id="tam_font" placeholder="Ingrese el tamaño de las fuentes" required/>
        </div>
        <div class="w-full h-19  px-3 flex flex-col gap-1">
            <label class="w-full trancking-widese font-500 border-b-2 border-blue-800 text-lg" for="tam_title">Tamaño de los titulos</label>
            <input class="border-b-2 border-r-2 border-gray-700 rounded-sm outline-none h-3/5 bg-gray-300 px-2 text-black text-lg hover:border-blue-700 placeholder:text-gray-800 focus:border-blue-700 transition-color duration-100" id="tam_title" name="tam_title" placeholder="Ingrese el tamaño de los titulos" required/>
        </div>
        <div class="w-full h-19  px-3 flex flex-col gap-1">
            <label class="w-full trancking-widese font-500 border-b-2 border-blue-800 text-lg" for="tam_subtitle">Tamaño de los subtitulos</label>
            <input class="border-b-2 border-r-2 border-gray-700 rounded-sm outline-none h-3/5 bg-gray-300 px-2 text-black text-lg hover:border-blue-700 placeholder:text-gray-800 focus:border-blue-700 transition-color duration-100" type="text" name="tam_subtitle" id="tam_subtitle" placeholder="Ingrese el tamaño de los subtitulos" required/>
        </div>
        <div class="w-full h-19  px-3 flex flex-col gap-1">
            <label class="w-full trancking-widese font-500 border-b-2 border-blue-800 text-lg" for="tam_paragraph">Tamaño de los párrafos</label>
            <input class="border-b-2 border-r-2 border-gray-700 rounded-sm outline-none h-3/5 bg-gray-300 px-2 text-black text-lg hover:border-blue-700 placeholder:text-gray-800 focus:border-blue-700 transition-color duration-100" type="text" name="tam_paragraph" id="tam_paragraph" placeholder="Ingrese el tamaño de los párrafos" required/>
        </div>
        <button type="submit" class="border-2 my-2 border-black w-2/5 h-auto px-2 py-2 bg-gray-700 rounded-xl text-white text-lg cursor-pointer hover:bg-blue-500 hover:border-black hover:font-bold transition-colors duration-300">Guardar</button>
    </form>
</template>