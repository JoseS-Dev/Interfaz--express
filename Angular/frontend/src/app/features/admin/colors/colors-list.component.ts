import { Component, effect, EventEmitter, Input, Output, signal } from "@angular/core";
import Swal from 'sweetalert2';
import { NgClass } from "@angular/common";
import { IColors } from "../../../shared/interfaces/colors.interface";
import { ColorsService } from "../../../core/services/colors.service";

@Component({
    standalone: true,
    selector: 'colors-list',
    imports: [NgClass],
    template: `
        <article class="border-b-2 h-1/20 w-full border-black flex justify-between items-center text-xl tracking-widest">
            <h3 class="font-bold">Registro de colores</h3>
        </article>
        
        <article class="w-full h-145 my-2 p-3 overflow-y-auto flex flex-col items-center gap-3 max-h-140 ">
            @for (color of colors(); track color.id_colors) {
                <div
                class="flex justify-around items-center w-full h-1/8 border-b-2 border-blue-800 cursor-pointer hover:bg-blue-50"
                (click)="handleSelect(color.id_colors)"
                [ngClass]="{
                    'bg-blue-100': selectedColorsId() === color.id_colors,
                    'bg-white': selectedColorsId() !== color.id_colors
                }">
                
                <h4 class="h-4/5 w-1/20 flex justify-center items-center font-bold text-xl">{{ color.id_colors }}</h4>
                <div [class]="'border-2 border-black rounded-full w-1/10 h-4/5'"
                    [style.background-color]="'#' + color.primary_color"
                    [title]="color.primary_color"></div>
                <div [class]="'border-2 border-black rounded-full w-1/10 h-4/5'"
                    [style.background-color]="'#' + color.secondary_color"
                    [title]="color.secondary_color"></div>
                <div [class]="'border-2 border-black rounded-full w-1/10 h-4/5'"
                    [style.background-color]="'#' + color.ternary_color"
                    [title]="color.ternary_color"></div>
                <div [class]="'border-2 border-black rounded-full w-1/10 h-4/5'"
                    [style.background-color]="'#' + color.cuarternary_color"
                    [title]="color.cuarternary_color"></div>
                <div [class]="'border-2 border-black rounded-full w-1/10 h-4/5'"
                    [style.background-color]="'#' + color.neutral_color"
                    [title]="color.neutral_color"></div>

                @if (color.id_colors != 1) {
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" (click)="handleDelete(color.id_colors, $event)"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-trash2-icon lucide-trash-2 hover:text-red-600 transition-colors duration-300 cursor-pointer">
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                }
                </div>
            }
        </article>
    `
})
export class ColorsListComponent {
    @Input() formSubmitted = signal(false);
    @Output() selectedColorsIdOutput = new EventEmitter<number | null>();
    selectedColorsId = signal<number | null>(null);

    colors = signal<IColors[]>([]);

    constructor(private colorsService: ColorsService) {
        effect(() => {
            if (this.formSubmitted()) {
                this.loadColors();
                this.formSubmitted.set(false);
                console.log(this.formSubmitted())
            }
        });

        this.loadColors();
    }

    loadColors() {
        this.colorsService.getAll().subscribe({
        next: async (data) => {
            this.colors.set(data)
            const id = data.find((c) => c.is_selected === 1)?.id_colors || null;
            this.selectedColorsId.set(id);
            this.selectedColorsIdOutput.emit(id);
        },
        error: (err) => console.error(err)
        });
    }

    handleSelect(id: number) {
        this.colorsService.select(id).subscribe({
            next: () => {
                this.selectedColorsId.set(id);
                this.selectedColorsIdOutput.emit(id);
                Swal.fire({
                    title: "¡Éxito!",
                    text: "Paleta de colores seleccionada correctamente.",
                    icon: "success"
                });
            },
            error: (err) => {
                console.error(err);
                Swal.fire({
                    title: "Error",
                    text: "No se pudo seleccionar la paleta de colores.",
                    icon: "error"
                });
            }
        });
    }

    handleDelete(id: number, event: MouseEvent) {
        event.stopPropagation();
        Swal.fire({
            title: "¿Está seguro de eliminar la paleta de colores?",
            text: "No se podrá revertir esta acción.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar"
        }).then((result) => {
            if (result.isConfirmed) {
                this.colorsService.delete(id).subscribe({
                    next: () => {
                        this.loadColors();
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
                            title: "Error eliminando la paleta de colores",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
            }
        });
    }
}
