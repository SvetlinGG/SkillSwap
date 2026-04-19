import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path: '', loadComponent: () => 
        import('./features/home/home/home.component')
        .then( c => c.HomeComponent)
    },
    {
        path: 'skills',
        loadChildren: () =>
            import('./features/skills/skills.routes')
            .then( r => r.skillsRoutes)
    },
    {
        path: 'login', 
        loadComponent: () =>
            import('./features/auth/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'register', 
        loadComponent: () => 
            import('./features/auth/register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () => 
            import('./features/dashboard/pages/dashboard/dashboard.component')
            .then(c => c.DashboardComponent)
    },
    {
        path: '**', 
        redirectTo: ''
    }
];
