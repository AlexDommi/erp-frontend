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

      /* ===== USUARIOS ===== */
      {
        path: 'usuarios',
        canActivate: [permissionGuard(['Usuarios.Ver'])],
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
          },
          {
            path: 'roles',
            loadComponent: () => import('./pages/usuarios/usuarios-roles/usuarios-roles.component')
              .then(m => m.UsuariosRolesComponent)
          },
          {
            path: 'permisos',
            loadComponent: () => import('./pages/usuarios/usuarios-permisos/usuarios-permisos.component')
              .then(m => m.UsuariosPermisosComponent)
          },
          {
            path: 'roles-permisos',
            loadComponent: () => import('./pages/usuarios/roles-permisos/roles-permisos.component')
              .then(m => m.RolesPermisosComponent)
          }
        ]
      },

      /* ===== CLIENTES ===== */
      {
        path: 'clientes',
        /*canActivate: [permissionGuard(['Clientes.Ver'])],*/
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/ModClientes/clientes/clientes.component')
              .then(m => m.ClientesComponent)
          },
          {
            path: 'direcciones',
            loadComponent: () => import('./pages/ModClientes/direcciones/direcciones.component')
              .then(m => m.DireccionesComponent)
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