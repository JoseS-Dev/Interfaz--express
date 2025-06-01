import { Component } from '@angular/core';
import { ImageCarouselComponent } from './carousel.component';
import { BannerComponent } from './banner.component';
import { ContactFormComponent } from './contact-form.component';
import { ServicesComponent } from './services.component';

@Component({
  standalone: true,
  selector: 'home',
  imports: [ImageCarouselComponent, BannerComponent, ContactFormComponent, ServicesComponent],
  template: `
    <banner />
    <image-carousel />
    <services />
    <contact-form />
  `,
})
export class HomeComponent {}
