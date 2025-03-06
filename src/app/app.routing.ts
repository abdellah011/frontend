import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

export const AppRoutes: Routes = [
  // ✅ Affiche la page login sans layout
  {
    path: 'login',
    component: LoginComponent
  },
  
  // ✅ Si l'utilisateur arrive sur '/', redirige vers login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // ✅ Charge les routes du tableau de bord avec le layout
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
      }
    ]
  },

  // ✅ Redirige toute autre URL vers le dashboard après connexion
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
