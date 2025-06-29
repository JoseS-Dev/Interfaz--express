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
      height: 100vh;
      width: 100vw;
      overflow: hidden;
    }
    `
  ],
  template: `
    <router-outlet />
  `,
})
export class AppComponent {
}
