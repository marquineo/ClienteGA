
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RutinaEntrenamientoService } from '../rutina-entrenamiento-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-rutina-entrenamiento',
  imports: [RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './rutina-entrenamiento.component.html',
  styleUrl: './rutina-entrenamiento.component.css'
})
export class RutinaEntrenamientoComponent implements OnInit {

  clienteId: number = 0;
  rutina: any[] = [];
  rutinaForm!: FormGroup;
  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private rutinaService: RutinaEntrenamientoService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Obtener el ID del cliente desde la URL
    this.clienteId = +this.activatedRoute.snapshot.paramMap.get('clienteId')!;
    this.getRutina();
    this.createForm();
  }

  // Crear el formulario de edición de rutina
  createForm(): void {
    this.rutinaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      duracion_semana: [1, [Validators.required, Validators.min(1)]],
      ejercicios: this.fb.array([]) // Este es un formulario anidado para los ejercicios
    });
  }

  // Obtener la rutina del cliente desde la API
  getRutina(): void {
    this.rutinaService.getRutinaPorCliente(this.clienteId).subscribe(
      (data) => {
        this.rutina = data.rutina; // Asumimos que la respuesta contiene la rutina del cliente
        this.fillRutinaForm();
      },
      (error) => {
        console.error('Error al obtener la rutina:', error);
      }
    );
  }

  // Rellenar el formulario con los datos de la rutina obtenida
  fillRutinaForm(): void {
    const ejercicioFormArray = this.rutina.map(ejercicio => this.fb.group({
      nombre: [ejercicio.nombre, Validators.required],
      series: [ejercicio.series, [Validators.required, Validators.min(1)]],
      repeticiones: [ejercicio.repeticiones, [Validators.required, Validators.min(1)]],
      descanso: [ejercicio.descanso, [Validators.required, Validators.min(1)]]
    }));
    
    this.rutinaForm.setControl('ejercicios', this.fb.array(ejercicioFormArray));
  }

  // Añadir ejercicio al formulario
  agregarEjercicio(): void {
    const ejercicios = this.rutinaForm.get('ejercicios') as any;
    ejercicios.push(this.fb.group({
      nombre: ['', Validators.required],
      series: [1, [Validators.required, Validators.min(1)]],
      repeticiones: [1, [Validators.required, Validators.min(1)]],
      descanso: [60, [Validators.required, Validators.min(1)]]
    }));
  }

  // Eliminar ejercicio del formulario
  eliminarEjercicio(index: number): void {
    const ejercicios = this.rutinaForm.get('ejercicios') as any;
    ejercicios.removeAt(index);
  }

  // Guardar los cambios en la rutina
  guardarRutina(): void {
    if (this.rutinaForm.invalid) {
      console.log('Formulario inválido');
      return;
    }

    this.loading = true;
    const rutina = this.rutinaForm.value;
    
    this.rutinaService.actualizarRutina(this.clienteId, rutina).subscribe(
      (response) => {
        console.log('Rutina actualizada:', response);
        this.loading = false;
      },
      (error) => {
        console.error('Error al actualizar rutina:', error);
        this.loading = false;
      }
    );
  }
}