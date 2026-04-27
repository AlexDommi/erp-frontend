import { Component,OnInit } from '@angular/core';
import { UpperCasePipe,NgFor,CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles-permisos',
  imports: [UpperCasePipe,NgFor,CommonModule],
  templateUrl: './roles-permisos.component.html',
  styleUrl: './roles-permisos.component.scss'
})

export class RolesPermisosComponent implements OnInit{
  
  rolSeleccionado = 1;

  permisos = [
    { id: 1, modulo: 'usuarios', accion: 'ver' },
    { id: 2, modulo: 'usuarios', accion: 'crear' },
    { id: 3, modulo: 'usuarios', accion: 'editar' },
    { id: 4, modulo: 'usuarios', accion: 'eliminar' },

    { id: 5, modulo: 'inventario', accion: 'ver' },
    { id: 6, modulo: 'inventario', accion: 'entrada' },
    { id: 7, modulo: 'inventario', accion: 'salida' },
    { id: 8, modulo: 'inventario', accion: 'ajustar' }
  ];

  permisosSeleccionados: number[] = [];

  permisosAgrupados: Record<string, any[]> = {};
  //permisosAgrupados: any = {};

  ngOnInit(){
    this.agruparPermisos();
  }

  agruparPermisos() {
    
    this.permisosAgrupados = {};

    this.permisos.forEach(p => {
      if (!this.permisosAgrupados[p.modulo]) {
        this.permisosAgrupados[p.modulo] = [];
      }
      this.permisosAgrupados[p.modulo].push(p);
    });
  }

    togglePermiso(id: number) {
    if (this.permisosSeleccionados.includes(id)) {
      this.permisosSeleccionados =
        this.permisosSeleccionados.filter(x => x !== id);
    } else {
      this.permisosSeleccionados.push(id);
    }
  }

  isChecked(id: number): boolean {
    return this.permisosSeleccionados.includes(id);
  }

  toggleModulo(modulo: string) {
    const permisos = this.permisosAgrupados[modulo];

    const todosSeleccionados = permisos.every((p: any) =>
      this.permisosSeleccionados.includes(p.id)
    );

    if (todosSeleccionados) {
      // desmarcar todos
      this.permisosSeleccionados = this.permisosSeleccionados.filter(
        id => !permisos.some((p: any) => p.id === id)
      );
    } else {
      // marcar todos
      permisos.forEach((p: any) => {
        if (!this.permisosSeleccionados.includes(p.id)) {
          this.permisosSeleccionados.push(p.id);
        }
      });
    }
  }

  guardar() {
    const payload = {
      rolId: this.rolSeleccionado,
      permisosIds: this.permisosSeleccionados
    };

    console.log('GUARDAR ->', payload);
    // aquí luego va tu API
  }
}