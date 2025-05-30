<script setup>
    import { ref, onMounted } from 'vue';
    const onToggleLogin = () => {
        const modal = document.getElementById('loginModal');
        modal.classList.toggle('hidden');
    };
    onMounted(() => {
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('loginModal');
            if (event.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });
    
</script>

<template>
    <div id="loginModal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div class="bg-quaternary p-8 rounded-lg shadow-lg w-11/12 max-w-md">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-secondary">Acceso Administrador</h2>
                <button @click="onToggleLogin" class="text-quinary hover:text-secondary cursor-pointer">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form>
                <div class="mb-4">
                    <label class="block text-quinary text-sm font-bold mb-2">Usuario</label>
                    <input type="text" class="w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary bg-primary/50">
                </div>
                <div class="mb-6">
                    <label class="block text-quinary text-sm font-bold mb-2">Contraseña</label>
                    <input type="password" class="w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary bg-primary/50">
                </div>
                <div class="flex justify-between">
                    <button type="button" @click="onToggleLogin" class="bg-quinary/70 text-quaternary px-4 py-2 rounded-md hover:bg-quinary/50 cursor-pointer">Cancelar</button>
                    <button type="submit" @click="$router.push('/admin')" class="bg-secondary text-quaternary px-4 py-2 rounded-md hover:bg-secondary/75 cursor-pointer">Ingresar</button>
                </div>
            </form>
        </div>
    </div>
</template>