import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypographyCardComponent } from "./typography-card.component";
import { TypographyListComponent } from "./typography-list.component";
import { ReactiveFormsModule } from '@angular/forms';
import { TypographyFormComponent } from "./typography-form.component";
import { ITypographyPreview } from './typography.interface';

@Component({
  standalone: true,
  selector: 'typography-view',
  imports: [
    CommonModule,
    TypographyCardComponent,
    TypographyListComponent,
    ReactiveFormsModule,
    TypographyFormComponent
  ],
  template: `
    <main class="w-full h-164 flex">
      <section class="w-3/10 h-full border-r-2 border-gray-800 px-3 py-3">
        <typography-form (formChanged)="handleFormChange($event)" />
      </section>

      <section class="border-r-2 border-gray-800 w-3/10 h-full px-3 py-3">
        <typography-card
          [primaryFont]="primaryFont"
          [secondaryFont]="secondaryFont"
          [titleSize]="titleSize"
          [subtitleSize]="subtitleSize"
          [paragraphSize]="paragraphSize"
        ></typography-card>
      </section>

      <section class="w-2/5 h-full px-3 py-3">
        <typography-list [formSubmitted]="formSubmitted"/>
      </section>
    </main>
  `
})
export class TypographyComponent {
  primaryFont: string = '';
  secondaryFont: string = '';
  titleSize: number = 36;
  subtitleSize: number = 24;
  paragraphSize: number = 16;

  formSubmitted = signal(false);

  handleFormChange(event: ITypographyPreview) {
    this.primaryFont = event.primaryFont || '';
    this.secondaryFont = event.secondaryFont || '';
    this.titleSize = event.titleSize;
    this.subtitleSize = event.subtitleSize;
    this.paragraphSize = event.paragraphSize;
  }

  handleFormSubmit() {
    this.formSubmitted.set(true)
  }
}
