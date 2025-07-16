// src/app/features/wizard/steps/company-info/company-info.component.ts

import { Component, OnInit, OnDestroy, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WizardService } from '../../../core/services/wizard.service';
import { StepCompanyData } from '../../../shared/interfaces/wizard.interface';

// Importaciones de Leaflet
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Map, tileLayer, marker, Icon, Marker, LatLngExpression, LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

// Configuración global para los iconos de Leaflet (importante para que se muestren correctamente)
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

@Component({
    selector: 'step-company-info',
    standalone: true,
    imports: [ReactiveFormsModule, LeafletModule], // Asegúrate de incluir LeafletModule
    template: `
        <div class="flex flex-col gap-4 py-4">
        <h2 class="text-2xl text-subtitle font-bold text-quinary">Información de la Empresa</h2>

        <form [formGroup]="companyInfoForm">
            <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="department_company_user" class="block text-sm font-medium text-quinary">Departamento:</label>
                <input
                id="department_company_user"
                type="text"
                formControlName="department_company_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                @if (companyInfoForm.get('department_company_user')?.invalid && (companyInfoForm.get('department_company_user')?.dirty || companyInfoForm.get('department_company_user')?.touched)) {
                @if (companyInfoForm.get('department_company_user')?.errors?.['required']) {
                    <div class="text-red-600 text-sm mt-1">El departamento es requerido.</div>
                }
                }
            </div>

            <div>
                <label for="company_name_user" class="block text-sm font-medium text-quinary">Nombre de la Empresa:</label>
                <input
                id="company_name_user"
                type="text"
                formControlName="company_name_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                @if (companyInfoForm.get('company_name_user')?.invalid && (companyInfoForm.get('company_name_user')?.dirty || companyInfoForm.get('company_name_user')?.touched)) {
                @if (companyInfoForm.get('company_name_user')?.errors?.['required']) {
                    <div class="text-red-600 text-sm mt-1">El nombre de la empresa es requerido.</div>
                }
                }
            </div>
            </div>

            <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="company_title_user" class="block text-sm font-medium text-quinary">Título/Cargo:</label>
                <input
                id="company_title_user"
                type="text"
                formControlName="company_title_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                @if (companyInfoForm.get('company_title_user')?.invalid && (companyInfoForm.get('company_title_user')?.dirty || companyInfoForm.get('company_title_user')?.touched)) {
                @if (companyInfoForm.get('company_title_user')?.errors?.['required']) {
                    <div class="text-red-600 text-sm mt-1">El título/cargo es requerido.</div>
                }
                }
            </div>

            <div>
                <label for="company_street_user" class="block text-sm font-medium text-quinary">Calle y Número (Empresa):</label>
                <input
                id="company_street_user"
                type="text"
                formControlName="company_street_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                readonly
                >
                @if (companyInfoForm.get('company_street_user')?.invalid && (companyInfoForm.get('company_street_user')?.dirty || companyInfoForm.get('company_street_user')?.touched)) {
                <div class="text-red-600 text-sm mt-1">La calle y número de la empresa son requeridos.</div>
                }
            </div>
            </div>

            <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="company_city_user" class="block text-sm font-medium text-quinary">Ciudad (Empresa):</label>
                <input
                id="company_city_user"
                type="text"
                formControlName="company_city_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                readonly
                >
                @if (companyInfoForm.get('company_city_user')?.invalid && (companyInfoForm.get('company_city_user')?.dirty || companyInfoForm.get('company_city_user')?.touched)) {
                <div class="text-red-600 text-sm mt-1">La ciudad de la empresa es requerida.</div>
                }
            </div>

            <div>
                <label for="company_state_user" class="block text-sm font-medium text-quinary">Estado/Provincia (Empresa):</label>
                <input
                id="company_state_user"
                type="text"
                formControlName="company_state_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                readonly
                >
                @if (companyInfoForm.get('company_state_user')?.invalid && (companyInfoForm.get('company_state_user')?.dirty || companyInfoForm.get('company_state_user')?.touched)) {
                <div class="text-red-600 text-sm mt-1">El estado/provincia de la empresa es requerido.</div>
                }
            </div>
            </div>

            <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="company_state_code_user" class="block text-sm font-medium text-quinary">Código de Estado (Empresa):</label>
                <input
                id="company_state_code_user"
                type="text"
                formControlName="company_state_code_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                @if (companyInfoForm.get('company_state_code_user')?.invalid && (companyInfoForm.get('company_state_code_user')?.dirty || companyInfoForm.get('company_state_code_user')?.touched)) {
                    @if (companyInfoForm.get('company_state_code_user')?.errors?.['required']) {
                        <div class="text-red-600 text-sm mt-1">El código de estado es requerido.</div>
                    }
                    @if (companyInfoForm.get('company_state_code_user')?.errors?.['pattern']) {
                        <div class="text-red-600 text-sm mt-1">El código de estado debe ser de 2 letras mayúsculas (ej: CA, NY).</div>
                    }
                }
            </div>

            <div>
                <label for="company_postal_code_user" class="block text-sm font-medium text-quinary">Código Postal (Empresa):</label>
                <input
                id="company_postal_code_user"
                type="text"
                formControlName="company_postal_code_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                readonly
                >
                @if (companyInfoForm.get('company_postal_code_user')?.invalid && (companyInfoForm.get('company_postal_code_user')?.dirty || companyInfoForm.get('company_postal_code_user')?.touched)) {
                <div class="text-red-600 text-sm mt-1">El código postal de la empresa es requerido.</div>
                }
            </div>
            </div>

            <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="company_country_user" class="block text-sm font-medium text-quinary">País (Empresa):</label>
                <input
                id="company_country_user"
                type="text"
                formControlName="company_country_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                readonly
                >
                @if (companyInfoForm.get('company_country_user')?.invalid && (companyInfoForm.get('company_country_user')?.dirty || companyInfoForm.get('company_country_user')?.touched)) {
                <div class="text-red-600 text-sm mt-1">El país de la empresa es requerido.</div>
                }
            </div>

            <div>
                <label for="company_latitude_user" class="block text-sm font-medium text-quinary">Latitud (Empresa):</label>
                <input
                id="company_latitude_user"
                type="number"
                formControlName="company_latitude_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                readonly
                >
            </div>
            </div>

            <div class="mb-4">
            <div>
                <label for="company_longitude_user" class="block text-sm font-medium text-quinary">Longitud (Empresa):</label>
                <input
                id="company_longitude_user"
                type="number"
                formControlName="company_longitude_user"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                readonly
                >
            </div>
            </div>
        </form>

        <div class="mb-4">
            <label class="block text-sm font-medium text-quinary">Selecciona la ubicación de la empresa en el mapa:</label>
            <div style="height: 300px; width: 100%; border-radius: 0.375rem; overflow: hidden;">
            <div
                leaflet
                [leafletOptions]="mapOptions"
                [leafletLayers]="mapLayers"
                (leafletMapReady)="onMapReady($event)"
                (leafletClick)="onMapClick($event)"
                class="w-full h-full"
            ></div>
            </div>
        </div>
        </div>
    `,
})
export class StepCompanyComponent implements OnInit, OnDestroy {
    companyInfoForm!: FormGroup;
    private destroy$ = new Subject<void>();

