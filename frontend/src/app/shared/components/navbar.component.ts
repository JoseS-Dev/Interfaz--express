import { Component, signal } from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { heroBars3Solid } from "@ng-icons/heroicons/solid";
import { LoginComponent } from "../../features/home/login.component";
import { Observable } from "rxjs";
import { AuthService } from "../../core/services/auth.service";
import { AsyncPipe } from "@angular/common";
import { RouterLink, RouterOutlet } from "@angular/router";

interface NavbarOption {
    label: string;
    href: string;
}

@Component({
    selector: 'navbar',
    standalone: true,
    imports: [NgIcon, LoginComponent, AsyncPipe, RouterLink],
    providers: [provideIcons({ heroBars3Solid })],
    template: `
        <nav class="bg-quaternary shadow-sm sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <h1 class="font-bold text-secondary text-subtitle font-secondary">Bienestar Total</h1>
                    </div>
                    <!-- Mobile menu button -->
                    <div class="md:hidden">
                        <button (click)="toggleMobileMenu()" id="mobile-menu-button" class="text-quinary hover:text-secondary focus:outline-none cursor-pointer">
                        <ng-icon name="heroBars3Solid" size="30" class="text-quinary" ></ng-icon>
                        </button>
                    </div>
                    <!-- Desktop menu -->
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            @for (option of navbarOptions; track $index) {
                                <a
                                [href]="'#' + option.href"
                                class="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium font-primary text-paragraph"
                                >
                                    {{ option.label }}
                                </a>
                            }

                            @if (isAuthenticated$ | async) {
                                <a
                                routerLink="/admin"
                                class="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium font-primary text-paragraph cursor-pointer"
                                >
                                    Ajustes
                                </a>
                            }

                            @if (isAuthenticated$ | async) {
                                <button
                                (click)="logout()"
                                class="bg-secondary hover:bg-secondary/75 text-quaternary px-4 py-2 rounded-md font-medium font-primary text-paragraph"
                                >Cerrar sesión</button>
                            } @else {
                                <button
                                (click)="toggleLogin()
                                "class="bg-secondary hover:bg-secondary/75 text-quaternary px-4 py-2 rounded-md font-medium font-primary text-paragraph"
                                >Iniciar sesión</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        
            <!-- Mobile menu, show/hide based on menu state -->
            @if (!isMobileMenuHidden()) {
            <div id="mobile-menu" class="md:hidden bg-quaternary">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    @for (option of navbarOptions; track $index) {
                        <a
                        [href]="'#' + option.href"
                        class="block text-quinary hover:text-secondary px-3 py-2 text-base font-medium font-primary text-paragraph"
                        >
                            {{ option.label }}
                        </a>
                    }
                    
                    @if (isAuthenticated$ | async) {
                        <a
                        routerLink="/admin"
                        class="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium font-primary text-paragraph cursor-pointer"
                        >
                            Ajustes
                        </a>
                    }

                    @if (isAuthenticated$ | async) {
                        <button
                        (click)="logout()"
                        class="w-full text-left bg-secondary text-quaternary px-3 py-2 rounded-md font-medium hover:bg-secondary/75 font-primary text-paragraph"
                        >Cerrar sesión</button>
                    } @else {
                        <button
                        (click)="toggleLogin()
                        "class="w-full text-left bg-secondary text-quaternary px-3 py-2 rounded-md font-medium hover:bg-secondary/75 font-primary text-paragraph"
                        >Iniciar sesión</button>
                    }
                </div>
            </div>
            }
        </nav>

        <login [isLoginModalHidden]="isLoginModalHidden()" (loginChange)="handleLoginChange($event)" />
    `,
})
export class NavbarComponent {
    isLoginModalHidden = signal(true);
    isMobileMenuHidden = signal(true);

    isAuthenticated$: Observable<boolean>;
    
    constructor(private authService: AuthService) {
        this.isAuthenticated$ = this.authService.isAuthenticated();
    }  

    navbarOptions: NavbarOption[] = [
        { label: 'Inicio', href: 'inicio' },
        { label: 'Servicios', href: 'servicios' },
        { label: 'Galería', href: 'galeria' },
        { label: 'Contacto', href: 'contacto' },
    ]
    
    toggleLogin() {
        this.isLoginModalHidden.update(hidden => !hidden);
    }

    logout() {
        this.authService.logout();
        location.reload();
    }
  
    toggleMobileMenu() {
        this.isMobileMenuHidden.update(hidden => !hidden);
    }

    handleLoginChange(isHidden: boolean) {
        this.isLoginModalHidden.set(isHidden);
    }
}