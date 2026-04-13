import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';

//funcionalidades
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule} from '@angular/material/icon';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  //Standalone, este componente funciona sin modulo
  standalone: true,
  imports: [
    //funcionalidades - inputs, tarjetas, botones iconos
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(
      private authService:AuthService,
      private router: Router
    ){}

  login() {
    this.authService.login(this.email,this.password)
    .subscribe({
      next: (res) => {
        console.log('RESPUESTA LOGIN:', res);

        const token = res.token?.token; // 🔥 AQUÍ ESTÁ LA CLAVE
        const permisos = res.token?.permisos;

        console.log('TOKEN REAL:', token);

        localStorage.setItem('token', token);
        localStorage.setItem('permisos', JSON.stringify(permisos));

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
      console.log('ERROR COMPLETO:', err);
      console.log('ERRORES BACKEND:', err.error.errors);
    }
    });
  }
}
