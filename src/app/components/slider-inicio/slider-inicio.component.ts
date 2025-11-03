import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LandingPageService, ServiceCard } from '../../services/landing-page.service';
import { ServiceDetailsService } from '../../services/service-details.service';

@Component({
  selector: 'app-slider-inicio',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    ProgressSpinnerModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './slider-inicio.component.html',
  styleUrls: ['./slider-inicio.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderInicioComponent implements OnInit {

  slides: ServiceCard[] = [];
  
  loading = true;

  constructor(
    private landingPageService: LandingPageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadServices();
  }

  private loadServices() {
    this.landingPageService.getLandingPageContent().subscribe({
      next: (content) => {
        this.slides = content.content.servicesCarousel;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading services:', error);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  responsiveOptions: any[] = [
    {
      breakpoint: '1920px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  
}

