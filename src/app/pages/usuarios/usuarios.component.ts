import { UsuariosService } from './../../services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    RouterLink,
    MatTableModule,
    MatButtonModule,],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit{
  displayedColumns: string[] = ['id', 'email', 'acciones'];
  usuarios: any[] = [];
  constructor(private UsuariosService: UsuariosService){}
  ngOnInit(){
    this.UsuariosService.getUsuarios().subscribe({
      next:(data)=>{
        console.log('USUARIOS',data);
        this.usuarios = data;
      },
      error:(err) => {
        console.error(err);
      }
    });
  }

baja(id: number) {
  console.log('Dar de baja usuario:', id);

  // aquí después llamas a tu API
}
eliminar(id: number) {
  console.log('Eliminar usuario:', id);
}
}
