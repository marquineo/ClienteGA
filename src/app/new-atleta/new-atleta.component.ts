import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StoicQuoteService } from '../services/stoic-quotesService';
import { FormsModule } from '@angular/forms';
import { NewAtletaService } from '../services/new-atleta.service';
import { RouterModule } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';
import { CustomToastrService } from '../services/custom-toastr.service';

interface Atleta {
  nombre: string,
  username: string,
  password: string,
  email: string,
  foto: File | null,
  peso: GLfloat,
  altura: GLfloat,
  role_id: number,
  id: number
}

@Component({
  selector: 'app-new-atleta',
  imports: [FormsModule, RouterModule],
  templateUrl: './new-atleta.component.html',
  styleUrl: './new-atleta.component.css',
  animations: [
    trigger('fadeInOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', [animate('400ms ease-out')]),
      transition('hidden => visible', [animate('400ms ease-in')])
    ])
  ]
})
export class NewAtletaComponent {
  atletaAct: Atleta = { nombre: '', username: '', password: '', email: '', foto: null, peso: 0, altura: 0, role_id: 3, id: 0 }
  quote: string = '';
  author: string = '';
  nombreEntrenador = sessionStorage.getItem('username');
  visible: 'visible' | 'hidden' = 'visible';
  fotoSeleccionada: File | null = null;

  constructor(private __stoicQuoteService: StoicQuoteService, private toastr: CustomToastrService, private __newAtletaService: NewAtletaService, private router: Router) { }

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
    formData.append('nombre', this.atletaAct.nombre);
    formData.append('contrasenya', this.atletaAct.password);
    formData.append('email', this.atletaAct.email);
    formData.append('peso', String(this.atletaAct.peso));
    formData.append('altura', String(this.atletaAct.altura));
    formData.append('role_id', String(this.atletaAct.role_id));
    formData.append('entrenador_id', String(sessionStorage.getItem('id')));
    if (this.fotoSeleccionada !== null) {
      formData.append('foto', this.fotoSeleccionada);
    }
    console.log("formData", formData);
    this.__newAtletaService.nuevoAtleta(formData).subscribe({
      next: (response) => {
        console.log("Atleta creado", response);
        this.router.navigate(["/dashboard-entrenador"]);
        this.toastr.show('Atleta creado correctamente', 'success')
      },
      error: (error) => {
        console.log("Error al crear atleta", error.error); // <-- Esto te da los mensajes de validación exactos

        this.toastr.show('Error al crear Atleta', 'error')
      }
    })
  }

  confirmarEliminacion() {
    if (this.atletaAct) {
      console.log("entrando a confirmar eliminacion")
      console.log("atletaAct:", this.atletaAct);
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
    this.__newAtletaService.eliminarAtleta(this.atletaAct.id)//TODO formulario solo pesando para crear nuevos atletas, reutilizar formulario para editar y eliminar atletas
  }
    logoClick(){
  this.router.navigate(["/dashboard-entrenador"]);
}
}