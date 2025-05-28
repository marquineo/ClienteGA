import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RutinaEntrenamientoService } from '../rutina-entrenamiento-service.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
import { CustomToastrService } from '../../services/custom-toastr.service';



@Component({
  selector: 'app-rutina-entrenamiento',
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule],

  templateUrl: './rutina-entrenamiento.component.html',
  styleUrls: ['./rutina-entrenamiento.component.css']
})
export class RutinaEntrenamientoComponent implements OnInit {
  clienteId: number = 0;
  rutinas: any[] = [];
  rutinasOriginal: any[] = [];
  rutinasFormArray!: FormArray;
  loading = false;
  rutinaIndexParaEliminar: number | null = null;



  constructor(
    private activatedRoute: ActivatedRoute,
    private rutinaService: RutinaEntrenamientoService,
    private fb: FormBuilder,
    private _route: Router,
    private toatr: CustomToastrService
  ) { }

  ngOnInit(): void {
    this.clienteId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.rutinasFormArray = this.fb.array([]);
    this.getRutinas();
    setTimeout(() => {
      const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.forEach((el) => {
        new bootstrap.Tooltip(el);
      });
    }, 0);
  }

  // Obtener todas las rutinas del cliente
  getRutinas(): void {
    this.rutinaService.getRutinaPorCliente(this.clienteId).subscribe(
      (data) => {
        this.rutinas = Array.isArray(data) ? data : [data];
        this.rutinasOriginal = JSON.parse(JSON.stringify(this.rutinas)); // clon profundo
        this.fillRutinasForm();
      },
      (error) => {
        console.error('Error al obtener las rutinas:', error);
      }
    );
  }

  // Rellenar el FormArray principal con cada rutina
  fillRutinasForm(): void {
    this.rutinas.forEach(rutina => {
      const rutinaForm = this.fb.group({
        nombre: [rutina.nombre, Validators.required],
        descripcion: [rutina.descripcion, Validators.required],
        duracion_semana: [rutina.duracion_semana, [Validators.required, Validators.min(1)]],
        ejercicios: this.fb.array([])
      });

      const ejerciciosFormArray = rutinaForm.get('ejercicios') as FormArray;
      rutina.ejercicios.forEach((ejercicio: any) => {
        ejerciciosFormArray.push(this.fb.group({
          nombre_ejercicio: [ejercicio.nombre_ejercicio, Validators.required],
          series: [ejercicio.series, [Validators.required, Validators.min(1)]],
          repeticiones: [ejercicio.repeticiones, [Validators.required, Validators.min(1)]],
          descanso_segundos: [ejercicio.descanso_segundos, [Validators.required, Validators.min(1)]],
          dia_semana: [ejercicio.dia_semana || 'Lunes', Validators.required],
          orden: [ejercicio.orden || 1, Validators.required],
          rpe: [ejercicio.rpe || 6, [Validators.required, Validators.min(1), Validators.max(10)]]
        }));
      });

      this.rutinasFormArray.push(rutinaForm);
    });
  }

  // Obtener controles del array de ejercicios para una rutina específica
  getEjerciciosControls(rutinaIndex: number) {
    return (this.rutinasFormArray.at(rutinaIndex).get('ejercicios') as FormArray).controls;
  }

  // Agregar nuevo ejercicio a una rutina específica
  agregarEjercicio(rutinaIndex: number): void {
    const ejercicios = this.rutinasFormArray.at(rutinaIndex).get('ejercicios') as FormArray;
    ejercicios.push(this.fb.group({
      nombre_ejercicio: ['', Validators.required],
      series: [1, [Validators.required, Validators.min(1)]],
      repeticiones: [1, [Validators.required, Validators.min(1)]],
      descanso_segundos: [60, [Validators.required, Validators.min(1)]],
      dia_semana: ['Lunes', Validators.required],
      orden: [1, Validators.required],
      rpe: [6, [Validators.required, Validators.min(1), Validators.max(10)]]
    }));
  }

