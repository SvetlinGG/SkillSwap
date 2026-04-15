import { Routes } from '@angular/router';

export const skillsRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages')
    }
]