import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomToastrService } from '../services/custom-toastr.service';
import { DashboardClienteService } from '../services/dashboard-cliente.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface Ejercicio {
  nombre: string;
  series: number;
  repeticiones: number;
  descanso: number; // segundos
}

interface EntrenamientoDia {
  fecha: string; // yyyy-mm-dd
  ejercicios: Ejercicio[];
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
  templateUrl: './dashboard-cliente.component.html',
    imports: [CommonModule, FormsModule, RouterModule,ReactiveFormsModule],
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
  entrenamientoDelDia: EntrenamientoDia | null = null;
  registrosProgreso: RegistroProgreso[] = [];

  progresoForm: FormGroup;
  mostrandoFormulario = false;

  constructor(
    private __dashboardService: DashboardClienteService,
    private fb: FormBuilder,
    private toastr: CustomToastrService
  ) {
    this.progresoForm = this.fb.group({
      fecha: [this.fechaSeleccionada, Validators.required],
      peso: ['', [Validators.required, Validators.min(20), Validators.max(300)]],
      grasaCorporal: ['', [Validators.required, Validators.min(1), Validators.max(70)]]
    });
  }

  ngOnInit(): void {
    // TODO: obtener clienteId del token o sesión
    this.clienteId = Number(sessionStorage.getItem('id')) || 0;

    this.cargarEntrenamiento(this.fechaSeleccionada);
    this.cargarRegistrosProgreso();
  }

  cargarEntrenamiento(fecha: string) {
    this.__dashboardService.getEntrenamientoPorFecha(this.clienteId, fecha).subscribe({
      next: (data: EntrenamientoDia | null) => {
        this.entrenamientoDelDia = data;
      },
      error: () => {
        this.entrenamientoDelDia = null;
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
      grasaCorporal: this.progresoForm.value.grasaCorporal,
    };

    this.__dashboardService.guardarProgreso(nuevoProgreso).subscribe({
      next: () => {
        this.toastr.show('Progreso registrado correctamente', 'success');
        this.mostrandoFormulario = false;
        this.cargarRegistrosProgreso();
      },
      error: () => {
        this.toastr.show('Error al registrar progreso', 'error');
      }
    });
  }
}
