import { Component } from "@angular/core";

@Component({
    standalone: true,
    selector: 'services',
    template: `
        <section id="servicios" class="py-16 bg-quaternary">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="font-bold text-center text-secondary mb-12 font-secondary text-title">Nuestros Servicios</h2>
            <div class="grid md:grid-cols-3 gap-8">
                <!-- Servicio 1 -->
                <div class="text-center">
                    <div class="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                        <img src="./assets/img/img1.avif" alt="Consulta Médica" class="w-full h-full object-cover">
                    </div>
                    <h3 class="font-semibold text-secondary mb-2 font-primary text-subtitle">Consulta Médica</h3>
                    <p class="text-quinary font-primary text-paragraph">Atención médica personalizada con profesionales especializados</p>
                </div>
                <!-- Servicio 2 -->
                <div class="text-center">
                    <div class="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                        <img src="./assets/img/banner-image.webp" alt="Terapia Física" class="w-full h-full object-cover">
                    </div>
                    <h3 class="font-semibold text-secondary mb-2 font-primary text-subtitle">Terapia Física</h3>
                    <p class="text-quinary font-primary text-paragraph">Rehabilitación y tratamiento para mejorar tu movilidad</p>
                </div>
                <!-- Servicio 3 -->
                <div class="text-center">
                    <div class="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                        <img src="./assets/img/img3.avif" alt="Nutrición" class="w-full h-full object-cover">
                    </div>
                    <h3 class="font-semibold text-secondary mb-2 font-primary text-subtitle">Nutrición</h3>
                    <p class="text-quinary font-primary text-paragraph">Planes alimenticios personalizados para tu bienestar</p>
                </div>
            </div>
        </div>
        </section>
`
})
export class ServicesComponent {}