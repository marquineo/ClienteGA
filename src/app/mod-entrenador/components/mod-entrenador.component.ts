import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StoicQuoteService } from '../../services/stoic-quotesService';
import { FormsModule } from '@angular/forms';
import { NewAtletaService } from '../../services/new-atleta.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';
import { CustomToastrService } from '../../services/custom-toastr.service';
import { EntrenadorService } from '../../services/entrenador.service';
import { ModAtletaService } from '../../services/mod-atleta.service';

interface Entrenador {
  id: number,
  usuario_id: number,
  nombre:string,
  especialidad: string,
  experiencia: number,
  //usuarios
  ishabilitado:boolean,
  fotoURL:string,
  email:string
}

@Component({
  selector: 'app-mod-entrenador',
  imports: [FormsModule, RouterModule],
  templateUrl: './mod-entrenador.component.html',
  styleUrl: './mod-entrenador.component.css',
    animations: [
    trigger('fadeInOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', [animate('400ms ease-out')]),
      transition('hidden => visible', [animate('400ms ease-in')])
    ])
  ]
})
export class ModEntrenadorComponent {

 entrenadorAct: Entrenador = { id: 0, usuario_id: 0, nombre: '', especialidad: '', experiencia: 0, ishabilitado: false, fotoURL: "",email:""}
  quote: string = '';
  author: string = '';
  nombreEntrenador = sessionStorage.getItem('username');
  visible: 'visible' | 'hidden' = 'visible';
  fotoSeleccionada: File | null = null;
  entrenadorId: number = 0;


  constructor(private __stoicQuoteService: StoicQuoteService,
    private toastr: CustomToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private __modEntrenador: EntrenadorService,
    private __modAtletaService: ModAtletaService
  ) { }

  ngOnInit(): void {
    this.fetchQuote();
    this.entrenadorId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    console.log("entrenadorId",this.entrenadorId);
    this.getAtleta();
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

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fotoSeleccionada = input.files[0]; // <-- ESTA es la que usas luego

      // Mostrar la imagen seleccionada antes de enviar
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.entrenadorAct.fotoURL = e.target.result;
      };
      reader.readAsDataURL(this.fotoSeleccionada);
    }
  }


  getAtleta() {
    this.__modEntrenador.getEntrenador(this.entrenadorId).subscribe({
      next: (responseUsuario) => {
        const dataUsuario = responseUsuario;
        console.log("usuario",dataUsuario);
            this.entrenadorAct = {
              id: dataUsuario.id,
              usuario_id: dataUsuario.id,
              nombre: dataUsuario.nombre,
              especialidad: dataUsuario.especialidad,
              experiencia: dataUsuario.experiencia,
              ishabilitado: dataUsuario.ishabilitado,
              fotoURL: dataUsuario.fotoURL,
              email: dataUsuario.email
            };
      },
      error: (error) => {
        console.error("Error al obtener datos de usuario:", error);
      }
    });
  }
  
  submitForm(): void {
    const formData = new FormData();
    formData.append('nombre', this.entrenadorAct.nombre);
    formData.append('especialidad', this.entrenadorAct.especialidad);
    formData.append('email', this.entrenadorAct.email);
    formData.append('experiencia', String(this.entrenadorAct.experiencia));
    formData.append('ishabilitado', String(this.entrenadorAct.ishabilitado));
    formData.append('usuario_id', String(this.entrenadorId));
    if (this.fotoSeleccionada !== null) {
      formData.append('foto', this.fotoSeleccionada);
    }
    console.log("formData", formData);
    this.__modEntrenador.actualizarEntrenador(this.entrenadorId, formData).subscribe({
      next: (response) => {
        console.log("Atleta actualizado", response);
        this.router.navigate(["/dashboard-administrador"]);
        this.toastr.show('Atleta actualizado correctamente', 'success')
      },
      error: (error) => {
        console.log("Error al actualizar atleta", error.error);
        this.toastr.show('Error al actualizar Atleta', 'error')
      }
    });

  }
  confirmarEliminacion() {
    if (this.entrenadorAct) {
      this.eliminarAtleta();

      // Cerrar el modal
      const modalElement = document.getElementById('modalConfirmarEliminacion');
      if (modalElement) {
        const modalBootstrap = bootstrap.Modal.getInstance(modalElement);
        modalBootstrap?.hide();
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
    this.__modEntrenador.eliminarEntrenador(this.entrenadorAct.id).subscribe({
      next: (response) => {
        console.log("Entrenador eliminado", response);
        this.toastr.show('Entrenador eliminado correctamente', 'success');
        this.router.navigate(['/dashboard-administrador']);
      },
      error: (error) => {
        console.error("Error al eliminar Entrenador", error);
        this.toastr.show('Error al eliminar Entrenador', 'error');
      }
    });
  }
  logoClick(){
  this.router.navigate(["/dashboard-administrador"]);
}

}
