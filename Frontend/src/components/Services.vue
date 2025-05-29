<script setup>
import Service from './Service.vue';
import img1 from '@/assets/img/img1.avif';
import img2 from '@/assets/img/img2.avif';
import img3 from '@/assets/img/img3.avif';
const services = [
    {
        title: 'Consulta Médica',
        description: 'Atención médica personalizada con profesionales especializados',
        imgUrl: img1,
    },
    {
        title: 'Terapia Física',
        description: 'Rehabilitación y tratamiento para mejorar tu movilidad',
        imgUrl: img2,
    },
    {
        title: 'Nutrición',
        description: 'Planes alimenticios personalizados para tu bienestar',
        imgUrl: img3,
    },
]
</script>

<template>
    <section id="servicios" class="py-16 bg-quaternary">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-bold text-center text-secondary mb-12">Nuestros Servicios</h2>
            <div class="grid md:grid-cols-3 gap-8">
                <Service v-for="(service) in services" :key="service.title" :title="service.title"
                    :description="service.description" :imgUrl="service.imgUrl" />
            </div>
        </div>
    </section>
</template>