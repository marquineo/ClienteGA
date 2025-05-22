import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoicQuoteService } from '../../services/stoic-quotesService';
import { DashboardAdministradorService } from '../dashboard-administrador.service';

interface Entrenador {
  id: number,
  usuario_id: number,
  nombre:string,
  especialidad: string,
  experiencia: number,
  //usuarios
  ishabilitado:boolean,
  fotoURL:string
}

@Component({
  selector: 'app-dashboard-administrador',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard-administrador.component.html',
  styleUrl: './dashboard-administrador.component.css',
  animations: [
    trigger('fadeInOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', [animate('400ms ease-out')]),
      transition('hidden => visible', [animate('400ms ease-in')])
    ])
  ]
})
export class DashboardAdministradorComponent {
  quote: string = '';
  author: string = '';

  filtroNombre: string = '';
  visible: 'visible' | 'hidden' = 'visible';
  entrenadores: Entrenador[] = []
  entrenadoresFiltrados: Entrenador[] = [];
  nombreEntrenador = sessionStorage.getItem('username');
  id = Number(sessionStorage.getItem('id'));

  constructor(private __stoicQuoteService: StoicQuoteService, private __administradorService: DashboardAdministradorService) { }

  ngOnInit(): void {
    console.log("entranodo en dashboard-entrenador");
    this.fetchQuote();
    this.getEntrenadores();
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

  filtrarEntrenadores() {
    if (this.filtroNombre == '') {
      this.entrenadoresFiltrados = this.entrenadores;
    } else {
      this.entrenadoresFiltrados = this.entrenadores.filter(entrenador =>
        entrenador.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
      );
    }
  }

  getEntrenadores() {
    this.__administradorService.getEntrenadores().subscribe({
      next: (response) => {
        console.log("response", response);
        this.entrenadores = response;
        this.filtrarEntrenadores();
      },
      error: (error) => {
        console.log("error", error);
      }
    })

  }

}
