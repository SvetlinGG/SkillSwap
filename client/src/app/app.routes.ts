import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

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
        path: 'liked-skills',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/skills/pages/liked-skills/liked-skills.component')
            .then(c => c.LikedSkillsComponent)
    },
    {
        path: 'login', 
        canActivate: [guestGuard],
        loadComponent: () =>
            import('./features/auth/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'register', 
        canActivate: [guestGuard],
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
