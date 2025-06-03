import { Component } from "@angular/core";

@Component({
    standalone: true,
    selector: 'banner',
    template: `
        <section id="inicio" class="relative bg-[url('/assets/img/banner-image.webp')] bg-center bg-cover"> 
            <div class="absolute inset-0 bg-secondary/50"></div>
            <div class="relative z-10 flex items-center justify-center min-h-[500px] md:min-h-[600px] px-4">
                <div class="text-center text-quaternary">
                    <h1 class="font-bold mb-4 font-secondary text-title">Tu Bienestar es Nuestra Prioridad</h1>
                    <p class="max-w-3xl mx-auto font-primary text-paragraph">Servicios de salud integral para toda la familia</p>
                    <button class="mt-8 bg-tertiary text-quaternary font-medium py-3 px-6 rounded-md transition-colors font-primary text-paragraph">
                        Agendar Cita
                    </button>
                </div>
            </div>
        </section>
    `
})
export class BannerComponent {}