<script setup>
import { defineProps } from 'vue';
defineProps({
    title: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div class="aspect-w-16 aspect-h-12">
        <img :src="imgUrl" :alt="title" class="w-full h-64 object-cover rounded-lg">
    </div>
</template>
