import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'https://localhost:7129/api/usuarios';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUsuariosId(id:number){
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  actualizarUsuario(
            id: number, 
            data: Partial<{ 
                            email: string | null; 
                            password: string | null; 
                            empresaId: string | null; 
                          }>
                        ){
    return this.http.put(`${this.apiUrl}/${id}`,data);
  }
  crearUsuario(data:any){
    return this.http.post(this.apiUrl, data);
  }
}
