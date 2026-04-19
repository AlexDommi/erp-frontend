import { AuthService } from './../../services/auth.service';
import { Component, signal } from '@angular/core';
import { FormsModule} from '@angular/forms';

//funcionalidades
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule} from '@angular/material/icon';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    MatIconModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  errorLogin = signal('');
  
  constructor(
      private authService:AuthService,
      private router: Router
    ){}

  login() {
    this.errorLogin.set('');
    this.authService.login(this.email,this.password)
    .subscribe({
      next: (res) => {
        console.log('RESPUESTA LOGIN:', res);

        const token = res.token?.token;
        const permisos = res.token?.permisos;

        console.log('TOKEN REAL:', token);

        localStorage.setItem('token', token);
        localStorage.setItem('permisos', JSON.stringify(permisos));

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log('ERROR:', err);

        if (err.status === 401) {
          this.errorLogin.set('Usuario o contraseña inválidos');
        } else {
          this.errorLogin.set('Error en el servidor');
        }
    }
    });
  }
}
