import { Component, computed, OnInit, Signal, WritableSignal, inject } from "@angular/core";
import { WizardService } from "../../core/services/wizard.service";
import { UsersService } from "../../core/services/users.service";
import { IUser } from "../../shared/interfaces/user.interface";
import { StepPersonalInfoComponent } from "./steps/personal-info.component";
import { StepAddressComponent } from "./steps/address-info.component";
import { StepMedicalComponent } from "./steps/medical-info.component";
import { StepProfessionalComponent } from "./steps/professional-info.component";
import { StepCompanyComponent } from "./steps/company-info.component";
import { StepFinancialComponent } from "./steps/financial-info.component";
import { StepCryptoWalletComponent } from "./steps/crypto-info.component"; 
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: 'wizard',
  standalone: true,
  imports: [
    StepPersonalInfoComponent,
    StepAddressComponent,
    StepMedicalComponent,
    StepProfessionalComponent,
    StepCompanyComponent,
    StepFinancialComponent,
    StepCryptoWalletComponent
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
            <step-financial-info />
          }
          @case (6) {
            <step-crypto-info />
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
            class="px-6 py-2 rounded-md font-medium font-paragraph bg-tertiary/80 text-quaternary hover:bg-tertiary"
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

  router = new Router();

  progress: Signal<string> = computed(() => {
    const currentStep = this.wizardService.currentStepIndex();
    return ((currentStep / 6) * 100).toFixed(0);
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
        this.wizardService.resetWizard();
        this.router.navigate(['']);
        Swal.fire({
            icon: "success",
            title: "¡Perfil actualizado!",
            showConfirmButton: false,
            timer: 1500
        });
      },
      error: (error) => {
        console.error('Error submitting wizard data:', error);
        this.router.navigate(['']);
        Swal.fire({
            icon: "error",
            title: "Error al actualizar el perfil",
            showConfirmButton: false,
            timer: 1500
        });
      }
    });
  }
}