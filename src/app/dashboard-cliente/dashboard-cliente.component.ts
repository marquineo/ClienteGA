import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomToastrService } from '../services/custom-toastr.service';
import { DashboardClienteService } from '../services/dashboard-cliente.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CalendarA11y, CalendarDateFormatter, CalendarEvent, CalendarEventTitleFormatter, CalendarModule, CalendarUtils, DateAdapter } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export interface RutinaConEjercicios {
  id: number;
  nombre: string;
  descripcion: string;
  cliente_id: number;
  entrenador_id: number | null;
  duracion_semana: number;
  ejercicios: Ejercicio[];
}

export interface Ejercicio {
  id: number;
  nombre_ejercicio: string;
  dia_semana: string;
  series: number;
  repeticiones: number;
  rpe: number;
  orden: number;
  descanso_segundos: number;
}


interface RegistroProgreso {
  id: number;
  clienteId: number;
  fecha: string;
  peso: number;
  grasaCorporal: number;
  repeticiones: number;
  tiempoEntrenamiento: number;
  creadoEn: string;
}
@Component({
  selector: 'app-dashboard-cliente',
  standalone: true,
  templateUrl: './dashboard-cliente.component.html',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    CalendarModule
  ],
  providers: [CalendarUtils, CalendarA11y, CalendarDateFormatter, CalendarEventTitleFormatter],
  styleUrls: ['./dashboard-cliente.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', [animate('400ms ease-out')]),
      transition('hidden => visible', [animate('400ms ease-in')])
    ])
  ]
})

export class DashboardClienteComponent implements OnInit {
  clienteId: number = 0; // Lo obtendrás del login o sesión
  fechaSeleccionada: string = new Date().toISOString().substring(0, 10);
  entrenamientoDelDia: RutinaConEjercicios[] = [];
  registrosProgreso: RegistroProgreso[] = [];
  calendarEvents: CalendarEvent[] = [];
  viewDate: Date = new Date(); // fecha actual
  locale: string = 'es'; // Establece el idioma a español
  weekStartsOn: number = 1; // 0 = domingo, 1 = lunes


  progresoForm: FormGroup;
  mostrandoFormulario = false;

  constructor(
    private __dashboardService: DashboardClienteService,
    private fb: FormBuilder,
    private toastr: CustomToastrService,
  ) {
    this.progresoForm = this.fb.group({
      fecha: [this.fechaSeleccionada, Validators.required],
      peso: ['', [Validators.required, Validators.min(20), Validators.max(300)]],
      grasa_corporal: ['', [Validators.required, Validators.min(1), Validators.max(70)]]
    });
  }

  ngOnInit(): void {
    this.clienteId = Number(sessionStorage.getItem('id')) || 0;
    this.cargarFechasConEntrenamiento();
    this.cargarEntrenamiento(this.fechaSeleccionada);
    this.cargarRegistrosProgreso();
    console.log('Fecha actual:', this.viewDate); // ¿Muestra "2024-05-21"?
  }

  cargarEntrenamiento(fecha: string) {
    this.__dashboardService.getEntrenamientoPorFecha(this.clienteId, fecha).subscribe({
      next: (data: RutinaConEjercicios[]) => {
        console.log("Entrenamiento para fecha", fecha, data);
        this.entrenamientoDelDia = data;
      },
      error: () => {
        console.warn("No se encontró entrenamiento para la fecha", fecha);
        this.entrenamientoDelDia = [];
      }
    });
  }

  cargarRegistrosProgreso() {
    this.__dashboardService.getRegistrosProgreso(this.clienteId).subscribe({
      next: (data) => {
        this.registrosProgreso = data;
      },
      error: () => {
        this.registrosProgreso = [];
      }
    });
  }

  onFechaSeleccionada(event: any) {
    this.fechaSeleccionada = event.target.value;
    this.cargarEntrenamiento(this.fechaSeleccionada);
  }

  abrirFormulario() {
    this.mostrandoFormulario = true;
    this.progresoForm.reset({
      fecha: this.fechaSeleccionada,
      peso: '',
      grasaCorporal: ''
    });
  }

  cancelarFormulario() {
    this.mostrandoFormulario = false;
  }

  enviarProgreso() {
    if (this.progresoForm.invalid) {
      this.toastr.show('Por favor completa todos los campos correctamente', 'error');
      return;
    }

    const nuevoProgreso = {
      clienteId: this.clienteId,
      fecha: this.progresoForm.value.fecha,
      peso: this.progresoForm.value.peso,
      grasa_corporal: this.progresoForm.value.grasa_corporal,
    };
    console.log("nuevoProgreso", nuevoProgreso);

    this.__dashboardService.guardarProgreso(nuevoProgreso, this.clienteId).subscribe({
      next: (response) => {
        this.toastr.show('Progreso registrado correctamente', 'success');
        this.mostrandoFormulario = false;
        console.log("response", response);
        this.cargarRegistrosProgreso();
      },
      error: (error) => {
        this.toastr.show('Error al registrar progreso', 'error');
        console.log("error", error);
      }
    });
  }

  cargarFechasConEntrenamiento() {
    this.__dashboardService.getFechasConEntrenamiento(this.clienteId).subscribe((fechas: string[]) => {
      this.calendarEvents = fechas.map(fecha => {
        const [year, month, day] = fecha.split('-').map(Number);
        const fechaLocal = new Date(year, month - 1, day); // correcto
        return {
          start: fechaLocal,
          title: 'Entrenamiento',
          allDay: true,
          color: { primary: '#ad2121', secondary: '#FAE3E3' }
        };
      });
    });
  }


  onDayClicked({ day }: { day: { date: Date; events: CalendarEvent[] }, sourceEvent: MouseEvent | KeyboardEvent }): void {
    const fechaStr = this.formatFechaLocal(day.date);
    this.viewDate = day.date;
    this.fechaSeleccionada = fechaStr;
    this.cargarEntrenamiento(fechaStr);
  }

  formatFechaLocal(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  eliminarProgreso(id: number) {
    this.__dashboardService.deleteProgreso(id).subscribe({
      next: (response) => {
        console.log("response", response);
        this.toastr.show("eliminado correctamente", "success");
        this.cargarRegistrosProgreso();
      },
      error: (error) => {
        console.log("error", error);
        this.toastr.show("Error al eliminar progreso", "error");
      }
    })
  }
}
//https://www.nutricionistasydietistas.com/calculadora/porcentaje-grasa-corporal