import { Component, effect, Input, signal } from "@angular/core";;
import { TypographyService } from "../../../core/services/typography.service";
import { TruncatePipe } from "../../../shared/pipes/truncate.pipe";
import { provideIcons } from "@ng-icons/core";
import { heroPencilSolid } from "@ng-icons/heroicons/solid";
import { heroTrash } from "@ng-icons/heroicons/outline";
import Swal from 'sweetalert2';

@Component({
    standalone: true,
    selector: 'typography-list',
    imports: [TruncatePipe],
    providers: [provideIcons({ heroPencilSolid, heroTrash })],
    template: `
        <article class="border-b-2 h-1/20 w-full border-black flex justify-between items-center text-xl trackig-widese">
          <h3 class="font-bold">Registro de Fuentes</h3>
        </article>
        
        <article class="w-full h-145 my-2 p-3 overflow-y-auto flex flex-col items-center gap-3 max-h-140">
            @for (typography of typographies(); track $index) {
                <div class="flex justify-around items-center w-full h-1/8 border-b-2 border-blue-800">
                    <h4 class="font-bold text-lg tracking-widest px-3">{{ typography.id_tipography }}</h4>
                    <span class="font-sans text-lg flex-grow-30 basis-0">{{ typography.name_tipography_main | truncate:12 }}</span>
                    <span class="font-serif text-lg flex-grow-30 basis-0">{{ typography.name_tipography_secondary | truncate:12  }}</span>
                    <div class="flex gap-3 flex-grow-30 basis-0">
                        <span class="font-bold" title="tam_title">{{ typography.tam_title }}px</span>
                        <span class="font-bold" title="tam_subtitle">{{ typography.tam_subtitle }}px</span>
                        <span class="font-bold" title="tam_paragraph">{{ typography.tam_paragraph }}px</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" (click)="handleDelete(typography.id_tipography)"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-trash2-icon lucide-trash-2 hover:text-red-600 transition-colors duration-300 cursor-pointer">
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                </div>
            }
        </article>
    `
})
export class TypographyListComponent {
    @Input() formSubmitted = signal(false);
  
    // Señal para almacenar el arreglo de tipografías
    typographies = signal<any[]>([]);
  
    constructor(private typographyService: TypographyService) {
      // Efecto que se ejecuta cada vez que formSubmitted cambia a true
      effect(() => {
        if (this.formSubmitted()) {
          this.loadTypographies();
          this.formSubmitted.set(false);
        }
      });
  
      // Carga inicial
      this.loadTypographies();
    }
  
    loadTypographies() {
      this.typographyService.getTypography().subscribe({
        next: (data) => this.typographies.set(data),
        error: (err) => console.error(err)
      });
    }
  
    handleDelete(id: string) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                this.typographyService.deleteTypography(id).subscribe({
                    next: () => {
                        this.loadTypographies()
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                    },
                    error: (err) => console.error(err)
                });
            }
        });
    }
  }
  