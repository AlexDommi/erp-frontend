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
            MatCardModule
          ],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})

export class UsuarioFormComponent implements OnInit {
  errorMessage = signal('');
  hide = signal(true);
  id: number | null = null;


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

    if (this.id) {
      this.CargarUsuario(this.id);
      console.log('Modo Edicion',this.id)
    }
  }
  CargarUsuario(id:number){
    this.usuariosService.getUsuariosId(id).subscribe((resp:any)=>{
      console.log('USUARIOS BY ID',resp);
      this.form.patchValue(resp);
    });
  };

  cancelar(){
    this.router.navigate(['/usuarios']);
  }

  guardar() {
    if(this.form.invalid)
      return;

    const data = this.form.value;

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
