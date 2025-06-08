import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ITypographyPreview } from "./typography.interface";
import { TypographyService } from "../../../core/services/typography.service";
import Swal from 'sweetalert2';

@Component({
    standalone: true,
    selector: 'typography-form',
    imports: [ReactiveFormsModule],
    template: `
        <article class="text-xl flex flex-col items-center tracking-widese">
          <h3 class="w-full font-bold text-center border-b-2 border-black">Configuración de Fuentes</h3>
            <form 
            class="w-full h-152 flex flex-col items-center gap-1 px-2 py-3 bg-white"
            [formGroup]="typographyForm"
            (ngSubmit)="onSubmit()"
            >
                <div class="w-full h-22  px-3 flex flex-col gap-1">
                    <label class="w-full trancking-widese font-500 text-lg" for="primaryFont">Fuente Principal</label>
                    <input
                    class="w-full h-1/2 rounded-sm border border-[#374151]/25 text-center cursor-pointer px-3 py-2  bg-[#DFEEFF]/50 text-[#374151] text-sm text-[16px] focus:outline-none focus:border-secondary"
                    type="file"
                    accept=".ttf"
                    formControlName="primaryFont"
                    id="primaryFont"
                    (change)="onFileChange($event, 'primaryFont')"
                    required/>
                </div>
                <div class="w-full h-22  px-3 flex flex-col gap-1">
                    <label class="w-full trancking-widese font-500 text-lg" for="secondaryFont">Fuente Secundaria</label>
                    <input 
                    class="w-full h-1/2 rounded-sm border border-[#374151]/25 text-center cursor-pointer px-3 py-2  bg-[#DFEEFF]/50 text-[#374151] text-sm text-[16px] focus:outline-none focus:border-secondary"
                    type="file"
                    accept=".ttf" 
                    formControlName="secondaryFont"
                    id="secondaryFont" 
                    (change)="onFileChange($event, 'secondaryFont')"
                    required/>
                </div>
                
                <div class="w-full h-19  px-3 flex flex-col gap-1">
                    <label class="w-full trancking-widese font-500 text-lg" for="tam_title">Tamaño de los titulos</label>
                    <input
                    class="w-full h-1/2 rounded-sm border border-[#374151]/25 cursor-pointer px-3 py-2  bg-[#DFEEFF]/50 text-[#374151] text-sm text-[16px] focus:outline-none focus:border-secondary"
                    id="tam_title" 
                    formControlName="titleSize"
                    placeholder="Ingrese el tamaño de los titulos" 
                    required
                    (change)="onSizeChange()"
                    type="number"/>
                </div>
                <div class="w-full h-19  px-3 flex flex-col gap-1">
                    <label class="w-full trancking-widese font-500 text-lg" for="tam_subtitle">Tamaño de los subtitulos</label>
                    <input 
                    class="w-full h-1/2 rounded-sm border border-[#374151]/25 cursor-pointer px-3 py-2  bg-[#DFEEFF]/50 text-[#374151] text-sm text-[16px] focus:outline-none focus:border-secondary"
                    type="number"
                    formControlName="subtitleSize"
                    id="tam_subtitle"
                    placeholder="Ingrese el tamaño de los subtitulos"
                    (change)="onSizeChange()"
                    required/>
                </div>
                <div class="w-full h-19  px-3 flex flex-col gap-1">
                    <label class="w-full trancking-widese font-500 text-lg" for="tam_paragraph">Tamaño de los párrafos</label>
                    <input 
                    class="w-full h-1/2 rounded-sm border border-[#374151]/25 cursor-pointer px-3 py-2  bg-[#DFEEFF]/50 text-[#374151] text-sm text-[16px] focus:outline-none focus:border-secondary"
                    type="number" 
                    formControlName="paragraphSize" 
                    id="tam_paragraph" 
                    placeholder="Ingrese el tamaño de los párrafos"
                    (change)="onSizeChange()"
                    required/>
                </div>
                <div class="w-full flex justify-between px-3 mt-1.5">
                    <button type="submit"
                        class="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3 text-[16px] max-w-32"
                        >
                        Crear
                    </button>
                    <button type="submit"
                        class="bg-[#F97316] text-white px-3 py-2 rounded-md font-medium hover:bg-[#F97316]/75 transition-colors cursor-pointer w-1/3 text-[16px] max-w-32"
                        >
                        Editar
                    </button>
                </div>
            </form>
        </article>
    `
})
export class TypographyFormComponent {
    constructor (private typographyService: TypographyService) {}

