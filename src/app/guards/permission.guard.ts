import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const permissionGuard = (permissions: string[]): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const userPerms = JSON.parse(localStorage.getItem('permisos') || '[]');

    const hasPermission = permissions.some(p => userPerms.includes(p));

    if (!hasPermission) {
      router.navigate(['/dashboard']);
      return false;
    }

    return true;
  };
};
