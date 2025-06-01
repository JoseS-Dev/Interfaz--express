import { Component } from "@angular/core";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { faBrandFacebookF, faBrandTwitter, faBrandInstagram, faBrandLinkedinIn } from "@ng-icons/font-awesome/brands";
import { heroMapPinSolid, heroEnvelopeSolid, heroPhoneSolid } from "@ng-icons/heroicons/solid";

@Component({
    standalone: true,
    selector: 'footer-component',
    imports: [NgIcon],
    providers: [provideIcons({
        faBrandFacebookF,
        faBrandTwitter,
        faBrandInstagram,
        faBrandLinkedinIn,
        heroMapPinSolid,
        heroEnvelopeSolid,
        heroPhoneSolid
    })],
    template: `
        <footer class="bg-secondary text-quaternary py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-3 gap-8">
                <div>
                    <h3 class="text-lg font-semibold mb-4">Bienestar Total</h3>
                    <p class="text-quaternary/75">Tu salud y bienestar son nuestra prioridad. Ofrecemos servicios médicos de calidad.</p>
                </div>
                <div>
                    <h3 class="text-lg font-semibold mb-4">Contacto</h3>
                    <p class="text-quaternary/75"><ng-icon name="heroMapPinSolid" size="16" /> Av. Principal 123, Ciudad</p>
                    <p class="text-quaternary/75"><ng-icon name="heroPhoneSolid" size="16" /> (555) 123-4567</p>
                    <p class="text-quaternary/75"><ng-icon name="heroEnvelopeSolid" size="16" /> info&#64;bienestartotal.com</p>
                </div>
                <div>
                    <h3 class="text-lg font-semibold mb-4">Horarios</h3>
                    <p class="text-quaternary/75">Lunes - Viernes: 8:00 - 18:00</p>
                    <p class="text-quaternary/75">Sábados: 9:00 - 14:00</p>
                    <p class="text-quaternary/75">Domingos: Cerrado</p>
                </div>
            </div>
            <div class="border-t border-primary mt-8 pt-8 text-center">
                <div class="flex justify-center space-x-4 mb-4">
                    @for (socialMedia of socialMediaList; track $index) {
                        <a [href]="" class="text-quaternary hover:text-quaternary/75">
                            <ng-icon [name]="socialMedia.icon" size="16" />
                        </a>
                    }
                </div>
                <p class="text-quaternary/75">&copy; 2024 Bienestar Total. Todos los derechos reservados.</p>
            </div>
        </div>
        </footer>
    `
})
export class FooterComponent {
    socialMediaList = [
        { icon: 'faBrandFacebookF', url: 'https://facebook.com' },
        { icon: 'faBrandTwitter', url: 'https://twitter.com' },
        { icon: 'faBrandInstagram', url: 'https://instagram.com' },
        { icon: 'faBrandLinkedinIn', url: 'https://linkedin.com' }
    ]
}