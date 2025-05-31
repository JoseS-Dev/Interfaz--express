<script setup>
    const onClickMobileBtn = () => {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('hidden');
    };

    const onToggleLogin = () => {
        const modal = document.getElementById('loginModal');
        modal.classList.toggle('hidden');
    };

    const onClickLinkMobile = () => {
        document.getElementById('mobile-menu').classList.add('hidden');
    };
</script>

<template>
    <nav class="bg-quaternary shadow-sm sticky top-0 z-50 scroll-smooth font-primary">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <h1 class="text-xl font-bold text-secondary font-secondary text-subtitle">Bienestar Total</h1>
                </div>
                <!-- Mobile menu button -->
                <div class="md:hidden">
                    <button @click="onClickMobileBtn" id="mobile-menu-button" class="text-quinary hover:text-secondary focus:outline-none cursor-pointer">
                        <i class="fas fa-bars text-xl text-subtitle"></i>
                    </button>
                </div>
                <!-- Desktop menu -->
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-4">
                        <a href="#inicio" class="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium scroll-smooth text-paragraph">Inicio</a>
                        <a href="#servicios" class="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium text-paragraph">Servicios</a>
                        <a href="#galeria" class="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium text-paragraph">Galería</a>
                        <a href="#contacto" class="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium text-paragraph">Contacto</a>
                        <button @click="onToggleLogin" class="bg-secondary hover:bg-secondary/75 text-quaternary px-4 py-2 rounded-md text-sm font-medium cursor-pointer text-paragraph">Admin</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Mobile menu, show/hide based on menu state -->
        <div id="mobile-menu" class="hidden md:hidden bg-quaternary">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a @click="onClickLinkMobile" href="#inicio" class="block text-quinary hover:text-secondary px-3 py-2 text-base font-medium text-paragraph">Inicio</a>
                <a @click="onClickLinkMobile" href="#servicios" class="block text-quinary hover:text-secondary px-3 py-2 text-base font-medium text-paragraph">Servicios</a>
                <a @click="onClickLinkMobile" href="#galeria" class="block text-quinary hover:text-secondary px-3 py-2 text-base font-medium text-paragraph">Galería</a>
                <a @click="onClickLinkMobile" href="#contacto" class="block text-quinary hover:text-secondary px-3 py-2 text-base font-medium text-paragraph">Contacto</a>
                <button @click="onToggleLogin" class="w-full text-left bg-secondary text-quaternary px-3 py-2 rounded-md text-base font-medium hover:bg-secondary/75 cursor-pointer text-paragraph">Admin</button>
            </div>
        </div>
    </nav>
</template>