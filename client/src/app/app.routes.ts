import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

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
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},


    {path: '**', redirectTo: ''}
];
