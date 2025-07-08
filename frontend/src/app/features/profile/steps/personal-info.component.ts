import { Component, OnInit, OnDestroy, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { WizardService } from '../../../core/services/wizard.service';
import { StepPersonalData } from '../../../shared/interfaces/wizard.interface';
import { Subject, Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'step-personal-info',
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `
        <div class="flex flex-col gap-4 py-4">
            <h2 class="text-2xl text-subtitle font-bold text-quinary">Información Personal</h2>
            <form [formGroup]="personalInfoForm">
                <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="name_user" class="block text-sm font-medium text-quinary">Nombre:</label>
                        <input
                            id="name_user"
                            type="text"
                            formControlName="name_user"
                            class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                        @if (personalInfoForm.get('name_user')?.invalid && (personalInfoForm.get('name_user')?.dirty || personalInfoForm.get('name_user')?.touched)) {
                            @if (personalInfoForm.get('name_user')?.errors?.['required']) {
                                <div class="text-red-600 text-sm mt-1">El nombre es requerido.</div>
                            }
                        }
                    </div>

                    <div>
                        <label for="maiden_name_user" class="block text-sm font-medium text-quinary">Apellido de Soltera:</label>
                        <input
                            id="maiden_name_user"
                            type="text"
                            formControlName="maiden_name_user"
                            class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                        @if (personalInfoForm.get('maiden_name_user')?.invalid && (personalInfoForm.get('maiden_name_user')?.dirty || personalInfoForm.get('maiden_name_user')?.touched)) {
                            @if (personalInfoForm.get('maiden_name_user')?.errors?.['required']) {
                                <div class="text-red-600 text-sm mt-1">El apellido de soltera es requerido.</div>
                            }
                        }
                    </div>
                </div>
                
                <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="email_user" class="block text-sm font-medium text-quinary">Email:</label>
                        <input
                            id="email_user"
                            type="email"
                            formControlName="email_user"
                            class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                        @if (personalInfoForm.get('email_user')?.invalid && (personalInfoForm.get('email_user')?.dirty || personalInfoForm.get('email_user')?.touched)) {
                            @if (personalInfoForm.get('email_user')?.errors?.['required']) {
                                <div class="text-red-600 text-sm mt-1">El email es requerido.</div>
                            }
                            @if (personalInfoForm.get('email_user')?.errors?.['email']) {
                                <div class="text-red-600 text-sm mt-1">Por favor, introduce un email válido.</div>
                            }
                        }
                    </div>
                    
                    <div>
                        <label for="username" class="block text-sm font-medium text-quinary">Nombre de Usuario:</label>
                        <input
                            id="username"
                            type="text"
                            formControlName="username"
                            class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                        @if (personalInfoForm.get('username')?.invalid && (personalInfoForm.get('username')?.dirty || personalInfoForm.get('username')?.touched)) {
                            @if (personalInfoForm.get('username')?.errors?.['required']) {
                                <div class="text-red-600 text-sm mt-1">El nombre de usuario es requerido.</div>
                            }
                        }
                    </div>
                </div>

                <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="age_user" class="block text-sm font-medium text-quinary">Edad:</label>
                        <input
                            id="age_user"
                            type="number"
                            formControlName="age_user"
                            class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                        @if (personalInfoForm.get('age_user')?.invalid && (personalInfoForm.get('age_user')?.dirty || personalInfoForm.get('age_user')?.touched)) {
                            @if (personalInfoForm.get('age_user')?.errors?.['min'] || personalInfoForm.get('age_user')?.errors?.['max']) {
                                <div class="text-red-600 text-sm mt-1">La edad debe ser entre 0 y 120.</div>
                            }
                        }
                    </div>

                    <div>
                        <label for="phone_user" class="block text-sm font-medium text-quinary">Teléfono:</label>
                        <input
                            id="phone_user"
                            type="text"
                            formControlName="phone_user"
                            class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                        @if (personalInfoForm.get('phone_user')?.invalid && (personalInfoForm.get('phone_user')?.dirty || personalInfoForm.get('phone_user')?.touched)) {
                            @if (personalInfoForm.get('phone_user')?.errors?.['required']) {
                                <div class="text-red-600 text-sm mt-1">El número de teléfono es requerido.</div>
                            }
                            @if (personalInfoForm.get('phone_user')?.errors?.['pattern']) {
                                <div class="text-red-600 text-sm mt-1">El número de teléfono solo puede contener dígitos (7-15) y opcionalmente un '+' al inicio.</div>
                            }
                        }
                    </div>
                </div>

                <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="birth_date_user" class="block text-sm font-medium text-quinary">Fecha de Nacimiento:</label>
                        <input
                            id="birth_date_user"
                            type="date"
                            formControlName="birth_date_user"
                            class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                        @if (personalInfoForm.get('birth_date_user')?.invalid && (personalInfoForm.get('birth_date_user')?.dirty || personalInfoForm.get('birth_date_user')?.touched)) {
                            @if (personalInfoForm.get('birth_date_user')?.errors?.['required']) {
                                <div class="text-red-600 text-sm mt-1">La fecha de nacimiento es requerida.</div>
                            }
                        }
                    </div>

                    <div>
                        <label for="gender_user" class="block text-sm font-medium text-quinary">Género:</label>
                        <select
                            id="gender_user"
                            formControlName="gender_user"
                            class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Seleccione un género</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                        </select>
                        @if (personalInfoForm.get('gender_user')?.invalid && (personalInfoForm.get('gender_user')?.dirty || personalInfoForm.get('gender_user')?.touched)) {
                            @if (personalInfoForm.get('gender_user')?.errors?.['required']) {
                                <div class="text-red-600 text-sm mt-1">El género es requerido.</div>
                            }
                        }
                    </div>
                </div>

                <div class="mb-4">
                    <label for="image_user" class="block text-sm font-medium text-quinary">Subir Imagen de Perfil:</label>
                    <input
                        id="image_user"
                        type="file"
                        (change)="onFileSelected($event)"
                        class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        accept="image/*"
                    >
                    @if (personalInfoForm.get('image_user')?.invalid && (personalInfoForm.get('image_user')?.dirty || personalInfoForm.get('image_user')?.touched)) {
                        @if (personalInfoForm.get('image_user')?.errors?.['fileType']) {
                            <div class="text-red-600 text-sm mt-1">Por favor, selecciona un archivo de imagen (jpg, jpeg, png, gif, svg).</div>
                        }
                        @if (personalInfoForm.get('image_user')?.errors?.['fileSize']) {
                            <div class="text-red-600 text-sm mt-1">El archivo es demasiado grande (máximo 5MB).</div>
                        }
                    }
                </div>
            </form>
        </div>
    `
})
export class StepPersonalInfoComponent implements OnInit, OnDestroy {
    personalInfoForm!: FormGroup;
    private destroy$ = new Subject<void>();
    private selectedFile: File | null = null;

