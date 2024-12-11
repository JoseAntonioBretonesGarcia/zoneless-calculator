import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'calculator',
    loadComponent: () =>
      import('@app/calculator/views/calculator-view/calculator-view.component'),
  },
  { path: '**', redirectTo: 'calculator' },
];
