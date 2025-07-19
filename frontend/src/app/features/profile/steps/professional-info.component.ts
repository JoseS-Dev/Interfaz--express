// src/app/features/wizard/steps/professional-info/professional-info.component.ts

import { Component, OnInit, OnDestroy, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // Para directivas como @if
import { StepProfessionalData } from '../../../shared/interfaces/wizard.interface';
import { WizardService } from '../../../core/services/wizard.service';

@Component({
    selector: 'step-professional-info',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    template: `
        <div class="flex flex-col gap-4 py-4">
        <h2 class="text-2xl text-subtitle font-bold text-quinary">Información Profesional</h2>

        <form [formGroup]="professionalInfoForm">
            <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="university_user" class="block text-sm font-medium text-quinary text-paragraph">Universidad:</label>
                <input
                id="university_user"
                type="text"
                formControlName="university_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"
                >
                @if (professionalInfoForm.get('university_user')?.invalid && (professionalInfoForm.get('university_user')?.dirty || professionalInfoForm.get('university_user')?.touched)) {
                @if (professionalInfoForm.get('university_user')?.errors?.['required']) {
                    <div class="text-tertiary text-sm mt-1 text-paragraph">La universidad es requerida.</div>
                }
                }
            </div>

            <div>
                <label for="ein_user" class="block text-sm font-medium text-quinary text-paragraph">EIN (Employer Identification Number):</label>
                <input
                id="ein_user"
                type="text"
                formControlName="ein_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"
                >
                @if (professionalInfoForm.get('ein_user')?.invalid && (professionalInfoForm.get('ein_user')?.dirty || professionalInfoForm.get('ein_user')?.touched)) {
                @if (professionalInfoForm.get('ein_user')?.errors?.['pattern']) {
                    <div class="text-tertiary text-sm mt-1 text-paragraph">Formato EIN inválido (ej: XX-XXXXXXX).</div>
                }
                }
            </div>
            </div>

            <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="ssn_user" class="block text-sm font-medium text-quinary text-paragraph">SSN (Social Security Number):</label>
                <input
                id="ssn_user"
                type="text"
                formControlName="ssn_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"
                >
                @if (professionalInfoForm.get('ssn_user')?.invalid && (professionalInfoForm.get('ssn_user')?.dirty || professionalInfoForm.get('ssn_user')?.touched)) {
                @if (professionalInfoForm.get('ssn_user')?.errors?.['pattern']) {
                    <div class="text-tertiary text-sm mt-1 text-paragraph">Formato SSN inválido (ej: XXX-XX-XXXX).</div>
                }
                }
            </div>

            <div>
                <label for="role_user" class="block text-sm font-medium text-quinary text-paragraph">Rol:</label>
                <input
                id="role_user"
                type="text"
                formControlName="role_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary bg-quinary/5"
                readonly
                >
                @if (professionalInfoForm.get('role_user')?.invalid && (professionalInfoForm.get('role_user')?.dirty || professionalInfoForm.get('role_user')?.touched)) {
                @if (professionalInfoForm.get('role_user')?.errors?.['required']) {
                    <div class="text-tertiary text-sm mt-1 text-paragraph">El rol es requerido.</div>
                }
                }
            </div>
            </div>
        </form>
        </div>
    `,
})
export class StepProfessionalComponent implements OnInit, OnDestroy {
    professionalInfoForm!: FormGroup;
    private destroy$ = new Subject<void>();

    constructor(private fb: FormBuilder, private wizardService: WizardService) {
        // Effect para sincronizar datos del servicio al formulario
        effect(() => {
        const serviceFormData = this.wizardService.formData();
        const professionalInfoDataFromService = serviceFormData.professionalInfo;
        const isDataLoaded = this.wizardService.isDataLoaded();

        if (this.professionalInfoForm && professionalInfoDataFromService && isDataLoaded) {
            const currentFormValue = this.professionalInfoForm.getRawValue() as StepProfessionalData;
            const formValueString = JSON.stringify(currentFormValue);
            const serviceDataString = JSON.stringify(professionalInfoDataFromService);

            if (formValueString !== serviceDataString) {
            console.log('StepProfessionalComponent (effect): Patching form with service data (DB loaded or new data).');
            this.professionalInfoForm.patchValue(professionalInfoDataFromService, { emitEvent: false });
            this.wizardService.updateStepData('professionalInfo', this.professionalInfoForm.value, this.professionalInfoForm.valid);
            }
        }
        });
    }

    ngOnInit() {
        const loadedData = this.wizardService.formData().professionalInfo;

        this.professionalInfoForm = this.fb.group({
        university_user: [loadedData?.university_user || '', Validators.required],
        // Regex simple para EIN (XX-XXXXXXX)
        ein_user: [loadedData?.ein_user || '', [Validators.pattern(/^\d{2}-\d{7}$/)]], 
        // Regex simple para SSN (XXX-XX-XXXX)
        ssn_user: [loadedData?.ssn_user || '', [Validators.pattern(/^\d{3}-\d{2}-\d{4}$/)]], 
        role_user: [loadedData?.role_user || '', Validators.required],
        });

        // Suscribirse a los cambios del formulario para actualizar el servicio.
        this.professionalInfoForm.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe((values: StepProfessionalData) => {
            console.log('StepProfessionalComponent (valueChanges): Form value changed, updating service.');
            this.wizardService.updateStepData('professionalInfo', values, this.professionalInfoForm.valid);
        });

        // Notificar al servicio el estado inicial (y la validez) del formulario.
        this.wizardService.updateStepData('professionalInfo', this.professionalInfoForm.value, this.professionalInfoForm.valid);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        console.log('StepProfessionalComponent: Destroyed.');
    }
}