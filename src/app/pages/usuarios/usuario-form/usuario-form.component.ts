import { Component, OnInit,ChangeDetectionStrategy, signal } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {merge} from 'rxjs';
import {MatDividerModule} from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { UsuariosService } from './../../../services/usuarios.service';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-usuario-form',
  standalone:true,
  imports: [
            CommonModule,
            MatDividerModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatIconModule,
            FormsModule,
            ReactiveFormsModule,
            MatCardModule,
            MatTabsModule
          ],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})

export class UsuarioFormComponent implements OnInit {
  errorMessage = signal('');
  hide = signal(true);
  id: number | null = null;
  // 🔹 ROLES
  roles: any[] = [];
  rolesUsuario: number[] = [];

  // 🔹 PERMISOS
  permisosDisponibles: any[] = [];
  permisosSeleccionados: number[] = [];
  permisosUsuario: number[] = [];
  permisosAgrupados: { [key: string]: any[] } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuariosService: UsuariosService
  ){
    const emailCtrl = this.form.get('email');
    merge(emailCtrl!.statusChanges, emailCtrl!.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  
  clickEvent(event: MouseEvent){
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  updateErrorMessage() {
    const emailCtrl = this.form.get('email');

    if (emailCtrl?.hasError('required')) {
      this.errorMessage.set('Debes ingresar un email');
    } else if (emailCtrl?.hasError('email')) {
      this.errorMessage.set('Email inválido');
    } else {
      this.errorMessage.set('');
    }
  }
  
  form = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl(''),
    empresaId: new FormControl('',Validators.required)
  })

  ngOnInit(){
    const idParam = this.route.snapshot.params['id'];
    this.id = idParam ? Number(idParam) : null;
    this.cargarRoles();

    if (this.id) {
      this.CargarUsuario(this.id);
      console.log('Modo Edicion',this.id)
      this.usuariosService.getRolesById(this.id).subscribe((resp: any[]) => {
      this.rolesUsuario = resp.map(r => r.rolId);
  });
    }
  }
  CargarUsuario(id:number){
    this.usuariosService.getUsuariosId(id).subscribe((resp:any)=>{
      
      this.form.patchValue(resp);
      this.permisosUsuario = resp.permisos || [];
    });
  };

  cancelar(){
    this.router.navigate(['/usuarios']);
  }

  onTabChange(index: number) {
    if (index === 2) {
      this.cargarPermisos();
    }
  }

  cargarRoles() {
  this.usuariosService.getRoles().subscribe((resp:any)=>{
    this.roles = resp;
  });
}
  
  cargarPermisos() {

    if (this.rolesUsuario.length === 0) {
      this.permisosDisponibles = [];
      return;
    }

    this.usuariosService
      .getPermisosPorRoles(this.rolesUsuario)
      .subscribe((resp:any)=>{

        this.permisosDisponibles = resp;

        // 🔥 marcar los del usuario
        this.permisosSeleccionados = [...this.permisosUsuario];

        this.agruparPermisos();
      });
  }

  agruparPermisos() {
    this.permisosAgrupados = {};

    this.permisosDisponibles.forEach((p:any) => {
      if (!this.permisosAgrupados[p.modulo]) {
        this.permisosAgrupados[p.modulo] = [];
      }
      this.permisosAgrupados[p.modulo].push(p);
    });
  }

  toggleRol(id: number) {
    if (this.rolesUsuario.includes(id)) {
      this.rolesUsuario = this.rolesUsuario.filter(x => x !== id);
    } else {
      this.rolesUsuario.push(id);
    }

    // 🔥 resetear permisos
    this.permisosSeleccionados = [];
    this.permisosDisponibles = [];
  }

  togglePermiso(id: number) {
    if (this.permisosSeleccionados.includes(id)) {
      this.permisosSeleccionados =
        this.permisosSeleccionados.filter(x => x !== id);
    } else {
      this.permisosSeleccionados.push(id);
    }
  }

  isChecked(id: number) {
    return this.permisosSeleccionados.includes(id);
  }
  guardar() {

    if(this.form.invalid)
      return;

    const data = {
                  ...this.form.value,
                  roles: this.rolesUsuario,
                  permisos: this.permisosSeleccionados
                }

    if(this.id){
      this.usuariosService.actualizarUsuario(this.id,data).subscribe(() => {
        this.router.navigate(['/usuarios']);
      });
    }
    else{
      this.usuariosService.crearUsuario(data).subscribe(()=>{
        this.router.navigate(['/usuarios']);
      });
    }
}
}
