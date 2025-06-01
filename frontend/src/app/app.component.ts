import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar.component";
import { FooterComponent } from "./shared/components/footer.component";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <navbar />
    <router-outlet />
    <footer-component />
  `,
})
export class AppComponent {
}
