<script setup>
</script>

<template>
    <section id="contacto" class="py-16 bg-quaternary scroll-smooth font-primary">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl text-subtitle md:text-title font-bold text-center text-secondary mb-12 font-secondary">Contáctanos</h2>
            <div class="max-w-2xl mx-auto">
                <form class="space-y-6">
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-quinary mb-2 text-paragraph">Nombre</label>
                            <input type="text" class="bg-primary/50 w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary text-quinary">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-quinary mb-2 text-paragraph">Teléfono</label>
                            <input type="tel" class="bg-primary/50 w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary text-quinary">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-quinary mb-2 text-paragraph">Email</label>
                        <input type="email" class="bg-primary/50 w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary text-quinary">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-quinary mb-2 text-paragraph">Mensaje</label>
                        <textarea rows="4" class="bg-primary/50 w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary resize-none text-quinary"></textarea>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="bg-tertiary text-quaternary px-8 py-3 rounded-md font-medium hover:bg-tertiary/75 transition-colors cursor-pointer text-paragraph">
                            Enviar Mensaje
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>