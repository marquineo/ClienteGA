import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StoicQuoteService } from '../services/stoic-quotesService';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntrenadorService } from '../services/entrenador.service';
import { PerfilEntrenadorService } from '../services/perfil-entrenador.service';
import { subscribeOn } from 'rxjs';
import { CustomToastrService } from '../services/custom-toastr.service';

interface Entrenador {
  name: string,
  password: string,
  email: string,
  cantAtletas: number,
  fotoURL: string,
  creado_en: string,
  especialidad: string,
  experiencia: number
}

@Component({
  selector: 'app-perfil-entrenador',
  imports: [RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './perfil-entrenador.component.html',
  styleUrl: './perfil-entrenador.component.css',
  animations: [
    trigger('fadeInOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', [animate('400ms ease-out')]),
      transition('hidden => visible', [animate('400ms ease-in')])
    ])
  ]
})
export class PerfilEntrenadorComponent {
  entrenadorAct: Entrenador = { name: '', password: '', email: '', cantAtletas: 0, fotoURL: '', creado_en: "", especialidad: "", experiencia: 0 }
  quote: string = '';
  author: string = '';
  nombreEntrenador = sessionStorage.getItem('username');
  id = Number(sessionStorage.getItem('id'));
  visible: 'visible' | 'hidden' = 'visible';
  trainerForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(private __stoicQuoteService: StoicQuoteService,
    private fb: FormBuilder,
    private __entrenadorService: EntrenadorService,
    private __perfilEntrenadorService: PerfilEntrenadorService,
    private route: Router,
    private toatr: CustomToastrService
  ) { }

  ngOnInit(): void {
    this.fetchQuote();
    this.getAtletas();
    this.getEntrenador();
    this.trainerForm = this.fb.group({
      name: [''],
      username: [''],
      password: [''],
      creado_en: [''],
      email: [''],
      especialidad: [''],
      experiencia: [''],
      numAtletas: [{ value: 0, disabled: true }],
      fotoURL: ['']
    });
  }

  fetchQuote(): void {
    this.visible = 'hidden';

    setTimeout(() => {
      this.__stoicQuoteService.getRandomQuote().subscribe((data) => {
        this.quote = data.text;
        this.author = data.author;
        this.visible = 'visible';
      });
    }, 400); // esperar que termine el fade-out antes de cambiar la frase
  }

  getAtletas() {
    let cantAtletas = 0;
    this.__entrenadorService.getClientes(this.id).subscribe({
      next: (response) => {
        console.log("clientes:", response);
        response.forEach((item: any) => {
          cantAtletas++;
        });
        this.trainerForm.patchValue({
          numAtletas: cantAtletas
        });
        console.log("cantidad atletas:", cantAtletas)
      },
      error: (error) => {
        console.log("error al obtener clientes", error);
      }
    })
  }

  getEntrenador() {
    console.log("this.id", this.id)
    this.__entrenadorService.getEntrenador(this.id).subscribe({
      next: (response) => {
        console.log("response", response);
        this.trainerForm.patchValue({
          name: response.nombre,
          email: response.email,
          experiencia: response.experiencia,
          especialidad: response.especialidad,
          password: response.contrasenya,
          creado_en: response.creado_en,
        });
        this.entrenadorAct.fotoURL = response.fotoURL;
        console.log("this.entrenadorAct.fotoURL", this.entrenadorAct.fotoURL);

      },
      error: (error) => {
        console.log("error:", error);
      }
    })
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Mostrar la imagen seleccionada antes de enviar
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.entrenadorAct.fotoURL = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


  submitForm(): void {
    if (this.trainerForm.invalid) {
      console.log('Formulario no válido');
      return;
    }

    const formValues = this.trainerForm.value;

    const formData = new FormData();
    formData.append('nombre', formValues.name);
    formData.append('email', formValues.email);
    formData.append('contrasenya', formValues.password);
    formData.append('especialidad', formValues.especialidad);
    formData.append('experiencia', String(formValues.experiencia));

    if (this.selectedFile) {
      formData.append('foto', this.selectedFile); // ✅ archivo real, no el nombre
    }

    console.log("Datos enviados:", formData);

    this.__perfilEntrenadorService.updateEntrenador(this.id, formData).subscribe({
      next: (response) => {
        console.log("response", response);
        this.toatr.show("Perfil actualizado satisfactoriamente", "success");
        this.route.navigate(["/dashboard-entrenador"]);
      },
      error: (error) => {
        console.log("error", error);
        this.toatr.show("Error al actualizar perfil de entrenador", "error");
      }
    });
  }

  logoClick() {
    this.route.navigate(["/dashboard-entrenador"]);
  }
}