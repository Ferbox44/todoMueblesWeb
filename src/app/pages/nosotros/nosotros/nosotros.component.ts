import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { PhotoService, Section } from '../../../services/producto.service';
import { ButtonComponent } from "../../../components/shared/button/button.component";
import { GalleriaMarcas } from '../../../components/marcas-gallery.component/marcas-gallery.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nosotros',
  imports: [GalleriaModule, ButtonComponent, GalleriaMarcas, CommonModule],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css',
  standalone: true,
  providers: [PhotoService]
})
export class NosotrosComponent implements OnInit {
    section: Section | null = null;
    loading = true;
    error: string | null = null;

    responsiveOptions = [
        {
            breakpoint: '1300px',
            numVisible: 4
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

    private photoService = inject(PhotoService);
    private route = inject(ActivatedRoute);

    ngOnInit() {
        this.route.params.subscribe(params => {
            const sectionId = 'nosotros';
            this.loadSection(sectionId);
        });
    }

    private loadSection(sectionId: string) {
        this.loading = true;
        this.error = null;
        
        this.photoService.getSection(sectionId)
            .then(section => {
                this.section = section;
                this.loading = false;
            })
            .catch(error => {
                this.error = 'Error al cargar la sección';
                this.loading = false;
                console.error('Error loading section:', error);
            });
    }
}