import { Component } from "@angular/core";

@Component({
    selector: 'step-financial-info',
    template: `
        <div class="flex flex-col gap-4">
            <h2 class="text-2xl font-bold">Datos Personales</h2>
            <p>Por favor, completa tus datos personales.</p>
            <!-- Aquí irían los campos del formulario -->
        </div>
    `
})
export class StepFinancialInfoComponent {}