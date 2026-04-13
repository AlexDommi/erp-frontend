import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { hasPermission } from '../../utils/permissions';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-main-layout',
  standalone:true,
  imports:[
    NgIf,
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  hasPermission = hasPermission;
  constructor(private router: Router){}

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
