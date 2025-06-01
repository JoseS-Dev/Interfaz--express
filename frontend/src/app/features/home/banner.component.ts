import { Component } from "@angular/core";

@Component({
    standalone: true,
    selector: 'banner',
    template: `
        <section id="inicio" class="relative bg-[url('/assets/img/banner-image.webp')] bg-center bg-cover"> 
            <div class="absolute inset-0 bg-secondary/50"></div>
            <div class="relative z-10 flex items-center justify-center min-h-[500px] md:min-h-[600px] px-4">
                <div class="text-center text-quaternary">
                    <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">Tu Bienestar es Nuestra Prioridad</h1>
                    <p class="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto">Servicios de salud integral para toda la familia</p>
                    <button class="mt-8 bg-tertiary text-quaternary font-medium py-3 px-6 rounded-md transition-colors">
                        Agendar Cita
                    </button>
                </div>
            </div>
        </section>
    `
})
export class BannerComponent {}