import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EntrenadorService } from '../services/entrenador.service';
import { FormsModule } from '@angular/forms';
import { StoicQuoteService } from '../services/stoic-quotesService';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RouterModule } from '@angular/router';


interface Atleta {
  name: string,
  bloque: number,
  semana: number,
  peso: GLfloat,
  entrenamiento: string,
  fotoURL: string
}
@Component({
  selector: 'app-dashboard-entrenador',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard-entrenador.component.html',
  styleUrl: './dashboard-entrenador.component.css',
  animations: [
    trigger('fadeInOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', [animate('400ms ease-out')]),
      transition('hidden => visible', [animate('400ms ease-in')])
    ])
  ]
})
export class DashboardEntrenadorComponent implements OnInit {
  quote: string = '';
  author: string = '';

  filtroNombre: string = '';
  visible: 'visible' | 'hidden' = 'visible';
  atletas: Atleta[] = []
    /*{
      nombre: "Lucia Fernandez",
      bloque: 1,
      semana: 2,
      peso: 62.5,
      entrenamiento: "SBD primario",
      imagen: "assets/atleta1.png"
    },
    {
      nombre: "Carlos Mendez",
      bloque: 2,
      semana: 4,
      peso: 78.3,
      entrenamiento: "Descanso",
      imagen: "assets/atleta2.png"
    },
    {
      nombre: "Ana Ruiz",
      bloque: 3,
      semana: 1,
      peso: 54.2,
      entrenamiento: "Benchpress 3º",
      imagen: "assets/atleta3.png"
    },
    {
      nombre: "Javier Torres",
      bloque: 1,
      semana: 3,
      peso: 88.0,
      entrenamiento: "Deadlift 2º",
      imagen: "assets/atleta4.png"
    }
  ];*/
  atletasFiltrados: Atleta[] = [];
  nombreEntrenador = sessionStorage.getItem('username');
  id = Number(sessionStorage.getItem('id'));

  constructor(private __stoicQuoteService: StoicQuoteService, private __entrenadorService: EntrenadorService) { }

  ngOnInit(): void {
    this.fetchQuote();
    this.getAtletas();
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

  filtrarAtletas() {
    if (this.filtroNombre == '') {
      this.atletasFiltrados = this.atletas;
    } else {
      this.atletasFiltrados = this.atletas.filter(atleta =>
        atleta.name.toLowerCase().includes(this.filtroNombre.toLowerCase())
      );
    }
  }

  getAtletas() {
    this.__entrenadorService.getClientes(this.id).subscribe({
      next: (response) => {
        console.log("clientes:", response);
        this.atletas = response;
        this.filtrarAtletas();
      },
      error: (error) => {
        console.log("error al obtener clientes", error);
      }
    })
  }
}