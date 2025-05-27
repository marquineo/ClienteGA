import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StoicQuoteService } from '../services/stoic-quotesService';
import { FormsModule } from '@angular/forms';
import { NewAtletaService } from '../services/new-atleta.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';
import { CustomToastrService } from '../services/custom-toastr.service';
import { RutinaEntrenamientoService } from '../rutina-entrenamiento/rutina-entrenamiento-service.service';
import { ModAtletaService } from '../services/mod-atleta.service';
import { CommonModule } from '@angular/common';

interface Atleta {
  nombre: string,
  username: string,
  password: string,
  email: string,
  foto: File | null,
  peso: GLfloat,
  altura: GLfloat,
  role_id: number,
  id: number,
  fotoURL: string
}
@Component({
  selector: 'app-mod-atleta',
  imports: [FormsModule, RouterModule,CommonModule],
  templateUrl: './mod-atleta.component.html',
  styleUrl: './mod-atleta.component.css',
  animations: [
    trigger('fadeInOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', [animate('400ms ease-out')]),
      transition('hidden => visible', [animate('400ms ease-in')])
    ])
  ]
})
export class ModAtletaComponent {
  atletaAct: Atleta = { nombre: '', username: '', password: '', email: '', foto: null, peso: 0, altura: 0, role_id: 3, id: 0, fotoURL: "" }
  quote: string = '';
  author: string = '';
  nombreEntrenador = sessionStorage.getItem('username');
  visible: 'visible' | 'hidden' = 'visible';
  fotoSeleccionada: File | null = null;
  clienteId: number = 0;
    public showPassword: boolean = false;


  constructor(private __stoicQuoteService: StoicQuoteService,
    private toastr: CustomToastrService,
    private __newAtletaService: NewAtletaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private __modAtletaService: ModAtletaService) { }

  ngOnInit(): void {
    this.fetchQuote();
    this.clienteId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    console.log("clienteID",this.clienteId);
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
        this.atletaAct.fotoURL = e.target.result;
      };
      reader.readAsDataURL(this.fotoSeleccionada);
    }
  }


  getAtleta() {
    this.__modAtletaService.getUser(this.clienteId).subscribe({
      next: (responseUsuario) => {
        const dataUsuario = responseUsuario.data;

        // Una vez tenemos el usuario, ahora pedimos los datos de cliente por su usuario_id
        this.__modAtletaService.getClienteByUsuarioId(dataUsuario.id).subscribe({
          next: (responseCliente) => {
            const dataCliente = responseCliente.data;

            this.atletaAct = {
              nombre: dataUsuario.nombre,
              username: '', // aún no disponible, depende de tu sistema
              password: '',
              email: dataUsuario.email,
              foto: null, // o puedes mantener la URL en una propiedad aparte
              peso: parseFloat(dataCliente.peso),
              altura: parseFloat(dataCliente.altura),
              role_id: 0, // puedes asignarlo si tienes una lógica (por ejemplo si rol === 'cliente' => 2)
              id: dataUsuario.id,
              fotoURL: dataUsuario.fotoURL
            };

            console.log("Atleta cargado:", this.atletaAct);
          },
          error: (error) => {
            console.error("Error al obtener datos de cliente:", error);
          }
        });
      },
      error: (error) => {
        console.error("Error al obtener datos de usuario:", error);
      }
    });
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
    this.__modAtletaService.actualizarAtleta(this.atletaAct.id, formData).subscribe({
      next: (response) => {
        console.log("Atleta actualizado", response);
        this.router.navigate(["/dashboard-entrenador"]);
        this.toastr.show('Atleta actualizado correctamente', 'success')
      },
      error: (error) => {
        console.log("Error al actualizar atleta", error.error);
        this.toastr.show('Error al actualizar Atleta', 'error')
      }
    });

  }
  confirmarEliminacion() {
    if (this.atletaAct) {
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
    this.__modAtletaService.eliminarAtleta(this.atletaAct.id).subscribe({
      next: (response) => {
        console.log("Atleta eliminado", response);
        this.toastr.show('Atleta eliminado correctamente', 'success');
        this.router.navigate(['/dashboard-entrenador']);
      },
      error: (error) => {
        console.error("Error al eliminar atleta", error);
        this.toastr.show('Error al eliminar Atleta', 'error');
      }
    });
  }
  logoClick(){
  this.router.navigate(["/dashboard-entrenador"]);
}

  changePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}