import { Component, EventEmitter, Input, Output, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { ColorsService } from "../../../core/services/colors.service";
import { IColorsPreview } from "../../../shared/interfaces/colors.interface";

@Component({
    standalone: true,
    selector: 'colors-form',
    imports: [ReactiveFormsModule],
    template: `
        <article class="text-xl flex flex-col items-center tracking-wide">
            <h3 class="w-full font-bold text-center border-b-2 border-black">Configuración de Fuentes</h3>
            <form 
                class="w-full h-152 flex flex-col items-center gap-1 px-2 py-3 bg-white"
                [formGroup]="colorsForm"
            >
                <div class="w-full h-22 flex flex-col gap-1">
                    <label
                        class="text-lg tracking-wide font-500 w-full border-b-2 border-gray-700"
                        for="primaryColor">
                        Color Primario
                    </label>
                    <input
                        class="w-full h-full"
                        formControlName="primaryColor"
                        (change)="onInputChange()"
                        type="color"
                        placeholder="Ingrese el color primario de la plantilla"
                        name="primaryColor"
                        id="primaryColor"
                    />
                </div>

                <div class="w-full h-22 flex flex-col gap-1">
                    <label
                        class="text-lg tracking-wide font-500 w-full border-b-2 border-gray-700"
                        for="secondaryColor">
                        Color Secundario
                    </label>
                    <input
                        class="w-full h-full"
                        formControlName="secondaryColor"
                        (change)="onInputChange()"
                        type="color"
                        name="secondaryColor"
                        id="secondaryColor"
                    />
                </div>

                <div class="w-full h-22 flex flex-col gap-1">
                    <label
                        class="text-lg tracking-wide font-500 w-full border-b-2 border-gray-700"
                        for="ternaryColor">
                        Color Terciario
                    </label>
                    <input
                        class="w-full h-full"
                        formControlName="ternaryColor"
                        (change)="onInputChange()"
                        type="color"
                        name="ternaryColor"
                        id="ternaryColor"
                    />
                </div>

                <div class="w-full h-22 flex flex-col gap-1">
                    <label
                        class="text-lg tracking-wide font-500 w-full border-b-2 border-gray-700"
                        for="quaternaryColor">
                        Color Cuaternario
                    </label>
                    <input
                        class="w-full h-full"
                        formControlName="quaternaryColor"
                        (change)="onInputChange()"
                        type="color"
                        name="quaternaryColor"
                        id="quaternaryColor"
                    />
                </div>

                <div class="w-full h-22 flex flex-col gap-1">
                    <label
                        class="text-lg tracking-wide font-500 w-full border-b-2 border-gray-700"
                        for="neutralColor">
                        Color Neutral
                    </label>
                    <input
                        class="w-full h-full"
                        formControlName="neutralColor"
                        (change)="onInputChange()"
                        type="color"
                        name="neutralColor"
                        id="neutralColor"
                    />
                </div>
                <div class="w-full flex justify-between px-3 mt-1.5">
                    <button
                        type="submit"
                        class="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3 text-[16px] max-w-32"
                        (click)="submit('create')"
                        >
                        Crear
                    </button>
                    <button
                        type="submit"
                        class="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3 text-[16px] max-w-32"
                        (click)="submit('edit')"
                        >
                        Editar
                    </button>
                </div>
            </form>
        </article>
    `
})
export class ColorsFormComponent {
    constructor(private colorsService: ColorsService) {}

    colorsForm = new FormGroup({
        primaryColor: new FormControl<string>('', [Validators.minLength(6)]),
        secondaryColor: new FormControl<string>('', [Validators.minLength(6)]),
        ternaryColor: new FormControl<string>('', [Validators.minLength(6)]),
        quaternaryColor: new FormControl<string>('', [Validators.minLength(6)]),
        neutralColor: new FormControl<string>('', [Validators.minLength(6)]),
    });

    @Output() formChanged = new EventEmitter<IColorsPreview>();
    @Output() formSubmitted = new EventEmitter<boolean>();

    @Input() selectedColorsId = signal<number | null>(null);

    onInputChange() {
        this.emitForm();
    }

    getNormalizedColors() {
        const rawValues = this.colorsForm.value;
        return {
            primaryColor: rawValues.primaryColor?.replace(/^#/, '') || '',
            secondaryColor: rawValues.secondaryColor?.replace(/^#/, '') || '',
            ternaryColor: rawValues.ternaryColor?.replace(/^#/, '') || '',
            quaternaryColor: rawValues.quaternaryColor?.replace(/^#/, '') || '',
            neutralColor: rawValues.neutralColor?.replace(/^#/, '') || ''
        };
    }

    emitForm() {
        const colors = this.getNormalizedColors();
        this.formChanged.emit({
            primaryColor: colors.primaryColor,
            secondaryColor: colors.secondaryColor,
            ternaryColor: colors.ternaryColor,
            quaternaryColor: colors.quaternaryColor,
            neutralColor: colors.neutralColor
        });
    }

    submit(action: 'create' | 'edit') {
        const colors = this.getNormalizedColors();
    
        if ((!colors.primaryColor || !colors.secondaryColor || !colors.ternaryColor || !colors.quaternaryColor || !colors.neutralColor) && action === 'create') {
            Swal.fire({
                icon: "warning",
                title: "Todos los campos deben ser rellenados",
                showConfirmButton: false,
                timer: 2000
            });
            return;
        }
    
        // Construye el objeto JSON directamente
        const colorsPayload = {
            primary_color: colors.primaryColor,
            secondary_color: colors.secondaryColor,
            ternary_color: colors.ternaryColor,
            cuarternary_color: colors.quaternaryColor,
            neutral_color: colors.neutralColor
        };
    
        if (action === 'create') {
            this.createColors(colorsPayload);
        } else if (action === 'edit') {
            this.updateColors(this.selectedColorsId() || 0, colorsPayload);
        }
    }
    

    createColors(colorsPayload: any): void {
        this.colorsService.create(colorsPayload).subscribe({
            next: () => {
            this.formSubmitted.emit(); 
            Swal.fire({
                icon: "success",
                title: "Paleta de colores creada exitosamente",
                showConfirmButton: false,
                timer: 1500
            });
            },
            error: (err) => {
                console.error(err)
                Swal.fire({
                    icon: "error",
                    title: "Error creando la paleta de colores",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }

    updateColors(id: number, colorsPayload: any): void {
        Swal.fire({
            title: "¿Está seguro de actualizar la paleta de colores?",
            text: "No se podrá revertir esta acción.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar"
        }).then((result) => {
            if (result.isConfirmed) {
                this.colorsService.update(id, colorsPayload).subscribe({
                    next: () => {
                        this.formSubmitted.emit();
                        Swal.fire({
                            title: "¡Éxito!",
                            text: "Su paleta de colores ha sido eliminada correctamente.",
                            icon: "success"
                        });
                    },
                    error: (err) => {
                        console.error(err)
                        Swal.fire({
                            icon: "error",
                            title: "Error actualizando la paleta de colores",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
            }
        });
    }
}
