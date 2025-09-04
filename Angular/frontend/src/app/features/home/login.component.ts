import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators, ValidatorFn } from '@angular/forms';
import { LoginCredentials, RegisterCredentials } from "../../shared/interfaces/login.interface"; 
import Swal from "sweetalert2";

// Función de validación personalizada para la confirmación de contraseña
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const confirmPassword = control.get('passwordConfirmation');

    // Si alguno de los controles no existe, o si confirmPassword no tiene valor (y no es requerido en ese momento),
    // no hay error de coincidencia.
    if (!password || !confirmPassword || confirmPassword.value === null || confirmPassword.value.length === 0) {
        return null; 
    }

    // Si ya tiene otro error, no sobrescribir, a menos que sea el propio passwordMismatch para poder removerlo.
    if (confirmPassword.errors && !confirmPassword.errors['passwordMismatch']) {
        return null; 
    }

    if (password.value !== confirmPassword.value) {
        // Establece el error en el campo de confirmación
        // Usa setErrors({ passwordMismatch: true }) y marca como touched para que el mensaje aparezca.
        confirmPassword.setErrors({ passwordMismatch: true }); 
        return { 'passwordMismatch': true };
    } else {
        // Si coinciden, asegúrate de remover el error passwordMismatch si existía
        if (confirmPassword.hasError('passwordMismatch')) {
            const errors = confirmPassword.errors;
            if (errors) {
                delete errors['passwordMismatch']; // Eliminar solo este error
                confirmPassword.setErrors(Object.keys(errors).length > 0 ? errors : null);
            }
        }
        return null;
    }
};

