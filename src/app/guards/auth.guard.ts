import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
console.log('TOKEN EN GUARD:', token);
  if (!token) {
    console.log('NO hay token → redirige a login');
    router.navigate(['/login']);
    return false;
  }
  console.log('Sí hay token → deja pasar');
  return true;
};
