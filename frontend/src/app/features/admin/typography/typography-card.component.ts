import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  standalone: true,
  selector: 'typography-card',
  imports: [NgStyle],
  template: `
        <article class="text-xl flex flex-col items-center tracking-widese">
          <h3 class="w-full font-bold text-center border-b-2 border-black">Vista Previa</h3>
            <div
              class="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 my-8 flex flex-col items-center"
            >
              <div class="text-center max-w-3xl w-full">
                <h1
                  class="font-bold mb-6"
                  [ngStyle]="{
                    'font-size.px': titleSize,
                    'font-family': primaryFont ? primaryFont : 'inherit' 
                  }"
                >
                  Tu Bienestar es Nuestra Prioridad
                </h1>
                <p
                  [ngStyle]="{
                    'font-size.px': subtitleSize,
                    'font-family': secondaryFont ? secondaryFont : 'inherit'
                  }"
                  class="mb-8"
                >
                  Servicios de salud integral para toda la familia
                </p>
                <button
                  class="bg-tertiary text-white font-semibold py-3 px-8 rounded-md shadow-sm transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  [ngStyle]="{
                    'font-family': primaryFont ? primaryFont : 'inherit',
                    'font-size.px': paragraphSize
                  }"
                  type="button"
                >
                  Agendar Cita
                </button>
              </div>
            </div>
        </article>
  `,
})
export class TypographyCardComponent {
  @Input() titleSize: number = 36;       
  @Input() subtitleSize: number = 24;    
  @Input() paragraphSize: number = 16;   
  @Input() primaryFont: string = ''; // URL de la fuente principal
  @Input() secondaryFont: string = ''; // URL de la fuente secundaria
}
