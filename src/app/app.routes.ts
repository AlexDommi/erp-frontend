import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { permissionGuard } from './guards/permission.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/main-layout/main-layout.component')
      .then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component')
          .then(m => m.DashboardComponent)
      },

      // 🔥 AQUÍ debe estar usuarios
      {
        path: 'usuarios',
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/usuarios/usuarios.component')
              .then(m => m.UsuariosComponent)
          },
          {
            path: 'nuevo',
            loadComponent: () => import('./pages/usuarios/usuario-form/usuario-form.component')
              .then(m => m.UsuarioFormComponent)
          },
          {
            path: 'editar/:id',
            loadComponent: () => import('./pages/usuarios/usuario-form/usuario-form.component')
              .then(m => m.UsuarioFormComponent)
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
