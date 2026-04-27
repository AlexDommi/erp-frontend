import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'https://localhost:7129/api/usuarios';
  private rolesUrl = 'https://localhost:7129/api/UsuariosRoles';
  private permisosUrl = 'https://localhost:7129/api/permisos';

  constructor(private http: HttpClient) {}

  // 🔹 USUARIOS
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUsuariosId(id:number){
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // 🔹 ROLES
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.rolesUrl}/roles`);
  }
  
  getRolesById(id:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.rolesUrl}/${id}`);
  }
  // 🔹 PERMISOS POR ROLES
  getPermisosPorRoles(roles: number[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.permisosUrl}/por-roles`, roles);
  }

  // 🔹 ACTUALIZAR (🔥 ahora completo)
  actualizarUsuario(id: number, data: any){
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // 🔹 CREAR
  crearUsuario(data:any){
    return this.http.post(this.apiUrl, data);
  }


}