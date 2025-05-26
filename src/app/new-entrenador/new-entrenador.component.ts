import { Component } from '@angular/core';
import { StoicQuoteService } from '../services/stoic-quotesService';
import { CustomToastrService } from '../services/custom-toastr.service';
import { EntrenadorService } from '../services/entrenador.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';


interface Entrenador {
  id: number,
  usuario_id: number,
  nombre: string,
  especialidad: string,
  experiencia: number,
  //usuarios
  ishabilitado: boolean,
  email: string,
  password: ""
}

@Component({
  selector: 'app-new-entrenador',
  imports: [FormsModule, RouterModule],
  templateUrl: './new-entrenador.component.html',
  styleUrl: './new-entrenador.component.css'
})

export class NewEntrenadorComponent {

  entrenadorAct: Entrenador = { nombre: '', usuario_id: 0, email: '', especialidad: '', ishabilitado: false, id: 0, experiencia: 0, password: '' }
  quote: string = '';
  author: string = '';
  nombreEntrenador = sessionStorage.getItem('username');
  visible: 'visible' | 'hidden' = 'visible';
  fotoSeleccionada: File | null = null;

  constructor(private __stoicQuoteService: StoicQuoteService, private toastr: CustomToastrService, private __entrenadorService: EntrenadorService, private router: Router) { }

  ngOnInit(): void {
    this.fetchQuote();
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fotoSeleccionada = input.files[0];
    }
  }
  
  submitForm(): void {
    const formData = new FormData();
    formData.append('nombre', this.entrenadorAct.nombre);
    formData.append('contrasenya', this.entrenadorAct.password);
    formData.append('email', this.entrenadorAct.email);
    formData.append('especialidad', String(this.entrenadorAct.especialidad));
    formData.append('experiencia', String(this.entrenadorAct.experiencia));
    if (this.fotoSeleccionada !== null) {
      formData.append('foto', this.fotoSeleccionada);
    }
    console.log("formData", formData);
    this.__entrenadorService.newEntrenador(formData).subscribe({
      next: (response) => {
        console.log("entrenador creado", response);
        this.router.navigate(["/dashboard-administrador"]);
        this.toastr.show('Entrenador creado correctamente', 'success')
      },
      error: (error) => {
        console.log("Error al crear atleta", error.error);

        this.toastr.show('Error al crear Atleta', 'error')
      }
    })
  }

  confirmarEliminacion() {
    if (this.entrenadorAct) {
      console.log("entrando a confirmar eliminacion")
      console.log("entrenadorAct:", this.entrenadorAct);
      this.eliminarAtleta();

      // Cerrar el modal manualmente
      const modalElement = document.getElementById('modalConfirmarEliminacion');
      if (modalElement) {
        const modalBootstrap = bootstrap.Modal.getInstance(modalElement);
        if (modalBootstrap) {  // Asegúrate de que modalBootstrap no sea null
          modalBootstrap.hide();  // Ocultar el modal
        }
      }
    }
  }
  // Método para abrir el modal
  abrirModal() {
    const modalElement = document.getElementById('modalConfirmarEliminacion');
    if (modalElement) {
      const modalBootstrap = new bootstrap.Modal(modalElement);
      modalBootstrap.show(); // Abre el modal
    }
  }

  eliminarAtleta() {
    this.__entrenadorService.eliminarEntrenador(this.entrenadorAct.id)
  }
  logoClick() {
    this.router.navigate(["/dashboard-entrenador"]);
  }
}