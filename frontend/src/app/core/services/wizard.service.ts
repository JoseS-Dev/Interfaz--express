// app/core/services/wizard.service.ts

import { Injectable, Signal, signal, WritableSignal, computed, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { WizardData, StepPersonalData, StepAddressData, StepMedicalData, StepProfessionalData, StepCompanyData, StepFinancialData, StepCryptoWalletData } from '../../shared/interfaces/wizard.interface';
import { IUser } from '../../shared/interfaces/user.interface'; 
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class WizardService {
    private apiUrl = environment.baseUrl + '/Users';
    private userId: number; 

    // --- Estado del Wizard con Signals ---
    currentStepIndex: WritableSignal<number> = signal(0);
    // Almacena los datos de cada paso.
    // Inicializamos con un objeto que tiene todas las propiedades del wizard, pero con valores nulos.
    private _formData: WritableSignal<WizardData> = signal({
        personalInfo: null,
        addressInfo: null,
        medicalInfo: null,
        professionalInfo: null,
        companyInfo: null,
        financialInfo: null,
        cryptoWalletInfo: null
    });

    // NUEVA SIGNAL: Indica si los datos iniciales de la BD ya se cargaron
    private _isDataLoaded: WritableSignal<boolean> = signal(false);
    public isDataLoaded: Signal<boolean> = this._isDataLoaded.asReadonly(); // Exponer como readonly
    
    // Exponemos los datos del formulario como una señal de solo lectura.
    public formData: Signal<WizardData> = this._formData.asReadonly();

    // --- Signals para la validez de cada paso (actualizadas por los Step Components) ---
    private _personalInfoValid: WritableSignal<boolean> = signal(false);
    private _addressInfoValid: WritableSignal<boolean> = signal(false);
    private _medicalInfoValid: WritableSignal<boolean> = signal(true); // Asume true si es opcional y no se requiere
    private _professionalInfoValid: WritableSignal<boolean> = signal(false);
    private _companyInfoValid: WritableSignal<boolean> = signal(false);
    private _financialInfoValid: WritableSignal<boolean> = signal(false);
    private _cryptoWalletInfoValid: WritableSignal<boolean> = signal(true); // Asume true si es opcional

    // --- Computed Signals para la validez ---

    // Validez del paso actual para el botón "Siguiente"
    isCurrentStepValid: Signal<boolean> = computed(() => {
        switch (this.currentStepIndex()) {
        case 0: return this._personalInfoValid();
        case 1: return this._addressInfoValid();
        case 2: return this._medicalInfoValid(); 
        case 3: return this._professionalInfoValid();
        case 4: return this._companyInfoValid();
        case 5: return true /* this._financialInfoValid() */;
        case 6: return this._cryptoWalletInfoValid();
        default: return false; // Por si el índice está fuera de rango
        }
    });

    // Validez general del wizard para el botón "Finalizar"
    isWizardValid: Signal<boolean> = computed(() => {
        return this._personalInfoValid() &&
            this._addressInfoValid() &&
            this._medicalInfoValid() &&
            this._professionalInfoValid() &&
            this._companyInfoValid() &&
            /* this._financialInfoValid() */ true &&
            this._cryptoWalletInfoValid(); 
    });

    constructor(private http: HttpClient, private authService: AuthService) {
        this.userId = this.authService.userId || 0; 
        effect(() => {
        // console.log('WizardData changed:', this._formData());
        // console.log('Current Step Index:', this.currentStepIndex());
        // console.log('Is Current Step Valid:', this.isCurrentStepValid());
        // console.log('Is Wizard Valid (Overall):', this.isWizardValid());
        });
    }

    // --- Métodos de Navegación ---

    nextStep(): void {
        if (this.currentStepIndex() < 6 && this.isCurrentStepValid()) { // Max 6 para 7 pasos (0-6)
            this.currentStepIndex.update(index => index + 1);
        } else if (this.currentStepIndex() === 6 && this.isWizardValid()) {
        // Último paso, podrías disparar un evento o un método para finalizar
            console.log('Wizard completo y válido. Listo para enviar.');
        }
    }

    prevStep(): void {
        this.currentStepIndex.update(index => Math.max(0, index - 1));
    }

    resetWizard(): void {
        console.log('Reseteando el wizard a su estado inicial.');
        this.currentStepIndex.set(0);
        this._formData.set({ // Resetea los datos a su estado inicial nulo
        personalInfo: null,
        addressInfo: null,
        medicalInfo: null,
        professionalInfo: null,
        companyInfo: null,
        financialInfo: null,
        cryptoWalletInfo: null
        });
        // Resetea también la validez de los pasos
        this._personalInfoValid.set(false);
        this._addressInfoValid.set(false);
        this._medicalInfoValid.set(false);
        this._professionalInfoValid.set(false);
        this._companyInfoValid.set(false);
        this._financialInfoValid.set(false);
        this._cryptoWalletInfoValid.set(false);
    }

    // --- Métodos para Actualizar Datos y Validez desde los Componentes de Paso ---

    // Este es el método clave que los componentes de cada paso llamarán.
    // Utiliza un tipo genérico T para los datos del paso, lo que lo hace reutilizable.
    updateStepData<T extends keyof WizardData>(stepName: T, data: WizardData[T], isValid: boolean): void {
        this._formData.update(currentData => ({
        ...currentData,
        [stepName]: data
        }));

        // Actualiza la señal de validez específica para el paso.
        // Tendrás un `case` para cada `stepName`.
        switch (stepName) {
        case 'personalInfo': this._personalInfoValid.set(isValid); break;
        case 'addressInfo': this._addressInfoValid.set(isValid); break;
        case 'medicalInfo': this._medicalInfoValid.set(isValid); break;
        case 'professionalInfo': this._professionalInfoValid.set(isValid); break;
        case 'companyInfo': this._companyInfoValid.set(isValid); break;
        case 'financialInfo': this._financialInfoValid.set(isValid); break;
        case 'cryptoWalletInfo': this._cryptoWalletInfoValid.set(isValid); break;
        }
    }

    // --- Métodos para Comunicación con el Backend ---

    // Método para cargar datos de un usuario existente (para edición)
    loadUserData(): Observable<IUser> {
        return this.http.get<{message: string, user: IUser}>(`${this.apiUrl}/${this.userId}`).pipe(
            map(response => {
                const user = response.user;

                // Adaptar formato de fecha para el datepicker si es necesario
                if (
                    user &&
                    typeof user.birth_date_user === 'string' &&
                    user.birth_date_user.includes('T')
                ) {
                    const date = new Date(user.birth_date_user);
                    const yyyy = date.getFullYear();
                    const mm = String(date.getMonth() + 1).padStart(2, '0');
                    const dd = String(date.getDate()).padStart(2, '0');
                    user.birth_date_user = `${yyyy}-${mm}-${dd}`;
                }

                this._formData.set({
                    personalInfo: {
                        name_user: user.name_user,
                        maiden_name_user: user.maiden_name_user,
                        email_user: user.email_user,
                        username: user.username,
                        age_user: user.age_user,
                        phone_user: user.phone_user,
                        birth_date_user: user.birth_date_user,
                        image_user: user.image_user,
                        gender_user: user.gender_user,
                    },
                    addressInfo: {
                        street_address: user.street_address,
                        city_address: user.city_address,
                        state_address: user.state_address,
                        state_code_address: user.state_code_address,
                        postal_code_address: user.postal_code_address,
                        latitude_address: user.latitude_address,
                        longitude_address: user.longitude_address,
                        country_address: user.country_address,
                    },
                    medicalInfo: {
                        blood_group_user: user.blood_group_user,
                        height_user: user.height_user,
                        weight_user: user.weight_user,
                        eye_color_user: user.eye_color_user,
                        hair_user: user.hair_user,
                    },
                    professionalInfo: {
                        university_user: user.university_user,
                        ein_user: user.ein_user,
                        ssn_user: user.ssn_user,
                        role_user: user.role_user, 
                    },
                    companyInfo: {
                        department_company_user: user.department_company_user,
                        company_name_user: user.company_name_user,
                        company_title_user: user.company_title_user,
                        company_street_user: user.company_street_user,
                        company_city_user: user.company_city_user,
                        company_state_user: user.company_state_user,
                        company_state_code_user: user.company_state_code_user,
                        company_postal_code_user: user.company_postal_code_user,
                        company_latitude_user: user.company_latitude_user,
                        company_longitude_user: user.company_longitude_user,
                        company_country_user: user.company_country_user,
                    },
                    financialInfo: {
                        card_expire_user: user.card_expire_user,
                        card_number_user: user.card_number_user,
                        card_type_user: user.card_type_user,
                        currency_user: user.currency_user,
                        iban_user: user.iban_user,
                    },
                    cryptoWalletInfo: {
                        coin_user: user.coin_user,
                        wallet_address_user: user.wallet_address_user,
                        network_user: user.network_user,
                    },
                });
                this._isDataLoaded.set(true); 
                return user;
            }),
            catchError(error => {
                console.error('Error al cargar datos del usuario:', error);
                this.resetWizard(); // Resetea el wizard y la bandera de carga
                return throwError(() => new Error('No se pudieron cargar los datos del usuario.'));
            })
        );
    }


    // Método para obtener los datos finales listos para enviar al backend
    getFinalUserDataForSubmission(): IUser | null {
        const data = this._formData();
        if (!this.isWizardValid()) {
            console.warn('El wizard no está completamente válido para su envío.');
            return null;
        }

        const finalData: Partial<IUser> = {
            // Campos de StepPersonalData
            ...data.personalInfo,
            // Campos de StepAddressData
            ...data.addressInfo,
            // Campos de StepMedicalData
            ...data.medicalInfo,
            // Campos de StepProfessionalData
            ...data.professionalInfo,
            // Campos de StepCompanyData
            ...data.companyInfo,
            // Campos de StepFinancialData
            ...data.financialInfo,
            // Campos de StepCryptoWalletData
            ...data.cryptoWalletInfo,
        };

        return finalData as IUser;
    }

    // Método para enviar los datos al backend
    submitWizard(): Observable<IUser> {
        const dataToSubmit = this.getFinalUserDataForSubmission();

        if (!dataToSubmit) {
            return throwError(() => new Error('Datos del wizard incompletos o inválidos para el envío.'));
        }

        return this.http.patch<IUser>(`${this.apiUrl}/${this.userId}`, dataToSubmit).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(() => new Error(error.message || 'Error del servidor'));
    }
}