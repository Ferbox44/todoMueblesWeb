import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SliderInicioComponent } from "../../../components/slider-inicio/slider-inicio.component";
import { ButtonComponent } from '../../../components/shared/button/button.component';
import { ImageCompareModule } from 'primeng/imagecompare';
import { NosotrosButtonComponent } from '../../../components/nosotros-button/nosotros-button.component';
import { GalleriaMarcas } from '../../../components/marcas-gallery.component/marcas-gallery.component';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { LandingPageService, LandingPageSection } from '../../../services/landing-page.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-inicio',
  imports: [
    CommonModule,
    SliderInicioComponent, 
    ButtonComponent, 
    ImageCompareModule, 
    NosotrosButtonComponent,
    GalleriaMarcas,
    ProgressSpinnerModule
  ],
  templateUrl:'./inicio.component.html',
  styleUrl: './inicio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InicioComponent implements OnInit {
  landingPageContent: LandingPageSection | null = null;
  loading = false;

  get firstVideoUrl(): string | undefined {
    return this.landingPageContent?.content?.videos?.[0]?.url;
  }

  get secondVideoUrl(): string | undefined {
    return this.landingPageContent?.content?.videos?.[1]?.url;
  }

  get thirdVideoUrl(): string | undefined {
    return this.landingPageContent?.content?.videos?.[2]?.url;
  }

  get fourthVideoUrl(): string | undefined {
    return this.landingPageContent?.content?.videos?.[3]?.url;
  }

  get beforeImage(): string | undefined {
    return this.landingPageContent?.content?.compareSection?.beforeImage;
  }

  get afterImage(): string | undefined {
    return this.landingPageContent?.content?.compareSection?.afterImage;
  }

  constructor(
    private landingPageService: LandingPageService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadContent();
  }

  loadContent() {
    this.landingPageService.content$.subscribe({
      next: (content) => {
        this.landingPageContent = content;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading content:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load content'
        });
      }
    });

    this.landingPageService.loading$.subscribe(loading => {
      this.loading = loading;
      this.cdr.detectChanges();
    });

    this.landingPageService.getLandingPageContent().subscribe();
  }
}
