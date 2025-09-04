import { Component } from "@angular/core";
import { NavbarComponent } from "../../shared/components/navbar.component";
import { WizardComponent } from "./wizard.component";

@Component({
    selector: 'profile-view',
    imports: [NavbarComponent, WizardComponent],
    template: `
        <div class="min-h-[calc(100vh-4rem)] bg-primary">
            <navbar />
            <div class="max-w-4xl mx-auto px-4 py-8 font-primary">
                <div class="bg-quaternary rounded-lg shadow-lg p-6">
                    <div class="mb-8">
                        <h1 class="text-3xl font-bold text-quinary mb-2 text-title">
                            Configuración de Perfil
                        </h1>
                        <p class="text-quinary text-paragraph">
                            Gestiona tu información personal paso a paso
                        </p>

                        <wizard />
                    </div>
                </div>
            </div>
        </div>
    `
})
export class ProfileComponent {}