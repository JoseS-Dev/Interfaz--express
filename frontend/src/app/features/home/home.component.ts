import { Component } from '@angular/core';
import { ImageCarouselComponent } from './carousel.component';
import { BannerComponent } from './banner.component';
import { ContactFormComponent } from './contact-form.component';
import { ServicesComponent } from './services.component';
import { FooterComponent } from "./footer.component";

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
export class HomeComponent {}
