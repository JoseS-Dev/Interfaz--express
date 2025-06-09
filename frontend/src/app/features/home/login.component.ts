import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginCredentials } from "../../shared/interfaces/login.interface";
import Swal from "sweetalert2";

@Component({
    standalone: true,
    selector: 'login',
    imports: [ReactiveFormsModule],
    template: `
        @if (!isLoginModalHidden) {
            <div class="fixed inset-0 bg-quinary/50 z-50 flex items-center justify-center">
                <div class="bg-quaternary p-8 rounded-lg shadow-lg w-11/12 max-w-md">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="font-bold text-secondary font-primary text-subtitle">Acceso Administrador</h2>
                        <button (click)="toggleLogin()" class="text-quinary hover:text-secondary">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form [formGroup]="loginForm" (ngSubmit)="handleLogin()">
                        <div class="mb-4">
                            <label class="block text-quinary font-bold mb-2 font-primary text-paragraph">Usuario</label>
                            <input type="text" formControlName="email" class="w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary">
                            @if (loginForm.get('email')?.errors?.['required']) {
                                <p class="text-paragraph text-quinary font-medium">
                                    *El email es obligatorio.
                                </p>
                            }
                        </div>
                        <div class="mb-6">
                            <label class="block text-quinary font-bold mb-2 font-primary text-paragraph">Contraseña</label>
                            <input type="password" formControlName="password" class="w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary">
                        </div>
                        <div class="flex justify-between">
                            <button type="button" (click)="toggleLogin()" class="bg-quinary bg-opacity-70 text-quaternary px-4 py-2 rounded-md hover:bg-opacity-50 font-primary text-paragraph">Cancelar</button>
                            <button type="submit" class="bg-secondary text-quaternary px-4 py-2 rounded-md hover:bg-opacity-75 font-primary text-paragraph">Ingresar</button>
                        </div>
                    </form>
                </div>
            </div>
        }
    `
})
export class LoginComponent {
    constructor(
        private readonly authService: AuthService
    ) {}

    loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    })

    @Input() isLoginModalHidden = true;
    @Output() loginChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    
    toggleLogin() {
        this.loginChange.emit(!this.isLoginModalHidden);
    }

    handleLogin() {
        const credentials: LoginCredentials = {
            email_user: this.loginForm.value.email || '',
            password_user: this.loginForm.value.password || '' 
        };
        this.authService.login(credentials).subscribe({
            next: (res) => {
                this.toggleLogin();
                Swal.fire({
                    text: "Inicio de sesión exitoso",
                    icon: "success"
                });
                this.loginForm.patchValue({ password: '', email: '' });
            },
            error: (err) => {
                Swal.fire({
                    text: "Email o contraseña inválido.",
                    icon: "error"
                });
                this.loginForm.patchValue({ password: '' });
                console.error('Login error:', err);
            }
        });
        
    }
}