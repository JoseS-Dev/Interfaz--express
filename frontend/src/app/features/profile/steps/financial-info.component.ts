// src/app/features/wizard/steps/financial-info/financial-info.component.ts

import { Component, OnInit, OnDestroy, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { WizardService } from '../../../core/services/wizard.service';
import { StepFinancialData } from '../../../shared/interfaces/wizard.interface'; 
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'step-financial-info',
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `
        <div class="flex flex-col gap-4 py-4">
            <h2 class="text-2xl text-subtitle font-bold text-quinary">Información Financiera</h2>

            <form [formGroup]="financialInfoForm">
                <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="card_type_user" class="block text-sm font-medium text-quinary">Tipo de Tarjeta:</label>
                        <select
                        id="card_type_user"
                        formControlName="card_type_user" 
                        class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Selecciona</option>
                            <option value="Visa">Visa</option>
                            <option value="MasterCard">MasterCard</option>
                            <option value="American Express">American Express</option>
                        </select>
                        @if (financialInfoForm.get('card_type_user')?.invalid && (financialInfoForm.get('card_type_user')?.dirty || financialInfoForm.get('card_type_user')?.touched)) {
                            <div class="text-red-600 text-sm mt-1">El tipo de tarjeta es requerido.</div>
                        }
                    </div>

                    <div>
                        <label for="card_number_user" class="block text-sm font-medium text-quinary">Número de Tarjeta:</label>
                        <input
                        id="card_number_user"
                        type="text"
                        formControlName="card_number_user"
                        placeholder="XXXX XXXX XXXX XXXX"
                        class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                        @if (financialInfoForm.get('card_number_user')?.invalid && (financialInfoForm.get('card_number_user')?.dirty || financialInfoForm.get('card_number_user')?.touched)) {
                            @if (financialInfoForm.get('card_number_user')?.errors?.['required']) {
                                <div class="text-red-600 text-sm mt-1">El número de tarjeta es requerido.</div>
                            }
                            @if (financialInfoForm.get('card_number_user')?.errors?.['pattern']) {
                                <div class="text-red-600 text-sm mt-1">Formato de número de tarjeta inválido (16 dígitos).</div>
                            }
                        }
                    </div>
                </div>

                <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="card_expire_user" class="block text-sm font-medium text-quinary">Fecha de Expiración (MM/AA):</label>
                        <input
                        id="card_expire_user"
                        type="text"
                        formControlName="card_expire_user"
                        placeholder="MM/AA"
                        class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                        @if (financialInfoForm.get('card_expire_user')?.invalid && (financialInfoForm.get('card_expire_user')?.dirty || financialInfoForm.get('card_expire_user')?.touched)) {
                            @if (financialInfoForm.get('card_expire_user')?.errors?.['required']) {
                                <div class="text-red-600 text-sm mt-1">La fecha de expiración es requerida.</div>
                            }
                            @if (financialInfoForm.get('card_expire_user')?.errors?.['pattern']) {
                                <div class="text-red-600 text-sm mt-1">Formato de fecha inválido (MM/AA).</div>
                            }
                            @if (financialInfoForm.get('card_expire_user')?.errors?.['cardExpired']) {
                                <div class="text-red-600 text-sm mt-1">La tarjeta ha expirado.</div>
                            }
                        }
                    </div>

                    <div>
                        <label for="currency_user" class="block text-sm font-medium text-quinary">Moneda:</label>
                        <select
                        id="currency_user"
                        formControlName="currency_user"
                        class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Selecciona</option>
                            <option value="USD">Dólar Estadounidense (USD)</option>
                            <option value="EUR">Euro (EUR)</option>
                            <option value="GBP">Libra Esterlina (GBP)</option>
                            <option value="JPY">Yen Japonés (JPY)</option>
                            <option value="CAD">Dólar Canadiense (CAD)</option>
                            <option value="AUD">Dólar Australiano (AUD)</option>
                            <option value="MXN">Peso Mexicano (MXN)</option>
                            <option value="VES">Bolívar Soberano (VES)</option>
                            <option value="Other">Otra</option>
                        </select>
                        @if (financialInfoForm.get('currency_user')?.invalid && (financialInfoForm.get('currency_user')?.dirty || financialInfoForm.get('currency_user')?.touched)) {
                            <div class="text-red-600 text-sm mt-1">La moneda es requerida.</div>
                        }
                    </div>
                </div>

                <div class="mb-4">
                <div>
                    <label for="iban_user" class="block text-sm font-medium text-quinary">IBAN:</label>
                    <input
                    id="iban_user"
                    type="text"
                    formControlName="iban_user"
                    placeholder="Ej: ES91 2100 0418 4502 0005 1332"
                    class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                    @if (financialInfoForm.get('iban_user')?.invalid && (financialInfoForm.get('iban_user')?.dirty || financialInfoForm.get('iban_user')?.touched)) {
                    @if (financialInfoForm.get('iban_user')?.errors?.['required']) {
                        <div class="text-red-600 text-sm mt-1">El IBAN es requerido.</div>
                    }
                    @if (financialInfoForm.get('iban_user')?.errors?.['pattern']) {
                        <div class="text-red-600 text-sm mt-1">Formato de IBAN inválido.</div>
                    }
                    }
                </div>
                </div>
            </form>
        </div>
    `,
})
export class StepFinancialComponent implements OnInit, OnDestroy {
    financialInfoForm!: FormGroup;
    private destroy$ = new Subject<void>();