    constructor(private fb: FormBuilder, private wizardService: WizardService) {
        effect(() => {
            const personalInfoDataFromService = this.wizardService.formData().personalInfo;
            let isDataLoaded = this.wizardService.isDataLoaded();

            if (this.personalInfoForm && personalInfoDataFromService && isDataLoaded) {
                const currentFormValue = this.personalInfoForm.getRawValue() as StepPersonalData;
                const formValueString = JSON.stringify(currentFormValue);
                const serviceDataString = JSON.stringify(personalInfoDataFromService);
                if (formValueString !== serviceDataString) {
                    const { image_user, ...rest } = personalInfoDataFromService;
                    console.log('Updating form with data from service:', rest);
                    this.personalInfoForm.patchValue(rest, { emitEvent: false });
                    this.wizardService.updateStepData('personalInfo', this.personalInfoForm.value, this.personalInfoForm.valid);
                }
            }
        });
    }

    ngOnInit() {
        const loadedData = this.wizardService.formData().personalInfo;
        const internationalPhoneNumberRegex: RegExp = /^\+?\d{7,15}$/;

        this.personalInfoForm = this.fb.group({
            name_user: [loadedData?.name_user || '', Validators.required],
            maiden_name_user: [loadedData?.maiden_name_user || '', Validators.required],
            email_user: [loadedData?.email_user || '', [Validators.required, Validators.email]],
            username: [loadedData?.username || '', Validators.required],
            age_user: [loadedData?.age_user || null, [Validators.required, Validators.min(0), Validators.max(120)]],
            phone_user: [loadedData?.phone_user || '', [Validators.required, Validators.pattern(internationalPhoneNumberRegex)]],
            birth_date_user: [loadedData?.birth_date_user || '', Validators.required],
            gender_user: [loadedData?.gender_user || '', Validators.required],
            // El valor inicial para un campo de tipo file es null o una cadena vacía
            // Los validadores personalizados se aplicarán cuando se seleccione un archivo
            image_user: [null, [this.fileTypeValidator, this.fileSizeValidator]],
        });

        this.personalInfoForm.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((values: StepPersonalData) => {
                // Si 'image_user' no es un URL o un string en el modelo de datos,
                // deberás adaptarlo a cómo manejas el archivo en tu servicio.
                // Por ejemplo, podrías querer enviar el File o una referencia a él.
                this.wizardService.updateStepData('personalInfo', values, this.personalInfoForm.valid);
            });

        this.wizardService.updateStepData('personalInfo', this.personalInfoForm.value, this.personalInfoForm.valid);
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
            // Establece el valor del FormControl. No es el nombre del archivo, sino el objeto File.
            // Esto permite que los validadores personalizados actúen sobre el objeto File.
            this.personalInfoForm.get('image_user')?.setValue(this.selectedFile);
            this.personalInfoForm.get('image_user')?.markAsDirty();
            this.personalInfoForm.get('image_user')?.updateValueAndValidity();
        } else {
            this.selectedFile = null;
            this.personalInfoForm.get('image_user')?.setValue(null);
            this.personalInfoForm.get('image_user')?.markAsDirty();
            this.personalInfoForm.get('image_user')?.updateValueAndValidity();
        }
    }

    fileTypeValidator(control: AbstractControl): ValidationErrors | null {
        const file = control.value as File;
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/jpg'];
            if (!allowedTypes.includes(file.type)) {
                return { fileType: true };
            }
        }
        return null;
    }

    fileSizeValidator(control: AbstractControl): ValidationErrors | null {
        const file = control.value as File;
        if (file) {
            const maxSize = 5 * 1024 * 1024; // 5 MB
            if (file.size > maxSize) {
                return { fileSize: true };
            }
        }
        return null;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}