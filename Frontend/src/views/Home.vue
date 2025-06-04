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

const authStore = useAuthStore();
onMounted(async() => {
    try {
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
    } catch (err) {
        error.value = err.message;
        console.error('Error al obtener colores:', err);
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