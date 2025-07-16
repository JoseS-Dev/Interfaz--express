// src/app/services/loader.service.ts
import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private readonly LOCAL_STORAGE_KEY = 'loaderIsHidden';

    private _isHidden: WritableSignal<boolean>;

    public readonly isHidden: Signal<boolean>;

    constructor() {
        const storedValue = localStorage.getItem(this.LOCAL_STORAGE_KEY);
        let initialValue: boolean;

        if (storedValue !== null) {
            initialValue = JSON.parse(storedValue);
        } else {
            initialValue = true; 
        }

        this._isHidden = signal<boolean>(initialValue);
        this.isHidden = this._isHidden.asReadonly(); // Asignar la versión de solo lectura
    }

    showLoader(): void {
        this._isHidden.set(false);
        this.saveState(); // Guardar el nuevo estado en localStorage
    }

    hideLoader(): void {
        this._isHidden.set(true);
        this.saveState(); // Guardar el nuevo estado en localStorage
    }

    // Método privado para guardar el estado actual del signal en localStorage
    private saveState(): void {
        try {
        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this._isHidden()));
        } catch (e) {
        console.warn('Error al guardar en localStorage:', e);
        // Aquí podrías manejar el error, por ejemplo, si el almacenamiento está lleno
        }
    }
}