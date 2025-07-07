import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  styles: [
    `
    :host {
      display: block;
      min-height: 100vh;
    }
    `
  ],
  template: `
    <router-outlet />
  `,
})
export class AppComponent {
}
