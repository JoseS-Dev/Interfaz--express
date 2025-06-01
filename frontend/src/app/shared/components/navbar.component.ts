import { Component, signal } from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { heroBars3Solid } from "@ng-icons/heroicons/solid";
import { LoginComponent } from "../../features/users/login.component";

interface NavbarOption {
    label: string;
    href: string;
}

@Component({
    selector: 'navbar',
    standalone: true,
    imports: [NgIcon, LoginComponent],
    providers: [provideIcons({ heroBars3Solid })],
    template: `
        <nav class="bg-quaternary shadow-sm sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <h1 class="text-xl font-bold text-secondary">Bienestar Total</h1>
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
                                class="text-quinary hover:text-secondary px-3 py-2 text-sm font-medium"
                                >
                                    {{ option.label }}
                                </a>
                            }
                            <button (click)="toggleLogin()" class="bg-secondary hover:bg-secondary/75 text-quaternary px-4 py-2 rounded-md text-sm font-medium">Admin</button>
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
                        class="block text-quinary hover:text-secondary px-3 py-2 text-base font-medium"
                        >
                            {{ option.label }}
                        </a>                    }
                    <button (click)="toggleLogin()" class="w-full text-left bg-secondary text-quaternary px-3 py-2 rounded-md text-base font-medium hover:bg-secondary/75">Admin</button>
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

    navbarOptions: NavbarOption[] = [
        { label: 'Inicio', href: 'inicio' },
        { label: 'Servicios', href: 'servicios' },
        { label: 'Galería', href: 'galeria' },
        { label: 'Contacto', href: 'contacto' },
    ]
    
    toggleLogin() {
      this.isLoginModalHidden.update(hidden => !hidden);
    }
  
    toggleMobileMenu() {
      this.isMobileMenuHidden.update(hidden => !hidden);
    }

    handleLoginChange(isHidden: boolean) {
        this.isLoginModalHidden.set(isHidden);
    }
}