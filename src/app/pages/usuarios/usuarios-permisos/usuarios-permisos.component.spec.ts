import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosPermisosComponent } from './usuarios-permisos.component';

describe('UsuariosPermisosComponent', () => {
  let component: UsuariosPermisosComponent;
  let fixture: ComponentFixture<UsuariosPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosPermisosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
