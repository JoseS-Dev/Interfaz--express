<script setup>
import { defineProps } from 'vue';
defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
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
    <div class="text-center">
        <div class="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
            <img :src="imgUrl" :alt="title" class="w-full h-full object-cover">
        </div>
        <h3 class="text-xl font-semibold text-secondary mb-2">{{ title }}</h3>
        <p class="text-quinary">{{ description }}</p>
    </div>
</template>