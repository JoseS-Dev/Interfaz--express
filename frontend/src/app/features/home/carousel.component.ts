import { Component, signal } from '@angular/core';

interface Image {
  src: string;
  alt: string;
}

@Component({
  selector: 'image-carousel',
  standalone: true,
  template: `
    <section id="galeria" class="py-16 bg-primary">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="font-bold text-center text-secondary mb-12 font-secondary text-title">Nuestras Instalaciones</h2>

            <!-- Carrusel Desktop (3 en 3) -->
            <div class="hidden lg:block relative">
              <div id="carousel-desktop" class="overflow-hidden rounded-lg shadow-lg">
                  <div 
                  id="carousel-inner-desktop" 
                  class="flex transition-transform duration-500 ease-in-out" 
                  [style.transform]="'translateX(-' + (currentSlideDesktop() * 100) + '%)'"
                  >
                  @for (slide of slidesDesktop; track slide) {
                  <div class="w-full flex-shrink-0 grid grid-cols-3 gap-4">
                      @for (image of slide; track image) {
                      <div class="aspect-w-16 aspect-h-12">
                          <img [src]="image.src" [alt]="image.alt" class="w-full h-64 object-cover rounded-lg" />
                      </div>
                      }
                  </div>
                  }

                  </div>
              </div>

              <!-- Botones -->
              <button 
                  (click)="prevSlideDesktop()" 
                  class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-quaternary bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-md focus:outline-none z-10"
                  aria-label="Anterior"
              >
                  <i class="fas fa-chevron-left text-secondary text-xl"></i>
              </button>
              <button 
                  (click)="nextSlideDesktop()" 
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-quaternary bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-md focus:outline-none z-10"
                  aria-label="Siguiente"
              >
                  <i class="fas fa-chevron-right text-secondary text-xl"></i>
              </button>
            </div>
        </div>
      </section>

        <!-- Carrusel Mobile/Tablet (1 en 1) -->
      <div class="lg:hidden relative">
        <!-- Contador de slides para móvil -->
        <div class="absolute z-10 top-4 right-4 bg-quinary/50 text-quaternary px-3 py-1 rounded-full text-sm">
            <span id="slide-counter">1 / 9</span>
        </div>
        <div id="carousel-mobile" class="overflow-hidden rounded-lg shadow-lg">
          <div id="carousel-inner-mobile" class="flex transition-transform duration-500 ease-in-out" [style.transform]="'translateX(-' + (currentSlideMobile() * 100) + '%)'">
              @for (image of images; track image) {
                <div class="w-full flex-shrink-0">
                  <img [src]="image.src" [alt]="image.alt" class="w-full h-64 sm:h-80 object-cover rounded-lg">
                </div>
              }
          </div>
        </div>
        <button (click)="prevSlideMobile()" class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-quaternary bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-md focus:outline-none z-10">
            <i class="fas fa-chevron-left text-secondary text-xl"></i>
        </button>
        <button (click)="nextSlideMobile()" class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-quaternary bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-md focus:outline-none z-10">
            <i class="fas fa-chevron-right text-secondary text-xl"></i>
        </button>
      </div>
  `,
})
export class ImageCarouselComponent {
  images: Image[] = [
    { src: 'assets/img/img4.avif', alt: 'Recepción moderna' },
    { src: 'assets/img/img5.avif', alt: 'Sala de espera' },
    { src: 'assets/img/img6.avif', alt: 'Consultorio médico' },
    { src: 'assets/img/img7.jpeg', alt: 'Laboratorio' },
    { src: 'assets/img/img8.avif', alt: 'Sala de rehabilitación' },
    { src: 'assets/img/img9.avif', alt: 'Área de nutrición' },
    { src: 'assets/img/img10.avif', alt: 'Quirófano' },
    { src: 'assets/img/img11.avif', alt: 'Farmacia' },
    { src: 'assets/img/img12.avif', alt: 'Jardín terapéutico' }
  ];

  slidesDesktop = this.groupImages(this.images, 3);
  currentSlideDesktop = signal(0);
  totalSlidesDesktop = this.slidesDesktop.length;

  prevSlideDesktop() {
    this.currentSlideDesktop.update(i => (i - 1 + this.totalSlidesDesktop) % this.totalSlidesDesktop);
  }
  nextSlideDesktop() {
    this.currentSlideDesktop.update(i => (i + 1) % this.totalSlidesDesktop);
  }

  slidesMobile = this.groupImages(this.images, 1);
  currentSlideMobile = signal(0);
  totalSlidesMobile = this.slidesMobile.length;

  prevSlideMobile() {
    this.currentSlideMobile.update(i => (i - 1 + this.totalSlidesMobile) % this.totalSlidesMobile);
  }
  nextSlideMobile() {
    this.currentSlideMobile.update(i => (i + 1) % this.totalSlidesMobile);
  }

  private groupImages(images: Image[], chunkSize: number): Image[][] {
    const groups: Image[][] = [];
    for (let i = 0; i < images.length; i += chunkSize) {
      groups.push(images.slice(i, i + chunkSize));
    }
    return groups;
  }
}
