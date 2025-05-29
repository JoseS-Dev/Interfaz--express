<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import LoginModal from './components/LoginModal.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <Navbar />
  <LoginModal />
  <RouterView />
  <Footer />
</template>

