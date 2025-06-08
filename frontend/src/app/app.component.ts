import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar.component";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <navbar />
    <router-outlet />
  `,
})
export class AppComponent {
}
