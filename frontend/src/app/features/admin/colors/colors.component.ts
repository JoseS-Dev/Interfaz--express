import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorsCardComponent } from './colors-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorsFormComponent } from './colors-form.component';
import { ColorsListComponent } from "./colors-list.component";
import { IColorsPreview } from '../../../shared/interfaces/colors.interface';

@Component({
    standalone: true,
    selector: 'typography-view',
    imports: [
        CommonModule,
        ColorsCardComponent,
        ReactiveFormsModule,
        ColorsFormComponent,
        ColorsListComponent
    ],
    template: `
        <main class="w-full h-164 flex">
        <section class="w-3/10 h-full border-r-2 border-gray-800 px-3 py-3">
            <colors-form
                (formChanged)="handleFormChange($event)"
                [selectedColorsId]="selectedColorsId"
                (formSubmitted)="handleFormSubmit()"
            />
        </section>

        <section class="border-r-2 border-gray-800 w-3/10 h-full px-3 py-3">
            <colors-card
                [primaryColor]="primaryColor"
                [secondaryColor]="secondaryColor"
                [ternaryColor]="ternaryColor"
                [quaternaryColor]="quaternaryColor"
                [neutralColor]="neutralColor"
            ></colors-card>
        </section>

        <section class="w-2/5 h-full px-3 py-3">
            <colors-list [formSubmitted]="formSubmitted" (selectedColorsIdOutput)="handleSelectedColorsId($event)"/>
        </section>
        </main>
    `
})
export class ColorsComponent {
    primaryColor: string = '';
    secondaryColor: string = '';
    ternaryColor: string = '';
    quaternaryColor: string = '';
    neutralColor: string = '';

    formSubmitted = signal(false);
    selectedColorsId = signal<number | null>(null);

    handleFormChange(event: IColorsPreview) {
        this.primaryColor = event.primaryColor;
        this.secondaryColor = event.secondaryColor;
        this.ternaryColor = event.ternaryColor;
        this.quaternaryColor = event.quaternaryColor;
        this.neutralColor = event.neutralColor;
    }

    handleFormSubmit() {
        this.formSubmitted.set(true)
    }

    handleSelectedColorsId(id: number | null) {
        this.selectedColorsId.set(id);
    }
}
