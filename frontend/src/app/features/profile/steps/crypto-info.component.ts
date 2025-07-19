import { Component, OnInit, OnDestroy, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { WizardService } from '../../../core/services/wizard.service'; 
import { StepCryptoWalletData } from '../../../shared/interfaces/wizard.interface'; 
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // Para directivas como @if

@Component({
    selector: 'step-crypto-info',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    template: `
        <div class="flex flex-col gap-4 py-4">
        <h2 class="text-2xl text-subtitle font-bold text-quinary">Información de Cripto Billetera (Opcional)</h2>

        <form [formGroup]="cryptoWalletForm">
            <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="coin_user" class="block text-sm font-medium text-quinary text-paragraph">Criptomoneda:</label>
                <select
                id="coin_user"
                formControlName="coin_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"
                >
                <option value="">Selecciona</option>
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="USDT">Tether (USDT)</option>
                <option value="BNB">Binance Coin (BNB)</option>
                <option value="XRP">XRP</option>
                <option value="ADA">Cardano (ADA)</option>
                <option value="SOL">Solana (SOL)</option>
                <option value="Other">Otra</option>
                </select>
                @if (cryptoWalletForm.get('coin_user')?.invalid && (cryptoWalletForm.get('coin_user')?.dirty || cryptoWalletForm.get('coin_user')?.touched)) {
                    @if (cryptoWalletForm.get('coin_user')?.errors?.['required']) {
                        <div class="text-tertiary text-sm mt-1 text-paragraph">La criptomoneda es requerida.</div>
                    }
                }
            </div>

            <div>
                <label for="wallet_address_user" class="block text-sm font-medium text-quinary text-paragraph">Dirección de Billetera:</label>
                <input
                id="wallet_address_user"
                type="text"
                formControlName="wallet_address_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"
                placeholder="Ej: 1A1zP1eQp5fGk..."
                >
                @if (cryptoWalletForm.get('wallet_address_user')?.invalid && (cryptoWalletForm.get('wallet_address_user')?.dirty || cryptoWalletForm.get('wallet_address_user')?.touched)) {
                    @if (cryptoWalletForm.get('wallet_address_user')?.errors?.['required']) {
                        <div class="text-tertiary text-sm mt-1 text-paragraph">La dirección de la billetera es requerida.</div>
                    }
                    @if (cryptoWalletForm.get('wallet_address_user')?.errors?.['pattern']) {
                        <div class="text-tertiary text-sm mt-1 text-paragraph">La dirección de la billetera es inválida (ej: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa).</div>
                    }
                }
            </div>
            </div>

            <div class="mb-4">
            <div>
                <label for="network_user" class="block text-sm font-medium text-quinary text-paragraph">Red (Blockchain):</label>
                <input
                id="network_user"
                type="text"
                formControlName="network_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary"
                placeholder="Ej: ERC-20, BEP-20, TRC-20..."
                >
                @if (cryptoWalletForm.get('network_user')?.invalid && (cryptoWalletForm.get('network_user')?.dirty || cryptoWalletForm.get('network_user')?.touched)) {
                    @if (cryptoWalletForm.get('network_user')?.errors?.['required']) {
                        <div class="text-tertiary text-sm mt-1 text-paragraph">La red es requerida.</div>
                    }
                }
            </div>
            </div>
        </form>
        </div>
    `,
})
export class StepCryptoWalletComponent implements OnInit, OnDestroy {
    cryptoWalletForm!: FormGroup;
    private destroy$ = new Subject<void>();

    constructor(private fb: FormBuilder, private wizardService: WizardService) {
        // Effect para sincronizar datos del servicio al formulario
        effect(() => {
        const serviceFormData = this.wizardService.formData();
        const cryptoWalletDataFromService = serviceFormData.cryptoWalletInfo;
        const isDataLoaded = this.wizardService.isDataLoaded();

        if (this.cryptoWalletForm && cryptoWalletDataFromService && isDataLoaded) {
            const currentFormValue = this.cryptoWalletForm.getRawValue() as StepCryptoWalletData;
            const formValueString = JSON.stringify(currentFormValue);
            const serviceDataString = JSON.stringify(cryptoWalletDataFromService);

            if (formValueString !== serviceDataString) {
            console.log('StepCryptoWalletComponent (effect): Patching form with service data (DB loaded or new data).');
            this.cryptoWalletForm.patchValue(cryptoWalletDataFromService, { emitEvent: false });
            this.wizardService.updateStepData('cryptoWalletInfo', this.cryptoWalletForm.value, this.cryptoWalletForm.valid);
            }
        }
        });
    }

    ngOnInit() {
        const loadedData = this.wizardService.formData().cryptoWalletInfo;

        this.cryptoWalletForm = this.fb.group({
        coin_user: [loadedData?.coin_user || '', Validators.required],
        // Validación básica para dirección de billetera (puede ser más específica según la moneda/red)
        wallet_address_user: [loadedData?.wallet_address_user || '', [Validators.required, Validators.pattern(/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/)]], // Ejemplo para Bitcoin
        network_user: [loadedData?.network_user || '', Validators.required],
        });

        // Suscribirse a los cambios del formulario para actualizar el servicio.
        this.cryptoWalletForm.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe((values: StepCryptoWalletData) => {
            console.log('StepCryptoWalletComponent (valueChanges): Form value changed, updating service.');
            this.wizardService.updateStepData('cryptoWalletInfo', values, this.cryptoWalletForm.valid);
        });

        // Notificar al servicio el estado inicial (y la validez) del formulario.
        this.wizardService.updateStepData('cryptoWalletInfo', this.cryptoWalletForm.value, this.cryptoWalletForm.valid);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        console.log('StepCryptoWalletComponent: Destroyed.');
    }
}