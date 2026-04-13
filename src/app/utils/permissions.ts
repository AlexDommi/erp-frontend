export function hasPermission(permission: string): boolean{
  const permisos = localStorage.getItem('permisos');

  if (!permisos || permisos === 'undefined') {
    return false;
  }

  const parsed = JSON.parse(permisos);
  return parsed.includes(permission);
}
