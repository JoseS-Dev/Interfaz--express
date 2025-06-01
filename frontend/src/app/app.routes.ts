import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Bienestar Total - Tu salud es nuestra prioridad' },
    { path: '**', redirectTo: '', pathMatch: 'full' } // Redirije las rutas no encontradas
];
