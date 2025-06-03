import { Component } from "@angular/core";

@Component({
    standalone: true,
    selector: 'contact-form',
    template: `
        <section id="contacto" class="py-16 bg-quaternary">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="font-bold text-center text-secondary mb-12 font-secondary text-title">Contáctanos</h2>
                <div class="max-w-2xl mx-auto">
                    <form class="space-y-6">
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block font-medium text-quinary mb-2 font-primary text-paragraph">Nombre</label>
                                <input type="text" class="w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary">
                            </div>
                            <div>
                                <label class="block font-medium text-quinary mb-2 font-primary text-paragraph">Teléfono</label>
                                <input type="tel" class="w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary">
                            </div>
                        </div>
                        <div>
                            <label class="block font-medium text-quinary mb-2 font-primary text-paragraph">Email</label>
                            <input type="email" class="w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary">
                        </div>
                        <div>
                            <label class="block font-medium text-quinary mb-2 font-primary text-paragraph">Mensaje</label>
                            <textarea rows="4" class="w-full px-3 py-2 border border-quinary/25 rounded-md focus:outline-none focus:border-secondary resize-none"></textarea>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="bg-tertiary text-quaternary px-8 py-3 rounded-md font-medium hover:bg-tertiary/75 transition-colors font-primary text-paragraph">
                                Enviar Mensaje
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    `
})
export class ContactFormComponent {}