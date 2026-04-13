import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsxOpeningElement } from 'typescript';

@Component({
  selector: 'app-usuario-form',
  standalone:true,
  imports: [],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent implements OnInit {
  id: number | null = null;
  constructor(private route:ActivatedRoute){}

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      console.log('Modo Edicion',this.id)
    }
  }
}
