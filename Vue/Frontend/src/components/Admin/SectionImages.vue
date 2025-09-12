<script setup>
import FormImages from '@/components/FormImages.vue';
import ListImages from '@/components/ListImages.vue';
</script>

<template>
  <section class="p-4">
    <h2 class="text-xl font-semibold mb-4 text-center">Administrar Imágenes</h2>
    <div class="flex flex-col lg:flex-row gap-6">
      <FormImages />
      <ListImages />
    </div>
  </section>
</template>