    mapOptions: any;
    mapLayers: Marker[] = [];
    private currentMap: Map | undefined;
    private currentMarker: Marker | null = null;

    customMarkerIcon = new Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
        shadowSize: [41, 41],
        shadowAnchor: [12, 41],
    });

    constructor(private fb: FormBuilder, private wizardService: WizardService) {
        this.mapOptions = {
        layers: [
            tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            })
        ],
        zoom: 13,
        center: [10.2033, -67.9404] // Centro inicial en Tocuyito, Venezuela
        };

        // Effect para sincronizar datos del servicio al formulario
        effect(() => {
        const serviceFormData = this.wizardService.formData();
        const companyInfoDataFromService = serviceFormData.companyInfo;
        const isDataLoaded = this.wizardService.isDataLoaded();

        if (this.companyInfoForm && companyInfoDataFromService && isDataLoaded) {
            const currentFormValue = this.companyInfoForm.getRawValue() as StepCompanyData;
            const formValueString = JSON.stringify(currentFormValue);
            const serviceDataString = JSON.stringify(companyInfoDataFromService);

            if (formValueString !== serviceDataString) {
            console.log('StepCompanyComponent (effect): Patching form with service data (DB loaded or new data).');
            this.companyInfoForm.patchValue(companyInfoDataFromService, { emitEvent: false });

            // Actualizamos el marcador si el mapa está listo y hay coordenadas
            if (this.currentMap && companyInfoDataFromService.company_latitude_user != null && companyInfoDataFromService.company_longitude_user != null) {
                this.updateMapMarker(companyInfoDataFromService.company_latitude_user, companyInfoDataFromService.company_longitude_user);
                this.currentMap.setView([companyInfoDataFromService.company_latitude_user, companyInfoDataFromService.company_longitude_user], this.currentMap.getZoom());
            }
            this.wizardService.updateStepData('companyInfo', this.companyInfoForm.value, this.companyInfoForm.valid);
            }
        }
        });
    }

    ngOnInit() {
        const loadedData = this.wizardService.formData().companyInfo;

        this.companyInfoForm = this.fb.group({
        department_company_user: [loadedData?.department_company_user || '', Validators.required],
        company_name_user: [loadedData?.company_name_user || '', Validators.required],
        company_title_user: [loadedData?.company_title_user || '', Validators.required],
        company_street_user: [loadedData?.company_street_user || '', Validators.required],
        company_city_user: [loadedData?.company_city_user || '', Validators.required],
        company_state_user: [loadedData?.company_state_user || '', Validators.required],
        company_state_code_user: [loadedData?.company_state_code_user || '', [Validators.required, Validators.pattern(/^[A-Z]{2}$/)]], 
        company_postal_code_user: [loadedData?.company_postal_code_user || '', Validators.required],
        company_latitude_user: [loadedData?.company_latitude_user || null, Validators.required],
        company_longitude_user: [loadedData?.company_longitude_user || null, Validators.required],
        company_country_user: [loadedData?.company_country_user || '', Validators.required],
        });

        // Suscribirse a los cambios del formulario para actualizar el servicio.
        this.companyInfoForm.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe((values: StepCompanyData) => {
            console.log('StepCompanyComponent (valueChanges): Form value changed, updating service.');
            this.wizardService.updateStepData('companyInfo', values, this.companyInfoForm.valid);
        });

        // Notificar al servicio el estado inicial (y la validez) del formulario.
        this.wizardService.updateStepData('companyInfo', this.companyInfoForm.value, this.companyInfoForm.valid);
    }

    onMapReady(map: Map) {
        this.currentMap = map;

        // Ajustar el tamaño del mapa después de la inicialización para evitar mosaicos rotos
        setTimeout(() => {
        if (this.currentMap) {
            this.currentMap.invalidateSize();
        }
        }, 100);

        const loadedData = this.wizardService.formData().companyInfo;

        // 1. Si hay datos cargados, centrar el mapa y poner el marcador
        if (loadedData?.company_latitude_user != null && loadedData?.company_longitude_user != null) {
        const lat = loadedData.company_latitude_user;
        const lng = loadedData.company_longitude_user;
        this.updateMapMarker(lat, lng);
        this.currentMap.setView([lat, lng], this.currentMap.getZoom());
        } else {
        // 2. Si no hay datos cargados, intentar obtener la ubicación actual del usuario
        // Aunque para una empresa, quizás no sea tan relevante como para la dirección personal
        this.currentMap.locate({ setView: true, maxZoom: 16 });
        this.currentMap.on('locationfound', (e) => {
            // Solo si no se ha establecido ya una ubicación
            if (!this.companyInfoForm.get('company_latitude_user')?.value) {
            console.log('Location found by browser:', e.latlng);
            this.onMapClick({ latlng: e.latlng } as LeafletMouseEvent); // Simular un clic
            }
        });
        this.currentMap.on('locationerror', (e) => {
            console.warn('Geolocation error for company location:', e.message);
        });
        }
    }

    onMapClick(e: LeafletMouseEvent) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        // Actualiza los campos de latitud y longitud en el formulario
        this.companyInfoForm.patchValue({
        company_latitude_user: lat,
        company_longitude_user: lng
        }, { emitEvent: false });

        // Actualiza el marcador en el mapa
        if (this.currentMap) {
        this.updateMapMarker(lat, lng);
        } else {
        console.warn('Map not yet ready, cannot update marker on click for company.');
        }

        // Realiza la geocodificación inversa para obtener la dirección de la empresa
        this.reverseGeocode(lat, lng);
    }

    private updateMapMarker(lat: number, lng: number): void {
        if (!this.currentMap) {
        console.error('updateMapMarker (company): Map instance not available.');
        return;
        }

        if (this.currentMarker) {
        this.currentMarker.setLatLng([lat, lng]);
        } else {
        this.currentMarker = marker([lat, lng], { icon: this.customMarkerIcon }).addTo(this.currentMap);
        }
    }

    private reverseGeocode(lat: number, lng: number): void {
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

        fetch(url)
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Geocoding result for company:', data);
            if (data && data.address) {
            const address = data.address;
            this.companyInfoForm.patchValue({
                company_street_user: `${address.road || ''} ${address.house_number || ''}`.trim(),
                company_city_user: address.city || address.town || address.village || '',
                company_state_user: address.state || '',
                company_postal_code_user: address.postcode || '',
                company_country_user: address.country || '',
                company_state_code_user: address.state_code || ''
            }, { emitEvent: false });
            this.companyInfoForm.markAllAsTouched(); // Para mostrar validaciones al rellenar

            } else {
            console.warn('No address data found for these company coordinates.');
            // Si no se encuentra dirección, podrías limpiar los campos relacionados
            this.companyInfoForm.patchValue({
                company_street_user: '',
                company_city_user: '',
                company_state_user: '',
                company_postal_code_user: '',
                company_country_user: ''
            }, { emitEvent: false });
            }
            // Siempre actualizamos el servicio para reflejar el estado actual del formulario y su validez
            this.wizardService.updateStepData('companyInfo', this.companyInfoForm.value, this.companyInfoForm.valid);
        })
        .catch(error => {
            console.error('Error during reverse geocoding for company:', error);
            this.wizardService.updateStepData('companyInfo', this.companyInfoForm.value, this.companyInfoForm.valid);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}