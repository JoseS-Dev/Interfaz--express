import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { Tangram3dComponent } from './features/tangram3d/tangram.component';
import { AdminComponent } from './features/admin/admin.component';
import { ColorsComponent } from './features/admin/colors/colors.component'; 
import { TypographyComponent } from './features/admin/typography/typography.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UsersComponent } from './features/admin/users/users.component';
import { ProfileComponent } from './features/profile/profile.component';

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
                path: '',
                component: AdminComponent, 
            },
            {
                path: 'colors',
                component: ColorsComponent
            },
            {
                path: 'typography',
                component: TypographyComponent
            },
            {
                path: 'users',
                component: UsersComponent
            },
        ]
    },
    {
        path: 'profile',
        title: 'Completación de datos',
        canActivate: [AuthGuard],
        component: ProfileComponent,
    },
    { 
        path: '**', 
        redirectTo: '', 
        pathMatch: 'full'
    } // Redirije las rutas no encontradas
];
