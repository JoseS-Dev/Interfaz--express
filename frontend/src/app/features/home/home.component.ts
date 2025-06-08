import { Component } from '@angular/core';
import { ImageCarouselComponent } from './carousel.component';
import { BannerComponent } from './banner.component';
import { ContactFormComponent } from './contact-form.component';
import { ServicesComponent } from './services.component';
import { FooterComponent } from "./footer.component";
import { TypographyService } from '../../core/services/typography.service';
import { environment } from '../../../environments/environment';
import { ITypography } from '../../shared/interfaces/typography.interface';

@Component({
  standalone: true,
  selector: 'home',
  imports: [ImageCarouselComponent, BannerComponent, ContactFormComponent, ServicesComponent, FooterComponent],
  template: `
    <banner />
    <image-carousel />
    <services />
    <contact-form />
    <footer-component />
  `,
})
export class HomeComponent {
  constructor(private typographyService: TypographyService) {
    this.typographyService.getSelectedTypography().subscribe({
      next: (data) => {
        console.log(data);
        this.loadTypography(data)
      },
      error: (error) => {
        console.error('Error al obtener la tipografía seleccionada:', error);
        // Fallback a una fuente segura en caso de error
        document.documentElement.style.setProperty('--custom-font', 'Arial');
      }
    });
  }

  loadFont(nameFont: string): Promise<string> {
    return new Promise((resolve) => {
        // Sanear el nombre: eliminar extensión y caracteres no permitidos
        const sanitizedFontName = nameFont.replace(/\.[^/.]+$/, "") // Elimina extensión
                                         .replace(/[^a-zA-Z0-9\-]/g, "-"); // Reemplaza caracteres inválidos
        
        const fontName = `Custom-${sanitizedFontName}-${Date.now()}`;
        
        // Agregar comillas simples a la URL
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
            // Fallback a fuente segura
            resolve("Arial");
        });
    });
  };

  loadTypography(typography: ITypography) {
    this.loadFont(typography.name_tipography_main).then((fontName) => {
      document.documentElement.style.setProperty('--font-primary', fontName);
    });
    this.loadFont(typography.name_tipography_secondary).then((fontName) => {
      document.documentElement.style.setProperty('--font-secondary', fontName);
    });

    document.documentElement.style.setProperty('--text-title', `${typography.tam_title}px`);
    document.documentElement.style.setProperty('--text-subtitle', `${typography.tam_subtitle}px`);
    document.documentElement.style.setProperty('--text-paragraph', `${typography.tam_paragraph}px`);
  }
}
