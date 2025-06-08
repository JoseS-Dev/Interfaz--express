<script setup>
import Header from '@/components/Admin/Header.vue';
import SectionFonts from '@/components/Admin/SectionFonts.vue';
import { useAuthStore } from '@/store/AuthStore';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(async() => {
    await authStore.loadListFonts();
})
</script>

<template>
    <Header />
    <SectionFonts />
</template>