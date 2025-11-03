import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { LandingPageService } from '../../../services/landing-page.service';
import { AppointmentsService, Appointment, ProjectType } from '../../../services/appointments.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePickerModule, ToastModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactoComponent implements OnInit {
  showOtroInput = false;
  logoUrl: string = '';
  otroProyecto: string = '';
  appointment: Appointment = {
    name: '',
    email: '',
    phone: '',
    date: new Date(),
    time: '',
    message: '',
    projectType: 'Cocina',
    address: {
      street: '',
      number: '',
      zipCode: '',
      neighborhood: ''
    }
  };

  private landingPageService = inject(LandingPageService);
  private appointmentsService = inject(AppointmentsService);
  private messageService = inject(MessageService);

  ngOnInit() {
    this.loadLogo();
  }

  private loadLogo() {
    this.landingPageService.getLandingPageContent().subscribe({
      next: (data) => {
        this.logoUrl = data.content.hero.logo;
      },
      error: (error) => {
        console.error('Error loading logo:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar el logo'
        });
      }
    });
  }

  onTipoProyectoChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.showOtroInput = target.value === 'Otro';
    if (!this.showOtroInput) {
      this.appointment.projectType = target.value as ProjectType;
      this.otroProyecto = '';
    }
  }

  onOtroProyectoChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.appointment.projectType = target.value as ProjectType;
  }

  onDateChange(date: Date) {
    this.appointment.date = date;
    this.appointment.time = date.toLocaleTimeString();
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.showOtroInput && this.otroProyecto) {
      this.appointment.projectType = this.otroProyecto as ProjectType;
    }

    this.appointmentsService.create(this.appointment).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Tu cita ha sido agendada correctamente'
        });
        // Reset form
        this.appointment = {
          name: '',
          email: '',
          phone: '',
          date: new Date(),
          time: '',
          message: '',
          projectType: 'Cocina',
          address: {
            street: '',
            number: '',
            zipCode: '',
            neighborhood: ''
          }
        };
        this.otroProyecto = '';
        this.showOtroInput = false;
      },
      error: (error) => {
        console.error('Error creating appointment:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agendar la cita. Por favor, intenta de nuevo.'
        });
      }
    });
  }
}