    primaryFontName = '';
    secondaryFontName = '';
    primaryFontFile: File | null = null;
    secondaryFontFile: File | null = null;

    typographyForm = new FormGroup({
        primaryFont: new FormControl<File | null>(null),
        secondaryFont: new FormControl<File | null>(null),
        titleSize: new FormControl<number>(36, { nonNullable: true }),
        subtitleSize: new FormControl<number>(24, { nonNullable: true }),
        paragraphSize: new FormControl<number>(16, { nonNullable: true })
    });

    @Output() formChanged = new EventEmitter<ITypographyPreview>();
    @Output() formSubmitted = new EventEmitter<boolean>();

    onFileChange(event: Event, fontType: string) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            this.loadFont(file, fontType).then((fontName) => {
                if (fontType === 'primaryFont') {
                    this.primaryFontName = fontName; 
                    this.primaryFontFile = file;
                } else if (fontType === 'secondaryFont') {
                    this.secondaryFontName = fontName; 
                    this.secondaryFontFile = file;
                }
                this.emitForm(); 
            }).catch((error) => {
                console.error('Error loading font:', error);
            });
        }
    }

    loadFont(file: File, fontType: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const fontUrl = URL.createObjectURL(file);
            const fontName = `Custom-${fontType}-${Date.now()}`;
            const fontFace = new FontFace(fontName, `url(${fontUrl})`, {
                style: 'normal',
                weight: '100 900',
                display: 'swap',
            });
            fontFace.load().then((loadedFont) => {
                document.fonts.add(loadedFont);
                URL.revokeObjectURL(fontUrl); 
                resolve(fontName); // Devolver el nombre de la fuente
            }).catch((error) => {
                reject(error); 
            });
        });
    }

    onSizeChange() {
        this.emitForm();
    }

    emitForm() {
        this.formChanged.emit({
            primaryFont: this.primaryFontName || null,
            secondaryFont: this.secondaryFontName || null,
            titleSize: this.typographyForm.value.titleSize || 36,
            subtitleSize: this.typographyForm.value.subtitleSize || 24,
            paragraphSize: this.typographyForm.value.paragraphSize || 16
        });
    }

    onSubmit() {
        const primaryFont = this.primaryFontFile;
        const secondaryFont = this.secondaryFontFile;
        const titleSize = this.typographyForm.value.titleSize;
        const subtitleSize = this.typographyForm.value.subtitleSize;
        const paragraphSize = this.typographyForm.value.paragraphSize;
      
        // Validar que todos los campos estén definidos y tengan valor
        if (!primaryFont || !secondaryFont || !titleSize || !subtitleSize || !paragraphSize) {
            Swal.fire({
                icon: "warning",
                title: "Todos los campos deben se rellenados",
                showConfirmButton: false,
                timer: 2000
            });
          return;
        }
      
        // Construir FormData para enviar archivos y datos juntos
        const formData = new FormData();
        formData.append('main_font', primaryFont, primaryFont.name);
        formData.append('secondary_font', secondaryFont, secondaryFont.name);
        formData.append('name_tipography_main', this.primaryFontName);
        formData.append('name_tipography_secondary', this.secondaryFontName);
        formData.append('tam_paragraph', paragraphSize.toString());
        formData.append('tam_title', titleSize.toString());
        formData.append('tam_subtitle', subtitleSize.toString());
      
        this.typographyService.createTypography(formData).subscribe({
          next: () => {
            this.formSubmitted.emit(); 
            Swal.fire({
                icon: "success",
                title: "Tipografía creada exitosamente",
                showConfirmButton: false,
                timer: 1500
            });
          },
          error: () => {
            Swal.fire({
                icon: "error",
                title: "Error creando la tipografía",
                showConfirmButton: false,
                timer: 1500
            });
          }
        });
      }
}
