<script setup>
import Banner from '@/components/Banner.vue';
import Services from '@/components/Services.vue';
import Carrusel from '@/components/Carrusel.vue';
import ContactForm from '@/components/ContactForm.vue';
import Navbar from '@/components/Navbar.vue';
import LoginModal from '@/components/LoginModal.vue';
import Footer from '@/components/Footer.vue';

import { useAuthStore } from '@/store/AuthStore';
import { onMounted } from 'vue';
import getNameFont from '@/utilities/getNameFont';

const authStore = useAuthStore();
const loadFont = (nameFont, font) => {
    return new Promise((resolve) => {
        // Sanear el nombre: eliminar extensión y caracteres no permitidos
        const sanitizedFontName = nameFont.replace(/\.[^/.]+$/, "") // Elimina extensión
                                         .replace(/[^a-zA-Z0-9\-]/g, "-"); // Reemplaza caracteres inválidos
        
        const fontName = `Custom-${sanitizedFontName}-${Date.now()}`;
        
        // Agregar comillas simples a la URL
        const url = `url('${import.meta.env.VITE_BACKEND_URL}/font/${nameFont}')`;
        
        const fontFace = new FontFace(fontName, url, {
            style: 'normal',
            weight: '100 900',
            display: 'swap',
        });
        
        fontFace.load()
            .then((loadedFont) => {
                document.fonts.add(loadedFont);
                resolve(fontName);
            })
            .catch((error) => {
                console.error('Error al cargar la fuente:', error);
                // Fallback a fuente segura
                resolve("Arial");
            });
    });
};

onMounted(async() => {
    try {

        /* Obtener colores */
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Colors`);
        if (!response.ok) throw new Error(`Error de API: ${response.status}`);
        const listColors = await response.json();
        const selectedColor = listColors.find((color) => color.is_selected === 1);
        if (!selectedColor) throw new Error('No se encontraron colores');
        const root = document.documentElement;
        root.style.setProperty('--color-primary', `#${selectedColor.primary_color}`);
        root.style.setProperty('--color-secondary', `#${selectedColor.secondary_color}`);
        root.style.setProperty('--color-tertiary', `#${selectedColor.ternary_color}`);
        root.style.setProperty('--color-quaternary', `#${selectedColor.cuarternary_color}`);
        root.style.setProperty('--color-quinary', `#${selectedColor.neutral_color}`);
        console.log('Colores obtenidos correctamente', `#${selectedColor.primary_color}`);

        /* Obtener fuentes */
        const otherResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Tipography`);
        if (!otherResponse.ok) throw new Error(`Error de API: ${otherResponse.status}`);
        const listFonts = (await otherResponse.json()).data;
        const selectedFont = listFonts.find((font) => font.is_selected === 1);
        if (!selectedFont) throw new Error('No se encontro una fuente seleccionada');
        const primaryFont = await loadFont(selectedFont.name_tipography_main, getNameFont(selectedFont.archive_font_main));
        const secondaryFont = await loadFont(selectedFont.name_tipography_secondary, getNameFont(selectedFont.archive_font_secondary));


        root.style.setProperty('--font-primary', `'${primaryFont}'`);
        root.style.setProperty('--font-secondary', `'${secondaryFont}'`);
        root.style.setProperty('--text-title', `${selectedFont.tam_title}px`);
        root.style.setProperty('--text-subtitle', `${selectedFont.tam_subtitle}px`);
        root.style.setProperty('--text-paragraph', `${selectedFont.tam_paragraph}px`);

        console.log('Fuentes Cargadas Correctamente');

    } catch (err) {
        const error = err.message;
        console.error('Error al cargar los estilos seleccionados:', error);
    }
})
</script>

<template>
    <Navbar />
    <LoginModal v-if="!authStore.isAuthenticated"/>
    <Banner />
    <Services />
    <Carrusel />
    <ContactForm />
    <Footer />
</template>