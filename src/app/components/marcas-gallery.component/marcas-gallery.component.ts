import { Component, OnInit } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { LandingPageService } from '../../services/landing-page.service';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-galleria-marcas',
    templateUrl: './marcas-gallery.component.html',
    styleUrls: ['./marcas-gallery.component.css'],
    standalone: true,
    imports: [GalleriaModule, CommonModule, ProgressSpinnerModule],
})
export class GalleriaMarcas implements OnInit {
    images: any[] = [];
    loading = true;

    responsiveOptions: any[] = [
        {
            breakpoint: '1300px',
            numVisible: 4
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

    constructor(private landingPageService: LandingPageService) {}

    ngOnInit() {
        this.loadBrands();
    }

    private loadBrands() {
        this.landingPageService.getLandingPageContent().subscribe({
            next: (data) => {
                this.images = data.content.brandsCarousel.map(brand => ({
                    itemImageSrc: brand.image,
                    thumbnailImageSrc: brand.image,
                    alt: brand.name,
                    title: brand.name
                }));
                this.loading = false;
            },
            error: (error) => {
                console.error('Error loading brands:', error);
                this.loading = false;
            }
        });
    }
}
