import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { AdminNavbarComponent } from "./admin-navbar.component";

@Component({
    standalone: true,
    selector: 'admin-view',
    imports: [AdminNavbarComponent],
    template: `
        <div class="w-full h-full">
            <admin-navbar />
            <main class="flex w-full border-2 border-black h-[calc(100vh-4rem)]">
                <section class="border-r-2 border-blue-600 w-140 h-full flex flex-col items-center justify-center px-5 bg-gray-100">
                    <article class="text-center flex flex-col  gap-2 trancking-widese ">
                        <h1 class="text-2xl font-bold ">Panel Administrativo</h1>
                        <p class="text-md font-semibold ">En esta parte administrartiva podras modificar los colores y la tipografia de la platilla</p>
                    </article>
                </section>
                <section class="w-full h-full flex flex-col items-center justify-center bg-white">
                    <article class="h-75 mb-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <button (click)="handleRedirect('colors')" class="border-2 border-black max-w-lg md:w-[36rem] h-64 rounded-2xl text-3xl font-bold bg-blue-600 text-white cursor-pointer flex flex-col justify-center items-center gap-4 hover:bg-gray-200 hover:text-black hover:border-blue-700 transition-colors duration-200">
                            Cambiar Colores
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="#eee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-palette-icon lucide-palette"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>
                        </button>
                        <button (click)="handleRedirect('typography')" class="border-2 border-black max-w-lg md:w-[36rem] h-64 rounded-2xl text-3xl font-bold bg-blue-600 text-white cursor-pointer flex flex-col justify-center items-center gap-4 hover:bg-gray-200 hover:text-black hover:border-blue-700 transition-colors duration-200">
                            Cambiar Tipografia
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="#eee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-type-icon lucide-file-type"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 13v-1h6v1"/><path d="M12 12v6"/><path d="M11 40h2"/></svg>
                        </button>
                    </article>
                    
                    <article class="h-75 mb-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <button (click)="handleRedirect('users')" class="border-2 border-black max-w-lg md:w-[36rem] h-64 rounded-2xl text-3xl font-bold bg-blue-600 text-white cursor-pointer flex flex-col justify-center items-center gap-4 hover:bg-gray-200 hover:text-black hover:border-blue-700 transition-colors duration-200">
                            Usuarios
                            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="currentColor" stroke="#eee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><circle cx="12" cy="7" r="4"/><path d="M2 21v-2a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v2"/></svg>
                        </button>
                        <button (click)="handleRedirect('loader')" class="border-2 border-black max-w-lg md:w-[36rem] h-64 rounded-2xl text-3xl font-bold bg-blue-600 text-white cursor-pointer flex flex-col justify-center items-center gap-4 hover:bg-gray-200 hover:text-black hover:border-blue-700 transition-colors duration-200">
                            Loader
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-circle-icon lucide-loader-circle"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                        </button>
                    </article>
                </section>
            </main>
        </div>
    `
})
export class AdminComponent {
    private router = inject(Router); 

    handleRedirect(path: string) {
        this.router.navigate([`/admin/${path}`])
    }
} 
