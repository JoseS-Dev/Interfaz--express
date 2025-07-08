import { Component, OnInit, OnDestroy, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WizardService } from '../../../core/services/wizard.service';
import { StepAddressData } from '../../../shared/interfaces/wizard.interface';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Map, tileLayer, marker, Icon, Marker, LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import * as L from 'leaflet';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

@Component({
    selector: 'step-address-info',
    standalone: true,
    imports: [ReactiveFormsModule, LeafletModule],
    template: `
        <div class="flex flex-col gap-4 py-4">
        <h2 class="text-2xl text-subtitle font-bold text-quinary">Información de Dirección</h2>

        <form [formGroup]="addressInfoForm">
            <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="street_address" class="block text-sm font-medium text-quinary">Calle y Número:</label>
                <input
                id="street_address"
                type="text"
                formControlName="street_address"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                @if (addressInfoForm.get('street_address')?.invalid && (addressInfoForm.get('street_address')?.dirty || addressInfoForm.get('street_address')?.touched)) {
                    <div class="text-red-600 text-sm mt-1">La calle y número son requeridos.</div>
                }
            </div>

            <div>
                <label for="city_address" class="block text-sm font-medium text-quinary">Ciudad:</label>
                <input
                id="city_address"
                type="text"
                formControlName="city_address"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                @if (addressInfoForm.get('city_address')?.invalid && (addressInfoForm.get('city_address')?.dirty || addressInfoForm.get('city_address')?.touched)) {
                    <div class="text-red-600 text-sm mt-1">La ciudad es requerida.</div>
                }
            </div>
            </div>

            <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="state_address" class="block text-sm font-medium text-quinary">Estado/Provincia:</label>
                <input
                id="state_address"
                type="text"
                formControlName="state_address"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                @if (addressInfoForm.get('state_address')?.invalid && (addressInfoForm.get('state_address')?.dirty || addressInfoForm.get('state_address')?.touched)) {
                    <div class="text-red-600 text-sm mt-1">El estado/provincia es requerido.</div>
                }
            </div>

            <div>
                <label for="postal_code_address" class="block text-sm font-medium text-quinary">Código Postal:</label>
                <input
                id="postal_code_address"
                type="text"
                formControlName="postal_code_address"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                @if (addressInfoForm.get('postal_code_address')?.invalid && (addressInfoForm.get('postal_code_address')?.dirty || addressInfoForm.get('postal_code_address')?.touched)) {
                    <div class="text-red-600 text-sm mt-1">El código postal es requerido.</div>
                }
            </div>
            </div>

            <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="country_address" class="block text-sm font-medium text-quinary">País:</label>
                <input
                id="country_address"
                type="text"
                formControlName="country_address"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                @if (addressInfoForm.get('country_address')?.invalid && (addressInfoForm.get('country_address')?.dirty || addressInfoForm.get('country_address')?.touched)) {
                    <div class="text-red-600 text-sm mt-1">El país es requerido.</div>
                }
            </div>

            <div>
                <label for="state_code_address" class="block text-sm font-medium text-quinary">Código de Estado:</label>
                <input
                id="state_code_address"
                type="text"
                formControlName="state_code_address"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                @if (addressInfoForm.get('state_code_address')?.invalid && (addressInfoForm.get('state_code_address')?.dirty || addressInfoForm.get('state_code_address')?.touched)) {
                    <div class="text-red-600 text-sm mt-1">El código de estado es requerido.</div>
                }
            </div>
            </div>

            <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="latitude_address" class="block text-sm font-medium text-quinary">Latitud:</label>
                <input
                id="latitude_address"
                type="number"
                formControlName="latitude_address"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                readonly
                >
            </div>

            <div>
                <label for="longitude_address" class="block text-sm font-medium text-quinary">Longitud:</label>
                <input
                id="longitude_address"
                type="number"
                formControlName="longitude_address"
                class="mt-1 block w-full px-3 py-2 border border-quinary/20 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                readonly
                >
            </div>
            </div>
        </form>

        <div class="mb-4">
            <label class="block text-sm font-medium text-quinary">Selecciona tu ubicación en el mapa:</label>
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
export class StepAddressComponent implements OnInit, OnDestroy {
    addressInfoForm!: FormGroup;
    private destroy$ = new Subject<void>();

    mapOptions: any;
    mapLayers: Marker[] = [];
    private currentMap: Map | undefined; // Hacerlo opcional para manejar la inicialización asíncrona
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
            center: [10.2033, -67.9404]
        };

        effect(() => {
            const serviceFormData = this.wizardService.formData();
            const addressInfoDataFromService = serviceFormData.addressInfo;
            const isDataLoaded = this.wizardService.isDataLoaded();

            // Aseguramos que el formulario esté listo y que haya datos en el servicio
            if (this.addressInfoForm && addressInfoDataFromService && isDataLoaded) {
                const currentFormValue = this.addressInfoForm.getRawValue() as StepAddressData;
                const formValueString = JSON.stringify(currentFormValue);
                const serviceDataString = JSON.stringify(addressInfoDataFromService);

                // Solo parchear si los datos del servicio son diferentes a los del formulario
                if (formValueString !== serviceDataString) {
                console.log('StepAddressComponent (effect): Patching form with service data (DB loaded or new data).');
                this.addressInfoForm.patchValue(addressInfoDataFromService, { emitEvent: false }); // <-- CORREGIDO: Usar addressInfoForm

                // Actualizamos el marcador si el mapa está listo y hay coordenadas
                if (this.currentMap && addressInfoDataFromService.latitude_address != null && addressInfoDataFromService.longitude_address != null) {
                    this.updateMapMarker(addressInfoDataFromService.latitude_address, addressInfoDataFromService.longitude_address);
                    this.currentMap.setView([addressInfoDataFromService.latitude_address, addressInfoDataFromService.longitude_address], this.currentMap.getZoom());
                }
                // Siempre actualiza la validez del servicio después de un parche
                this.wizardService.updateStepData('addressInfo', this.addressInfoForm.value, this.addressInfoForm.valid);
                }
            }
        });
    }

    ngOnInit() {
        const loadedData = this.wizardService.formData().addressInfo;

        this.addressInfoForm = this.fb.group({
        street_address: [loadedData?.street_address || '', Validators.required],
        city_address: [loadedData?.city_address || '', Validators.required],
        state_address: [loadedData?.state_address || '', Validators.required],
        state_code_address: [loadedData?.state_code_address || '', Validators.required],
        postal_code_address: [loadedData?.postal_code_address || '', Validators.required],
        latitude_address: [loadedData?.latitude_address || null, Validators.required],
        longitude_address: [loadedData?.longitude_address || null, Validators.required],
        country_address: [loadedData?.country_address || '', Validators.required],
        });

        // Suscribirse a los cambios del formulario para actualizar el servicio.
        this.addressInfoForm.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe((values: StepAddressData) => {
            // console.log('StepAddressComponent (valueChanges): Form value changed, updating service.'); // Descomentar para depurar
            this.wizardService.updateStepData('addressInfo', values, this.addressInfoForm.valid);
        });

        this.wizardService.updateStepData('addressInfo', this.addressInfoForm.value, this.addressInfoForm.valid);
    }

    onMapReady(map: Map) {
        this.currentMap = map;

        // Ajustar el tamaño del mapa después de la inicialización para evitar mosaicos rotos
        setTimeout(() => {
        if (this.currentMap) {
            this.currentMap.invalidateSize();
        }
        }, 100); // Pequeño retraso para asegurar que el DOM esté listo

        const loadedData = this.wizardService.formData().addressInfo;

        // 1. Si hay datos cargados, centrar el mapa y poner el marcador
        if (loadedData?.latitude_address != null && loadedData?.longitude_address != null) {
        const lat = loadedData.latitude_address;
        const lng = loadedData.longitude_address;
        this.updateMapMarker(lat, lng);
        this.currentMap.setView([lat, lng], this.currentMap.getZoom());
        } else {
        // 2. Si no hay datos cargados, intentar obtener la ubicación actual del usuario
        this.currentMap.locate({ setView: true, maxZoom: 16 });
        this.currentMap.on('locationfound', (e) => {
            // Solo si no se ha establecido ya una ubicación por datos cargados o un clic manual
            if (!this.addressInfoForm.get('latitude_address')?.value) {
            console.log('Location found by browser:', e.latlng);
            this.onMapClick({ latlng: e.latlng } as LeafletMouseEvent); // Simular un clic
            }
        });
        this.currentMap.on('locationerror', (e) => {
            console.warn('Geolocation error:', e.message);
        });
        }
    }

    onMapClick(e: LeafletMouseEvent) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        // Actualiza los campos de latitud y longitud en el formulario
        this.addressInfoForm.patchValue({
            latitude_address: lat,
            longitude_address: lng
        }, { emitEvent: false });

        // Actualiza el marcador en el mapa
        if (this.currentMap) {
            this.updateMapMarker(lat, lng);
        } else {
            console.warn('Map not yet ready, cannot update marker on click.');
        }
        this.reverseGeocode(lat, lng);
    }

    private updateMapMarker(lat: number, lng: number): void {
        if (!this.currentMap) {
        console.error('updateMapMarker: Map instance not available.');
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
            console.log('Geocoding result:', data);
            if (data && data.address) {
            const address = data.address;
            this.addressInfoForm.patchValue({
                street_address: `${address.road || ''} ${address.house_number || ''}`.trim(),
                city_address: address.city || address.town || address.village || '',
                state_address: address.state || '',
                postal_code_address: address.postcode || '',
                country_address: address.country || '',
                state_code_address: address.state_code || ''
            }, { emitEvent: false });
            this.addressInfoForm.markAllAsTouched(); // Para mostrar validaciones al rellenar

            } else {
            console.warn('No address data found for these coordinates.');
            // Si no se encuentra dirección, podrías limpiar los campos relacionados
            this.addressInfoForm.patchValue({
                street_address: '',
                city_address: '',
                state_address: '',
                postal_code_address: '',
                country_address: ''
            }, { emitEvent: false });
            }
            // Siempre actualizamos el servicio para reflejar el estado actual del formulario y su validez
            this.wizardService.updateStepData('addressInfo', this.addressInfoForm.value, this.addressInfoForm.valid);
        })
        .catch(error => {
            console.error('Error during reverse geocoding:', error);
            // Si hay un error en la geocodificación, el formulario puede quedarse inválido si los campos requeridos no se llenaron.
            this.wizardService.updateStepData('addressInfo', this.addressInfoForm.value, this.addressInfoForm.valid);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}