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
    <div class="w-full flex-shrink-0">
        <img :src="imgUrl" :alt="title" class="w-full h-64 sm:h-80 object-cover rounded-lg">
    </div>
</template>
