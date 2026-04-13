import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7129/api/LoginAuth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, {
      Email: email,
      Password: password
    }).pipe(
      tap(resp => {
        //GUARDAR TOKEN AQUÍ
        localStorage.setItem('token', resp.token);
      })
    );
  }

  //Obtener token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  //Logout
  logout(): void {
    localStorage.removeItem('token');
  }

  //Saber si está logueado
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
