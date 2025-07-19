import { Component, OnInit, OnDestroy, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WizardService } from '../../../core/services/wizard.service';
import { StepMedicalData } from '../../../shared/interfaces/wizard.interface';

@Component({
    selector: 'step-medical-info',
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `
        <div class="flex flex-col gap-4 py-4">
        <h2 class="text-2xl text-subtitle font-bold text-quinary">Información Médica</h2>

        <form [formGroup]="medicalInfoForm">
            <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="blood_group_user" class="block text-sm font-medium text-quinary text-paragraph">Grupo Sanguíneo:</label>
                <select
                id="blood_group_user"
                formControlName="blood_group_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none  focus:border-secondary focus:ring-secondary"
                >
                <option value="">Selecciona</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                </select>
                @if (medicalInfoForm.get('blood_group_user')?.invalid && (medicalInfoForm.get('blood_group_user')?.dirty || medicalInfoForm.get('blood_group_user')?.touched)) {
                <div class="text-tertiary text-sm mt-1 text-paragraph">El grupo sanguíneo es requerido.</div>
                }
            </div>

            <div>
                <label for="height_user" class="block text-sm font-medium text-quinary text-paragraph">Estatura (cm):</label>
                <input
                id="height_user"
                type="number"
                formControlName="height_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none  focus:border-secondary focus:ring-secondary"
                >
                @if (medicalInfoForm.get('height_user')?.invalid && (medicalInfoForm.get('height_user')?.dirty || medicalInfoForm.get('height_user')?.touched)) {
                @if (medicalInfoForm.get('height_user')?.errors?.['required']) {
                    <div class="text-tertiary text-sm mt-1 text-paragraph">La estatura es requerida.</div>
                }
                @if (medicalInfoForm.get('height_user')?.errors?.['min'] || medicalInfoForm.get('height_user')?.errors?.['max']) {
                    <div class="text-tertiary text-sm mt-1 text-paragraph">La estatura debe ser entre 50 y 300 cm.</div>
                }
                }
            </div>
            </div>

            <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="weight_user" class="block text-sm font-medium text-quinary text-paragraph">Peso (kg):</label>
                <input
                id="weight_user"
                type="number"
                formControlName="weight_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none  focus:border-secondary focus:ring-secondary"
                >
                @if (medicalInfoForm.get('weight_user')?.invalid && (medicalInfoForm.get('weight_user')?.dirty || medicalInfoForm.get('weight_user')?.touched)) {
                @if (medicalInfoForm.get('weight_user')?.errors?.['required']) {
                    <div class="text-tertiary text-sm mt-1 text-paragraph">El peso es requerido.</div>
                }
                @if (medicalInfoForm.get('weight_user')?.errors?.['min'] || medicalInfoForm.get('weight_user')?.errors?.['max']) {
                    <div class="text-tertiary text-sm mt-1 text-paragraph">El peso debe ser entre 1 y 500 kg.</div>
                }
                }
            </div>

            <div>
                <label for="eye_color_user" class="block text-sm font-medium text-quinary text-paragraph">Color de Ojos:</label>
                <input
                id="eye_color_user"
                type="text"
                formControlName="eye_color_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none  focus:border-secondary focus:ring-secondary"
                >
                @if (medicalInfoForm.get('eye_color_user')?.invalid && (medicalInfoForm.get('eye_color_user')?.dirty || medicalInfoForm.get('eye_color_user')?.touched)) {
                <div class="text-tertiary text-sm mt-1 text-paragraph">El color de ojos es requerido.</div>
                }
            </div>
            </div>

            <div class="mb-4">
            <div>
                <label for="hair_user" class="block text-sm font-medium text-quinary text-paragraph">Color de Cabello:</label>
                <input
                id="hair_user"
                type="text"
                formControlName="hair_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none  focus:border-secondary focus:ring-secondary"
                >
                @if (medicalInfoForm.get('hair_user')?.invalid && (medicalInfoForm.get('hair_user')?.dirty || medicalInfoForm.get('hair_user')?.touched)) {
                <div class="text-tertiary text-sm mt-1 text-paragraph">El color de cabello es requerido.</div>
                }
            </div>
            </div>
        </form>
        </div>
    `,
})
export class StepMedicalComponent implements OnInit, OnDestroy {
    medicalInfoForm!: FormGroup;
    private destroy$ = new Subject<void>();

    constructor(private fb: FormBuilder, private wizardService: WizardService) {
        // Effect para sincronizar datos del servicio al formulario
        effect(() => {
        const serviceFormData = this.wizardService.formData();
        const medicalInfoDataFromService = serviceFormData.medicalInfo;
        const isDataLoaded = this.wizardService.isDataLoaded();

        if (this.medicalInfoForm && medicalInfoDataFromService && isDataLoaded) {
            const currentFormValue = this.medicalInfoForm.getRawValue() as StepMedicalData;
            const formValueString = JSON.stringify(currentFormValue);
            const serviceDataString = JSON.stringify(medicalInfoDataFromService);

            if (formValueString !== serviceDataString) {
            console.log('StepMedicalComponent (effect): Patching form with service data (DB loaded or new data).');
            this.medicalInfoForm.patchValue(medicalInfoDataFromService, { emitEvent: false });
            this.wizardService.updateStepData('medicalInfo', this.medicalInfoForm.value, this.medicalInfoForm.valid);
            }
        }
        });
    }

    ngOnInit() {
        const loadedData = this.wizardService.formData().medicalInfo;

        this.medicalInfoForm = this.fb.group({
            blood_group_user: [loadedData?.blood_group_user || '', Validators.required],
            height_user: [loadedData?.height_user || null, [Validators.required, Validators.min(50), Validators.max(300)]], // Estatura en cm
            weight_user: [loadedData?.weight_user || null, [Validators.required, Validators.min(1), Validators.max(500)]],   // Peso en kg
            eye_color_user: [loadedData?.eye_color_user || '', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]], // Solo letras y espacios
            hair_user: [loadedData?.hair_user || '', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]], // Solo letras y espacios
        });

        // Suscribirse a los cambios del formulario para actualizar el servicio.
        this.medicalInfoForm.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe((values: StepMedicalData) => {
            console.log('StepMedicalComponent (valueChanges): Form value changed, updating service.');
            this.wizardService.updateStepData('medicalInfo', values, this.medicalInfoForm.valid);
        });

        // Notificar al servicio el estado inicial (y la validez) del formulario.
        this.wizardService.updateStepData('medicalInfo', this.medicalInfoForm.value, this.medicalInfoForm.valid);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        console.log('StepMedicalComponent: Destroyed.');
    }
}