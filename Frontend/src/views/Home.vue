<script setup>
import Banner from '@/components/Banner.vue';
import Services from '@/components/Services.vue';
import Carrusel from '@/components/Carrusel.vue';
import ContactForm from '@/components/ContactForm.vue';
import Navbar from '@/components/Navbar.vue';
import LoginModal from '@/components/LoginModal.vue';
import Footer from '@/components/Footer.vue';

import { useAuthStore } from '@/store/AuthStore';

const authStore = useAuthStore();

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