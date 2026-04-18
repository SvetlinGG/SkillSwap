import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

export const skillsRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/skills-catalog/skills-catalog.component')
            .then( c => c.SkillsCatalogComponent)
    },
    {
        path: 'create',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./pages/skill-create/skill-create.component')
            .then( c => c.SkillCreateComponent)
    },
    {
        path: 'edit/:id',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./pages/skill-edit/skill-edit.component')
            .then(c => c.SkillEditComponent)
    },
    {
        path: ':id',
        loadComponent: () => 
            import('./pages/skill-details/skill-details.component')
            .then( c => c.SkillDetailsComponent)
    }
];