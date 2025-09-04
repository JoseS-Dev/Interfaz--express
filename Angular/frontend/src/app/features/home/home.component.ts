import { Component, Signal } from '@angular/core';
import { ImageCarouselComponent } from './carousel.component';
import { BannerComponent } from './banner.component';
import { ContactFormComponent } from './contact-form.component';
import { ServicesComponent } from './services.component';
import { FooterComponent } from "./footer.component";
import { TypographyService } from '../../core/services/typography.service';
import { environment } from '../../../environments/environment';
import { ITypography } from '../../shared/interfaces/typography.interface';
import { ColorsService } from '../../core/services/colors.service';
import { IColors } from '../../shared/interfaces/colors.interface';
import { NavbarComponent } from "../../shared/components/navbar.component";
import { Tangram3dComponent } from '../tangram3d/tangram.component';
import { LoaderService } from '../../core/services/loader.service';

@Component({
  standalone: true,
  selector: 'home',
  imports: [ImageCarouselComponent, BannerComponent, ContactFormComponent, ServicesComponent, FooterComponent, NavbarComponent, Tangram3dComponent],
  template: `
    @if (showTangram && !loaderIsHidden()){
      <tangram3d></tangram3d>
    } @else {
      <navbar />
      <banner />
      <image-carousel />
      <services />
      <contact-form />
      <footer-component />
    }
  `,
})
export class HomeComponent {
  showTangram = true;
  isLoading = true;
  isLoadColors = true;
  tangramKey = 0;
  loaderIsHidden: Signal<boolean>;
  constructor(
    private readonly typographyService: TypographyService,
    private readonly colorsService: ColorsService,
    private readonly loaderService: LoaderService
  ) {
    
    this.loaderIsHidden = this.loaderService.isHidden;
    this.colorsService.getSelected().subscribe({
      next: (data) => {
        if (data) this.loadColors(data);
        this.isLoadColors = false;
        this.reloadTangram();
        this.loadTangram3d();
      },
      error: (err) => {
        console.error('Error al obtener los colores seleccionados', err)
      },
    });
    
    console.log(this.loaderIsHidden())
    if (!this.loaderIsHidden()) {
      console.log(this.loaderIsHidden())
      this.loadTangram3d();
    }


    this.typographyService.getSelectedTypography().subscribe({
      next: (data) => {
        this.loadTypography(data)
      },
      error: (error) => {
        console.error('Error al obtener la tipografía seleccionada:', error);
        // Fallback a una fuente segura en caso de error
        document.documentElement.style.setProperty('--custom-font', 'Arial');
      }
    });

  }

  reloadTangram() {
    
    this.showTangram = false;

    
    setTimeout(() => {
      this.showTangram = true;
    });
  }
  loadTangram3d() {
    setTimeout(() => {
      this.isLoading = false;
      this.showTangram = false;
    }, 24000);
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

  loadColors(colors: IColors) {
    document.documentElement.style.setProperty('--color-primary', `#${colors.primary_color}`);
    document.documentElement.style.setProperty('--color-secondary', `#${colors.secondary_color}`);
    document.documentElement.style.setProperty('--color-tertiary', `#${colors.ternary_color}`);
    document.documentElement.style.setProperty('--color-quaternary', `#${colors.cuarternary_color}`);
    document.documentElement.style.setProperty('--color-quinary', `#${colors.neutral_color}`);
  }
}
