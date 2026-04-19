import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const permissionGuard = (permissions: string[]): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const userPerms = JSON.parse(localStorage.getItem('permisos') || '[]');

    const hasPermission = permissions.some(p => userPerms.includes(p));

    if (!hasPermission) {
      return router.createUrlTree(['/dashboard']); // 🔥 mejor práctica
    }

    return true;
  };
};