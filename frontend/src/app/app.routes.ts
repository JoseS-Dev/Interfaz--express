import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AdminComponent } from './features/admin/admin.component';
import { ColorsComponent } from './features/admin/colors.component';
import { TypographyComponent } from './features/admin/typography/typography.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { 
        path: '',
        component: HomeComponent,
        title: 'Bienestar Total - Tu salud es nuestra prioridad'
    },
    { 
        path: 'admin', 
        title: 'Admin View',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'colors',
                component: ColorsComponent
            },
            {
                path: 'typography',
                component: TypographyComponent
            },
            {
                path: '',
                component: AdminComponent, 
            },
        ]
    },
    { 
        path: '**', 
        redirectTo: '', 
        pathMatch: 'full'
    } // Redirije las rutas no encontradas
];
