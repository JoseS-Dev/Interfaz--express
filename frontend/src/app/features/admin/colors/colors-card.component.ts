import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
    standalone: true,
    selector: 'colors-card',
    imports: [NgStyle],
    template: `
        <article class="text-xl flex flex-col items-center tracking-wide">
        <h3 class="w-full font-bold text-center border-b-2 border-black">Vista Previa</h3>
        <div
            class="w-full max-w-4xl mx-auto rounded-lg shadow-md p-8 my-8 flex flex-col items-center"
            [ngStyle]="{'background-color': '#' + primaryColor || '#DFEEFF'}"
        >
            <div
            class="text-center max-w-3xl w-full rounded-lg shadow-lg border-2 p-6"
            [ngStyle]="{
                'background-color': '#' + quaternaryColor || '#FFFFFF',
                'border-color': '#' + primaryColor || '#DFEEFF'
            }"
            >
            <div class="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                <img src="../assets/img/img1.avif" alt="Consulta Médica" class="w-full h-full object-cover" />
            </div>
            <h3
                class="text-2xl font-semibold mb-2"
                [ngStyle]="{'color': '#' + secondaryColor || '#2563EB'}"
            >
                Consulta Médica
            </h3>
            <p
                class="text-xl mb-8"
                [ngStyle]="{'color': '#' + neutralColor || '#374151'}"
            >
                Atención médica personalizada con profesionales especializados
            </p>
            <button
                class="font-medium py-3 px-6 rounded-md transition-colors cursor-pointer text-xl"
                [ngStyle]="{
                'background-color': '#' + ternaryColor || '#F97316',
                'color': '#' + quaternaryColor || '#FFFFFF'
                }"
            >
            {{'#' + ternaryColor || '#F97316'}}
                Agendar Cita
            </button>
            </div>
        </div>
        </article>
    `,
})
export class ColorsCardComponent {
    @Input() primaryColor: string = 'DFEEFF';
    @Input() secondaryColor: string = '2563EB';
    @Input() ternaryColor: string = 'F97316';
    @Input() quaternaryColor: string = 'FFFFFF';
    @Input() neutralColor: string = '374151';
}
