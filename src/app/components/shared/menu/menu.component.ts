import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { LandingPageService } from '../../../services/landing-page.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive, Menubar, CommonModule],
  templateUrl:'./menu.component.html',
  styleUrl: './menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit { 
  items: MenuItem[] = [];
  loading = true;

  constructor(
    private landingPageService: LandingPageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadMenuItems();
  }

  private loadMenuItems() {
    // Set default menu items
    const defaultItems: MenuItem[] = [
      {
        label: 'Inicio',
        routerLink: '/',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Nosotros',
        routerLink: '/nosotros',
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Contacto',
        routerLink: '/contacto'
      }
    ];

    this.landingPageService.getLandingPageContent().subscribe({
      next: (content) => {
        const services = content.content.servicesCarousel || [];
        
        this.items = [
          {
            label: 'Inicio',
            routerLink: '/',
            routerLinkActiveOptions: { exact: true }
          },
          {
            label: 'Servicios',
            items: services.map(service => ({
              label: service.title,
              icon: 'pi pi-crown',
              routerLink: ['/servicios/' + service.id]
            }))
          },
          {
            label: 'Nosotros',
            routerLink: '/nosotros'
          },
          {
            label: 'Contacto',
            routerLink: '/contacto'
          }
        ];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading menu items:', error);
        this.items = defaultItems;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}