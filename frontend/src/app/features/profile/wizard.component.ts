import { Component, computed, OnInit, Signal, WritableSignal, inject } from "@angular/core";
import { WizardService } from "../../core/services/wizard.service";
import { UsersService } from "../../core/services/users.service";
import { IUser } from "../../shared/interfaces/user.interface";
import { StepPersonalInfoComponent } from "./steps/personal-info.component";
import { CommonModule } from "@angular/common";
import { StepAddressComponent } from "./steps/address-info.component";
import { StepMedicalComponent } from "./steps/medical-info.component";
import { StepProfessionalComponent } from "./steps/professional-info.component";
import { StepCompanyComponent } from "./steps/company-info.component"; // Importar CommonModule para @switch y @if

@Component({
  selector: 'wizard',
  standalone: true,
  imports: [
    StepPersonalInfoComponent,
    CommonModule,
    StepAddressComponent,
    StepMedicalComponent,
    StepProfessionalComponent,
    StepCompanyComponent
],
  template: `
    <div class="wizard-container bg-white">
      <div class="mb-8">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-medium text-quinary text-paragraph">
            Paso {{ wizardService.currentStepIndex() + 1 }} de 7
          </span>
          <span class="text-sm text-quinary text-paragraph">
            {{ progress() }}%
          </span>
        </div>
        <div class="w-full bg-quinary/25 rounded-full h-2">
          <div
            class="bg-secondary h-2 rounded-full transition-all duration-300"
            [style.width]="(wizardService.currentStepIndex() / 6) * 100 + '%'"
          ></div>
        </div>
      </div>

      <div class="step-content">
        @switch (wizardService.currentStepIndex()) {
          @case (0) {
            <step-personal-info />
          }
          @case (1) {
            <step-address-info />
          }
          @case (2) {
            <step-medical-info />
          }
          @case (3) {
            <step-professional-info />
          }
          @case (4) {
            <step-company-info />
          }
          @case (5) {
            <p>Este es el Paso 6: Información Financiera</p>
          }
          @case (6) {
            <p>Este es el Paso 7: Cripto Billetera (Opcional)</p>
          }
          @default {
            <p>Paso no encontrado.</p>
          }
        }
      </div>

      <div class="flex justify-between items-center">
        <button
          (click)="wizardService.prevStep()"
          [disabled]="wizardService.currentStepIndex() === 0"
          class="px-6 py-2 rounded-md font-medium text-paragraph bg-quinary/75 text-quaternary hover:bg-quinary/85"
          [class.opacity-50]="wizardService.currentStepIndex() === 0"
          [class.cursor-not-allowed]="wizardService.currentStepIndex() === 0"
        >
          Anterior
        </button>

        @if (wizardService.currentStepIndex() < 6) {
          <button
            (click)="wizardService.nextStep()"
            [disabled]="!wizardService.isCurrentStepValid()"
            class="px-6 py-2 rounded-md font-medium font-paragraph bg-tertiary/80 text-quaternary hover:bg-tertiary"
            [class.opacity-50]="!wizardService.isCurrentStepValid()"
            [class.cursor-not-allowed]="!wizardService.isCurrentStepValid()"
          >
            Siguiente
          </button>
        } @else {
          <button
            (click)="onSubmitWizard()"
            [disabled]="!wizardService.isWizardValid()"
            class="px-6 py-2 rounded-md font-medium font-paragraph bg-green-600 text-white hover:bg-green-700"
            [class.opacity-50]="!wizardService.isWizardValid()"
            [class.cursor-not-allowed]="!wizardService.isWizardValid()"
          >
            Finalizar
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    button {
      transition: all 0.2s ease-in-out;
    }
  `]
})
export class WizardComponent implements OnInit {
  constructor(
    readonly wizardService: WizardService,
  ) {}

  progress: Signal<string> = computed(() => {
    const currentStep = this.wizardService.currentStepIndex();
    return ((currentStep / 7) * 100).toFixed(0);
  });

  ngOnInit(): void {
    // Inicia la carga de datos de la BD. Los datos se guardarán en la Signal del WizardService.
    this.wizardService.loadUserData().subscribe({
      next: (userData: IUser) => {
        console.log("WizardComponent: User data loaded successfully and updated in service:", userData);
      },
      error: (error) => {
        console.error("WizardComponent: Error loading user data:", error);
      }
    });
  }

  onSubmitWizard(): void {
    this.wizardService.submitWizard().subscribe({
      next: (response) => {
        console.log('Wizard data submitted successfully:', response);
        alert('Perfil actualizado/creado con éxito!');
        this.wizardService.resetWizard();
      },
      error: (error) => {
        console.error('Error submitting wizard data:', error);
        alert('Error al guardar el perfil: ' + error.message);
      }
    });
  }
}