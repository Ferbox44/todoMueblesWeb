import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceDetailsService, ServiceDetail, Project, ProjectImage } from '../../../services/service-details.service';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { GalleriaMarcas } from '../../../components/marcas-gallery.component/marcas-gallery.component';
import { ButtonComponent } from '../../../components/shared/button/button.component';

interface GalleriaImage {
    itemImageSrc: string;
    thumbnailImageSrc: string;
    alt: string;
}

@Component({
    selector: 'app-producto',
    templateUrl: './producto.component.html',
    styleUrls: ['./producto.component.scss'],
    standalone: true,
    imports: [CommonModule, GalleriaModule, ButtonModule, GalleriaMarcas, ButtonComponent]
})
export class ProductoComponent implements OnInit {
    serviceDetail: ServiceDetail | null = null;
    loading = true;
    error: string | null = null;
    serviceId: string | null = null;

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    private route = inject(ActivatedRoute);
    private serviceDetailsService = inject(ServiceDetailsService);

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.serviceId = params['id'];
            if (this.serviceId) {
                this.loadServiceDetail(this.serviceId);
            } else {
                this.error = 'No service ID provided';
                this.loading = false;
            }
        });
    }

    private loadServiceDetail(serviceId: string): void {
        this.loading = true;
        this.error = null;

        this.serviceDetailsService.getServiceDetail(serviceId).subscribe({
            next: (data: ServiceDetail) => {
                this.serviceDetail = data;
                this.loading = false;
            },
            error: (err: Error) => {
                this.error = err.message;
                this.loading = false;
            }
        });
    }

    getMaterialImages(project: Project): GalleriaImage[] {
        return project.images
            .filter((img: ProjectImage) => img.type === 'material')
            .map((img: ProjectImage) => ({
                itemImageSrc: img.url,
                thumbnailImageSrc: img.url,
                alt: img.title || 'Material image'
            }));
    }

    getAccessoryImages(project: Project): GalleriaImage[] {
        return project.images
            .filter((img: ProjectImage) => img.type === 'accessory')
            .map((img: ProjectImage) => ({
                itemImageSrc: img.url,
                thumbnailImageSrc: img.url,
                alt: img.title || 'Accessory image'
            }));
    }
}