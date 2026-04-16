import { Routes } from '@angular/router';

export const skillsRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./pages/skills-catalog/skills-catalog.component')
            .then( c => c.SkillsCatalogComponent)
    },
    {
        path: 'create',
        loadComponent: () =>
            import('./pages/skill-create/skill-create.component')
            .then( c => c.SkillCreateComponent)
    },
    {
        path: ':id',
        loadComponent: () => 
            import('./pages/skill-details/skill-details.component')
            .then( c => c.SkillDetailsComponent)
    }
];