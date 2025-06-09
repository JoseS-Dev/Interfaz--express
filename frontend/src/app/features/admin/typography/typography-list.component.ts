import { Component, effect, EventEmitter, Input, Output, signal } from "@angular/core";
import { TypographyService } from "../../../core/services/typography.service";
import { TruncatePipe } from "../../../shared/pipes/truncate.pipe";
import Swal from 'sweetalert2';
import { NgClass } from "@angular/common";
import { ITypography } from "../../../shared/interfaces/typography.interface";
import { environment } from "../../../../environments/environment";

@Component({
    standalone: true,
    selector: 'typography-list',
    imports: [TruncatePipe, NgClass],
    template: `
        <article class="border-b-2 h-1/20 w-full border-black flex justify-between items-center text-xl tracking-widest">
          <h3 class="font-bold">Registro de Fuentes</h3>
        </article>
        
        <article class="w-full h-145 my-2 p-3 overflow-y-auto flex flex-col items-center gap-3 max-h-140 ">
            @for (typography of typographies(); track typography.id_tipography) {
                <div
                class="flex justify-around items-center w-full h-1/8 border-b-2 border-blue-800 cursor-pointer hover:bg-blue-50"
                (click)="handleSelect(typography.id_tipography)"
                [ngClass]="{
                    'bg-blue-100': selectedTypographyId() === typography.id_tipography,
                    'bg-white': selectedTypographyId() !== typography.id_tipography
                }">
                    <h4 class="font-bold text-lg tracking-widest px-3">{{ typography.id_tipography }}</h4>
                    <span [style.fontFamily]="loadedFonts[typography.id_tipography].main" class="text-lg flex-grow-30 basis-0">{{ typography.name_tipography_main | truncate:12 }}</span>
                    <span [style.fontFamily]="loadedFonts[typography.id_tipography].secondary" class="text-lg flex-grow-30 basis-0">{{ typography.name_tipography_secondary | truncate:12 }}</span>
                    <div class="flex gap-3 flex-grow-30 basis-0">
                        <span class="font-bold" title="tam_title">{{ typography.tam_title }}px</span>
                        <span class="font-bold" title="tam_subtitle">{{ typography.tam_subtitle }}px</span>
                        <span class="font-bold" title="tam_paragraph">{{ typography.tam_paragraph }}px</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" (click)="handleDelete(typography.id_tipography, $event)"
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
    @Output() selectedTypographyIdOutput = new EventEmitter<string | null>();
    selectedTypographyId = signal<string | null>(null);

    typographies = signal<ITypography[]>([]);

    // Objeto para almacenar los nombres de fuentes cargadas por tipografía
    loadedFonts: Record<string, { main: string, secondary: string }> = {};

    constructor(private typographyService: TypographyService) {
      effect(() => {
        if (this.formSubmitted()) {
          console.log(this.formSubmitted())
          this.loadTypographies();
          this.formSubmitted.set(false);
          console.log(this.formSubmitted())
        }
      });

      this.loadTypographies();
    }

    loadTypographies() {
      this.typographyService.getTypography().subscribe({
        next: async (data) => {
            this.typographies.set(data)
            const id = data.find((t) => t.is_selected === 1)?.id_tipography || null;
            this.selectedTypographyId.set(id);
            this.selectedTypographyIdOutput.emit(id);

            // Cargar las fuentes para cada tipografía
            for (const typography of data) {
                const mainFont = await this.loadFont(typography.name_tipography_main);
                const secondaryFont = await this.loadFont(typography.name_tipography_secondary);
                this.loadedFonts[typography.id_tipography] = {
                    main: mainFont,
                    secondary: secondaryFont
                };
            }
        },
        error: (err) => console.error(err)
      });
    }

    loadFont(nameFont: string): Promise<string> {
      return new Promise((resolve) => {
          const sanitizedFontName = nameFont.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9\-]/g, "-");
          const fontName = `Custom-${sanitizedFontName}-${Date.now()}`;
          const url = `url('${environment.baseUrl}/font/${nameFont}')`;

          const fontFace = new FontFace(fontName, url, {
            style: 'normal',
            weight: '100 900',
            display: 'swap',
          });

          fontFace.load()
          .then((loadedFont) => {
            document.fonts.add(loadedFont);
            resolve(fontName);
          })
          .catch((error) => {
            console.error('Error al cargar la fuente:', error);
            resolve("Arial");
          });
      });
    };

    handleSelect(id: string) {
        this.typographyService.selectTypography(id).subscribe({
            next: () => {
                this.selectedTypographyId.set(id);
                this.selectedTypographyIdOutput.emit(id);
                Swal.fire({
                    title: "¡Éxito!",
                    text: "Tipografía seleccionada correctamente.",
                    icon: "success"
                });
            },
            error: (err) => {
                console.error(err);
                Swal.fire({
                    title: "Error",
                    text: "No se pudo seleccionar la tipografía.",
                    icon: "error"
                });
            }
        });
    }

    handleDelete(id: string, event: MouseEvent) {
        event.stopPropagation();
        Swal.fire({
            title: "¿Está seguro de eliminar la tipografía?",
            text: "No se podrá revertir esta acción.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar"
        }).then((result) => {
            if (result.isConfirmed) {
                this.typographyService.deleteTypography(id).subscribe({
                    next: () => {
                        this.loadTypographies();
                        Swal.fire({
                            title: "¡Éxito!",
                            text: "Su tipografía ha sido eliminada correctamente.",
                            icon: "success"
                        });
                    },
                    error: (err) => console.error(err)
                });
            }
        });
    }
}
