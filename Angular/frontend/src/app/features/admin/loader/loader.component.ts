import { Component } from "@angular/core";
import { AdminNavbarComponent } from "../admin-navbar.component";
import { LoaderService } from "../../../core/services/loader.service"; 

@Component({
    selector: "loader-view",
    template: `
        <admin-navbar />
        <section class="w-full min-h-screen py-10 bg-[#DFEEFF]">
        <div class="max-w-6xl mx-auto p-6 rounded-lg shadow-lg border-2 border-[#DFEEFF] bg-[#fff]">
            <h2 class="text-3xl font-bold text-center text-[#2563EB] mb-6">Gestión del Loader</h2>

            <div class="flex justify-center gap-4">
            <button
                (click)="showLoader()"
                class="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
            >
                Mostrar Loader
            </button>
            <button
                (click)="hideLoader()"
                class="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
            >
                Ocultar Loader
            </button>
            </div>

            <p class="text-center mt-4 text-gray-700">
                Estado actual del Loader:
                <span
                    [class.text-green-600]="!loaderService.isHidden()"
                    [class.text-red-600]="loaderService.isHidden()"
                >
                    {{ loaderService.isHidden() ? 'Oculto' : 'Visible' }}
                </span>
            </p>
        </div>
        </section>
    `,
    imports: [AdminNavbarComponent],
})
export class LoaderComponent {
    constructor(public loaderService: LoaderService) {}

    showLoader(): void {
        this.loaderService.showLoader();
    }

    hideLoader(): void {
        this.loaderService.hideLoader();
    }
}