  agregarRutina(): void {
    // Añadir rutina vacía al array de datos para sincronizar (puedes ajustar si usas ids)
    this.rutinas.push({
      id: null,            // id null porque es nueva
      nombre: '',
      descripcion: '',
      duracion_semana: 1,
      ejercicios: []
    });

    // Añadir rutina vacía al FormArray
    this.rutinasFormArray.push(this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      duracion_semana: [1, [Validators.required, Validators.min(1)]],
      ejercicios: this.fb.array([])
    }));
  }

  eliminarRutina(index: number) {
    // Confirmar antes de eliminar, opcional
    if (confirm('¿Seguro que quieres eliminar esta rutina?')) {//TODO modal de confirmacion
      this.rutinas.splice(index, 1);
    }
  }
  abrirModalEliminar(index: number) {
    this.rutinaIndexParaEliminar = index;
    // Abrir modal Bootstrap manualmente
    const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal')!);
    modal.show();
  }
  confirmarEliminar() {
    if (this.rutinaIndexParaEliminar !== null) {
      this.rutinas.splice(this.rutinaIndexParaEliminar, 1);
      this.rutinaIndexParaEliminar = null;

      this.eliminarRutinasBackend();
    }
    const modalEl = document.getElementById('confirmDeleteModal');
    const modal = bootstrap.Modal.getInstance(modalEl!);
    modal?.hide();
  }

  // Eliminar ejercicio de una rutina
  eliminarEjercicio(rutinaIndex: number, ejercicioIndex: number): void {
    const ejercicios = this.rutinasFormArray.at(rutinaIndex).get('ejercicios') as FormArray;
    ejercicios.removeAt(ejercicioIndex);
  }

  // Guardar una rutina individualmente
  guardarRutina(rutinaIndex: number): boolean {
    let checker = true;
    const rutinaForm = this.rutinasFormArray.at(rutinaIndex);
    if (rutinaForm.invalid) {
      //console.log('Formulario inválido para rutina', rutinaIndex);
      return false;
    }

    this.loading = true;
    const rutinaData = rutinaForm.value;
    const rutinaId = this.rutinas[rutinaIndex].id;
    //console.log(rutinaData);

    this.rutinaService.actualizarRutina(this.clienteId, rutinaData).subscribe(
      (response) => {
        //console.log('Rutina actualizada:', response);
        this.loading = false;
        checker = true;
      },
      (error) => {
        console.error('Error al actualizar rutina:', error);
        this.loading = false;
        checker = false;
      }
    );
    return checker
  }
  getFormGroup(index: number): FormGroup {
    return this.rutinasFormArray.at(index) as FormGroup;
  }

  guardarTodasRutinas() {
    let checker = true;
    for (let i = 0; i < this.rutinas.length; i++) {
      //console.log(i);
      checker = this.guardarRutina(i);
      if (!checker) return;
    }
    if (checker) {
      this.toatr.show("Rutinas guardadas satisfactoriamente", "success");
    } else {
      this.toatr.show("Error al porcesar las rutinas", "error");
    }
  }

  detectarRutinasEliminadas(): any[] {
    const nombresOriginales = this.rutinasOriginal.map(r => r.nombre);
    const nombresActuales = this.rutinas.map(r => r.nombre);

    return nombresOriginales.filter(nombre => !nombresActuales.includes(nombre));
  }

  eliminarRutinasBackend() {
    const nombresAEliminar = this.detectarRutinasEliminadas();
    if (nombresAEliminar.length === 0) return;

    this.rutinaService.eliminarRutinas(nombresAEliminar, this.clienteId).subscribe({
      next: () => {
        //console.log('Rutinas eliminadas correctamente');
        // Actualizar rutinasOriginal tras la eliminación
        this.rutinasOriginal = JSON.parse(JSON.stringify(this.rutinas));
      },
      error: (err) => {
        console.error('Error al eliminar rutinas:', err);
      }
    });
  }

  goToDash() {
    this._route.navigate(['/dashboard-entrenador']);
  }



}
