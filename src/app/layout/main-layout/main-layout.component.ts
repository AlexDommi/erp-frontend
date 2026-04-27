import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterLink,RouterLinkActive  } from '@angular/router';
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
    MatIconModule,
    RouterLinkActive 
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  hasPermission = hasPermission;
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const url = window.location.pathname;

      if (url.includes('/usuarios')) {
        this.openMenu = 'usuarios';
      } else if (url.includes('/clientes')) {
        this.openMenu = 'clientes';
      } /*else if (url.includes('/roles-permisos')) {
        this.openMenu = 'roles-permisos';
      }*/
      
    });
  }
  isCollapsed = false;
  openMenu: string | null = null;

  ngOnInit() {
    const savedMenu = localStorage.getItem('openMenu');
    const savedSidebar = localStorage.getItem('sidebar');

    this.isCollapsed = savedSidebar === 'true';

    const currentUrl = window.location.pathname; // 🔥 FIX REAL

    if (currentUrl.includes('/usuarios')) {
      this.openMenu = 'usuarios';
    } 
    else if (currentUrl.includes('/clientes')) {
      this.openMenu = 'clientes';
    } 
    else {
      this.openMenu = savedMenu ? savedMenu : null;
    }
  }

  toggleMenu(menu: string) {
    if (this.isCollapsed) return;

    this.openMenu = this.openMenu === menu ? null : menu;

    if (this.openMenu) {
      localStorage.setItem('openMenu', this.openMenu);
    } else {
      localStorage.removeItem('openMenu'); // 🔥 mejor
    }
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem('sidebar', this.isCollapsed.toString());

    if (this.isCollapsed) {
      this.openMenu = null;
    }
  }
  logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('openMenu');
  localStorage.removeItem('sidebar');

  this.router.navigate(['/login']);
}
}


