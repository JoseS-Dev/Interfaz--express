import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IUser } from '../../../shared/interfaces/user.interface';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { Map, tileLayer, marker, LatLngExpression, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import * as L from 'leaflet';

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const COLORS = {
    primary_color: "DFEEFF",
    secondary_color: "2563EB",
    ternary_color: "F97316",
    cuarternary_color: "FFFFFF",
    neutral_color: "374151",
};

@Component({
    standalone: true,
    selector: 'user-details',
    templateUrl: './users-details.component.html', 
    imports: [CommonModule, LeafletModule]
})
export class UsersDetailsComponent implements OnChanges {
    @Input() user: IUser | null = null;
    @Input() isOpen: boolean = false;
    @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

    // Propiedades para los mapas de Leaflet
    personalMapOptions: any;
    personalMapLayers: any[] = [];
    companyMapOptions: any;
    companyMapLayers: any[] = [];

    // Icono personalizado (similar al de React)
    customMarkerIcon = new Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
        iconSize: [30, 45],
        iconAnchor: [17, 45],
        popupAnchor: [0, -45],
        shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
        shadowSize: [41, 41],
        shadowAnchor: [12, 41],
    });

    constructor() {}

    // Implementa OnChanges para reaccionar a los cambios en el input `user`
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['user'] && this.user) {
            this.initializeMaps();
        }
        if (changes['isOpen'] && !this.isOpen) {
            // Cuando el modal se cierra, podemos limpiar los mapas si es necesario
            // Aunque ngx-leaflet suele manejarlo bien
        }
    }

    private initializeMaps(): void {
        if (!this.user) return;

        const defaultLat = 0;
        const defaultLng = 0;

        // Posición personal
        const personalLat = this.user.latitude_address || defaultLat;
        const personalLng = this.user.longitude_address || defaultLng;
        const personalPosition: LatLngExpression = [personalLat, personalLng];

        this.personalMapOptions = {
            layers: [
                tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 18,
                    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                })
            ],
            zoom: 13,
            center: personalPosition
        };
        this.personalMapLayers = [
            marker(personalPosition, { icon: this.customMarkerIcon })
        ];

        // Posición de la empresa
        const companyLat = this.user.company_latitude_user || defaultLat;
        const companyLng = this.user.company_longitude_user || defaultLng;
        const companyPosition: LatLngExpression = [companyLat, companyLng];

        this.companyMapOptions = {
            layers: [
                tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 18,
                    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                })
            ],
            zoom: 13,
            center: companyPosition
        };
        this.companyMapLayers = [
            marker(companyPosition, { icon: this.customMarkerIcon })
        ];
    }

    // Getter para los colores en el template
    get colors() {
        return COLORS;
    }

    // Helper para formatear fechas
    formatDate(dateString: string): string {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString();
        } catch (e) {
            console.error('Error formatting date:', dateString, e);
            return 'Formato inválido';
        }
    }
}