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
    selector: 'admin-navbar',
    standalone: true,
    imports: [],
    providers: [provideIcons({ heroBars3Solid })],
    template: `
        <header class="bg-blue-600 w-full h-16 flex items-center">
            <article class="text-white text-lg tracking-wide font-bold flex items-center justify-between w-full px-5">
                <h1>Bienvenido a la parte administrativa</h1>
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#eee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chart-no-axes-gantt-icon lucide-chart-no-axes-gantt">
                    <path d="M8 6h10"/><path d="M6 12h9"/><path d="M11 18h7"/>
                </svg>
            </article>
        </header>
    `,
})
export class AdminNavbarComponent {}