@Component({
    standalone: true,
    selector: 'login',
    imports: [ReactiveFormsModule],
    template: `
        @if (!isLoginModalHidden) {
            <div class="fixed inset-0 bg-quinary/50 z-50 flex items-center justify-center">
                <div class="bg-quaternary p-8 rounded-lg shadow-lg w-11/12 max-w-md">
                    <div class="flex justify-between items-center mb-6">
                        <h2 class="font-bold text-secondary font-primary text-subtitle">
                            @if (isRegisterMode) {
                                Registro de Usuario
                            } @else {
                                Inicio de Sesión
                            }
                        </h2>
                        <button (click)="toggleLogin()" class="text-quinary hover:text-secondary">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form [formGroup]="authForm" (ngSubmit)="handleSubmit()">
                        @if (isRegisterMode) {
                            <div class="mb-4">
                                <label class="block text-quinary font-bold mb-2 font-primary text-paragraph">Nombre de Usuario</label>
                                <input type="text" formControlName="username" class="w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary">
                                @if (authForm.get('username')?.errors?.['required'] && authForm.get('username')?.touched) {
                                    <p class="text-paragraph text-quinary font-medium">
                                        *El nombre de usuario es obligatorio.
                                    </p>
                                }
                            </div>
                        }

                        <div class="mb-4">
                            <label class="block text-quinary font-bold mb-2 font-primary text-paragraph">Email</label>
                            <input type="email" formControlName="email" class="w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary">
                            @if (authForm.get('email')?.errors?.['required'] && authForm.get('email')?.touched) {
                                <p class="text-paragraph text-quinary font-medium">
                                    *El email es obligatorio.
                                </p>
                            }
                            @if (authForm.get('email')?.errors?.['email'] && authForm.get('email')?.touched) {
                                <p class="text-paragraph text-quinary font-medium">
                                    *Por favor, introduce un email válido.
                                </p>
                            }
                        </div>

                        <div class="mb-4">
                            <label class="block text-quinary font-bold mb-2 font-primary text-paragraph">Contraseña</label>
                            <input type="password" formControlName="password" class="w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary">
                            @if (authForm.get('password')?.errors?.['required'] && authForm.get('password')?.touched) {
                                <p class="text-paragraph text-quinary font-medium">
                                    *La contraseña es obligatoria.
                                </p>
                            }
                            @if (authForm.get('password')?.errors?.['minlength'] && authForm.get('password')?.touched) {
                                <p class="text-paragraph text-quinary font-medium">
                                    *La contraseña debe tener al menos 8 caracteres.
                                </p>
                            }
                        </div>

                        @if (isRegisterMode) {
                            <div class="mb-6">
                                <label class="block text-quinary font-bold mb-2 font-primary text-paragraph">Confirmar Contraseña</label>
                                <input type="password" formControlName="passwordConfirmation" class="w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary">
                                @if (authForm.get('passwordConfirmation')?.errors?.['required'] && authForm.get('passwordConfirmation')?.touched) {
                                    <p class="text-paragraph text-quinary font-medium">
                                        *La confirmación de contraseña es obligatoria.
                                    </p>
                                }
                                @if (authForm.get('passwordConfirmation')?.errors?.['passwordMismatch'] && authForm.get('passwordConfirmation')?.touched) {
                                    <p class="text-paragraph text-quinary font-medium">
                                        *Las contraseñas no coinciden.
                                    </p>
                                }
                            </div>
                        }

                        <div class="flex justify-between items-center mt-6">
                            <button type="button" (click)="toggleLogin()" class="bg-quinary bg-opacity-70 text-quaternary px-4 py-2 rounded-md hover:bg-opacity-50 font-primary text-paragraph">Cancelar</button>
                            <button type="submit" [disabled]="authForm.invalid" class="bg-secondary text-quaternary px-4 py-2 rounded-md hover:bg-opacity-75 font-primary text-paragraph">
                                @if (isRegisterMode) {
                                    Registrarse
                                } @else {
                                    Ingresar
                                }
                            </button>
                        </div>
                        
                        <div class="mt-4 text-center">
                            <button type="button" (click)="toggleMode()" class="text-secondary hover:underline font-primary text-paragraph">
                                @if (isRegisterMode) {
                                    ¿Ya tienes cuenta? Inicia sesión acá.
                                } @else {
                                    ¿No tienes cuenta? Regístrate acá.
                                }
                            </button>
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

    isRegisterMode: boolean = false;

    authForm = new FormGroup({
        username: new FormControl(''),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]), 
        passwordConfirmation: new FormControl('')
    });

    @Input() isLoginModalHidden = true;
    @Output() loginChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    
    toggleLogin() {
        this.loginChange.emit(!this.isLoginModalHidden);
        this.authForm.reset();
        this.isRegisterMode = false;
        // Restaurar validadores iniciales (solo email y password para login)
        this.setFormValidators(); 
    }

    toggleMode() {
        this.isRegisterMode = !this.isRegisterMode;
        this.authForm.reset(); // Resetear el formulario al cambiar de modo para limpiar los campos
        this.setFormValidators(); // Ajustar validadores según el modo
    }

    private setFormValidators() {
        const usernameControl = this.authForm.get('username');
        const emailControl = this.authForm.get('email');
        const passwordControl = this.authForm.get('password');
        const passwordConfirmationControl = this.authForm.get('passwordConfirmation');

        // Limpiar todos los validadores de los controles de forma condicional primero
        usernameControl?.clearValidators();
        passwordConfirmationControl?.clearValidators();
        // Asegurarse de aplicar siempre los validadores básicos para email y password
        emailControl?.setValidators([Validators.required, Validators.email]);
        passwordControl?.setValidators([Validators.required, Validators.minLength(8)]); // Asegúrate de que sea 8 aquí también

        if (this.isRegisterMode) {
            usernameControl?.setValidators([Validators.required]);
            passwordConfirmationControl?.setValidators([Validators.required]);
            // Aplicar el validador a nivel de FormGroup SOLO en modo registro
            this.authForm.setValidators(passwordMatchValidator);
        } else {
            // Remover el validador a nivel de FormGroup en modo login
            this.authForm.setValidators(null);
        }

        // Actualizar el estado de validación de los controles y el FormGroup
        usernameControl?.updateValueAndValidity();
        emailControl?.updateValueAndValidity();
        passwordControl?.updateValueAndValidity();
        passwordConfirmationControl?.updateValueAndValidity();
        this.authForm.updateValueAndValidity();
    }

    // Inicializar los validadores
    ngOnInit() {
        this.setFormValidators();
    }

    handleSubmit() {
        this.authForm.markAllAsTouched();

        if (this.authForm.invalid) {
            Swal.fire({
                text: "Por favor, completa correctamente todos los campos.",
                icon: "warning"
            });
            return;
        }

        if (this.isRegisterMode) {
            const { username, email, password } = this.authForm.value;
            const registerCredentials: RegisterCredentials = {
                username: username || '',
                email_user: email || '',
                password_user: password || ''
            };

            this.authService.register(registerCredentials).subscribe({
                next: (res) => {
                    Swal.fire({
                        text: "¡Registro exitoso! Ahora puedes iniciar sesión.",
                        icon: "success"
                    });
                    this.toggleLogin(); // Cierra el modal
                },
                error: (err) => {
                    Swal.fire({
                        text: err.error?.message || "Ocurrió un error durante el registro. Por favor, intenta de nuevo.",
                        icon: "error"
                    });
                    console.error('Registration error:', err);
                }
            });
        } else {
            const credentials: LoginCredentials = {
                email_user: this.authForm.value.email || '',
                password_user: this.authForm.value.password || '' 
            };
            this.authService.login(credentials).subscribe({
                next: (res) => {
                    this.toggleLogin(); // Cierra el modal
                    Swal.fire({
                        text: "Inicio de sesión exitoso",
                        icon: "success"
                    });
                    this.authForm.patchValue({ password: '', email: '' }); 
                },
                error: (err) => {
                    Swal.fire({
                        text: err.error?.message || "Email o contraseña inválido.", 
                        icon: "error"
                    });
                    this.authForm.patchValue({ password: '' });
                    console.error('Login error:', err);
                }
            });
        }
    }
}