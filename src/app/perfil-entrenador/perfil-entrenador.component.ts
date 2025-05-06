import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StoicQuoteService } from '../services/stoic-quotesService';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EntrenadorService } from '../services/entrenador.service';

interface Entrenador {
  name: string,
  username: string,
  password: string,
  peso: GLfloat,
  altura: number,
  email: string,
  cantAtletas: number,
  fotoURL: string
}

@Component({
  selector: 'app-perfil-entrenador',
  imports: [RouterModule, ReactiveFormsModule],
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
  entrenadorAct: Entrenador = { name: '', password: '', username: '', peso: 0, email: '', altura: 0, cantAtletas: 0, fotoURL: '' }
  quote: string = '';
  author: string = '';
  nombreEntrenador = sessionStorage.getItem('username');
  id = Number(sessionStorage.getItem('id'));
  visible: 'visible' | 'hidden' = 'visible';
  trainerForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(private __stoicQuoteService: StoicQuoteService, private fb: FormBuilder, private __entrenadorService: EntrenadorService) { }

  ngOnInit(): void {
    this.fetchQuote();
    this.getAtletas();
    this.getEntrenador();
    this.trainerForm = this.fb.group({
      name: [''],
      username: [''],
      password: [''],
      peso: [''],
      email: [''],
      altura: [''],
      numAtletas: [{ value: 0, disabled: true }],
      fotoURL:['']
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
    this.__entrenadorService.getClientes(this.id).subscribe({
      next: (response) => {
        console.log("clientes:", response);
        response.forEach((item: any) => {
          this.entrenadorAct.cantAtletas++;
        });
        console.log("cantidad atletas:", this.entrenadorAct.cantAtletas)
      },
      error: (error) => {
        console.log("error al obtener clientes", error);
      }
    })
  }

  getEntrenador() {
    this.__entrenadorService.getEntrenador(this.id).subscribe({
      next: (response) => {
        console.log("response", response);
        this.entrenadorAct.name = response.data.name;
        this.entrenadorAct.username = response.data.username;
        this.entrenadorAct.password = response.data.password;
        this.entrenadorAct.peso = response.data.peso;
        this.entrenadorAct.email = response.data.email;
        this.entrenadorAct.altura = response.data.altura;
        this.entrenadorAct.fotoURL = response.data.fotoURL;
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
      console.log('Imagen seleccionada:', this.selectedFile.name);
      // Puedes mostrarla como preview si quieres
    }
  }

  submitForm(): void {
    if (this.trainerForm.invalid) {
      console.log('Formulario no válido');
      return;
    }

    const formValues = this.trainerForm.value;

    const trainerData = {
      ...formValues,
      foto: this.selectedFile ? this.selectedFile.name : null // o guarda el archivo como tal
    };

    console.log('Datos enviados:', trainerData);

    // Aquí podrías hacer un POST a tu API, por ejemplo:
    // this.miServicio.updateTrainerProfile(trainerData).subscribe(...)
  }


}