    constructor(private fb: FormBuilder, private wizardService: WizardService) {
        // Effect para sincronizar datos del servicio al formulario
        effect(() => {
            const serviceFormData = this.wizardService.formData();
            const financialInfoDataFromService = serviceFormData.financialInfo;
            const isDataLoaded = this.wizardService.isDataLoaded();

            if (this.financialInfoForm && financialInfoDataFromService && isDataLoaded) {
                const currentFormValue = this.financialInfoForm.getRawValue() as StepFinancialData;
                const formValueString = JSON.stringify(currentFormValue);
                const serviceDataString = JSON.stringify(financialInfoDataFromService);

                if (formValueString !== serviceDataString) {
                console.log('StepFinancialComponent (effect): Patching form with service data (DB loaded or new data).');
                this.financialInfoForm.patchValue(financialInfoDataFromService, { emitEvent: false });
                this.wizardService.updateStepData('financialInfo', this.financialInfoForm.value, this.financialInfoForm.valid);
                }
            }
        });
    }

    ngOnInit() {
        const loadedData = this.wizardService.formData().financialInfo;

        this.financialInfoForm = this.fb.group({
            card_type_user: [loadedData?.card_type_user || '', Validators.required],
            // Validar 16 dígitos para el número de tarjeta (ignorando espacios o guiones para validación simple)
            card_number_user: [loadedData?.card_number_user || '', [Validators.required, Validators.pattern(/^\d{16}$/)]], // Acepta 16 dígitos
            // Validar formato MM/AA (ej: 12/28) y también una fecha válida en el futuro
            card_expire_user: [loadedData?.card_expire_user || '', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/), this.futureDateValidator]],
            currency_user: [loadedData?.currency_user || '', Validators.required],
            // Validar IBAN (puedes usar un regex más estricto si es necesario, este es básico)
            iban_user: [loadedData?.iban_user || '', [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9]{2}[a-zA-Z0-9]{1,30}$/)]],
        });

        // Suscribirse a los cambios del formulario para actualizar el servicio.
        this.financialInfoForm.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe((values: StepFinancialData) => {
            console.log('StepFinancialComponent (valueChanges): Form value changed, updating service.');
            this.wizardService.updateStepData('financialInfo', values, this.financialInfoForm.valid);
        });

        // Notificar al servicio el estado inicial (y la validez) del formulario.
        this.wizardService.updateStepData('financialInfo', this.financialInfoForm.value, this.financialInfoForm.valid);
    }

    // Custom validator para la fecha de expiración
    futureDateValidator(control: { value: string; }) {
        if (!control.value) {
            return null; // Deja que Validators.required se encargue
        }

        const [monthStr, yearStr] = control.value.split('/');
        if (!monthStr || !yearStr) {
            return { 'invalidDate': true };
        }

        const month = parseInt(monthStr, 10);
        const year = parseInt(`20${yearStr}`, 10); // Asume años 20XX

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // getMonth() es 0-indexado
        const currentYear = currentDate.getFullYear();

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            return { 'cardExpired': true };
        }
        return null;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        console.log('StepFinancialComponent: Destroyed.');
    }
}