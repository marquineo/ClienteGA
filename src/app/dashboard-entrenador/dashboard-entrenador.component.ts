import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EntrenadorService } from '../services/entrenador.service';
import { FormsModule } from '@angular/forms';
import { StoicQuoteService } from '../services/stoic-quotesService';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RouterModule } from '@angular/router';
import { RutinaEntrenamientoService } from '../rutina-entrenamiento/rutina-entrenamiento-service.service';


interface Atleta {
  nombre: string,
  bloque: string,
  peso: GLfloat,
  entrenamiento: string,
  fotoURL: string,
  usuario_id: number
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
  atletasFiltrados: Atleta[] = [];
  nombreEntrenador = sessionStorage.getItem('username');
  id = Number(sessionStorage.getItem('id'));

  constructor(private __stoicQuoteService: StoicQuoteService, private __entrenadorService: EntrenadorService, private __rutinasService: RutinaEntrenamientoService) { }

  ngOnInit(): void {
    console.log("entranodo en dashboard-entrenador");
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
        atleta.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
      );
    }
  }

getAtletas() {
  const hoy = new Date().toISOString().split('T')[0]; // "2025-05-21"
  console.log("Hoy es:", hoy);

  this.__entrenadorService.getClientes(this.id).subscribe({
    next: (clientes) => {
      this.atletas = clientes;

      this.atletas.forEach((atleta, index) => {
        this.__rutinasService.getRutinasConEjercicios(atleta.usuario_id).subscribe({
          next: (rutinas) => {
            if (rutinas.length > 0) {
              const rutina = rutinas[0];
              this.atletas[index].bloque = rutina.nombre;

              // Filtrar ejercicios solo para hoy
              const ejerciciosDeHoy = rutina.ejercicios.filter((e: any) => {
                const fechaEjercicio = e.dia_semana;
                return fechaEjercicio === hoy;
              });

              if (ejerciciosDeHoy.length > 0) {
                const nombresEjercicios = ejerciciosDeHoy.map((e: any) => e.nombre_ejercicio);
                this.atletas[index].entrenamiento = nombresEjercicios.join(', ');
              } else {
                this.atletas[index].entrenamiento = 'Descanso';
              }

            } else {
              this.atletas[index].bloque = 'Offseason';
              this.atletas[index].entrenamiento = 'Descanso';
            }

            this.filtrarAtletas(); // Aplica el filtro si hay
          },
          error: (e) => {
            console.error(`Error cargando rutina del cliente ${atleta.usuario_id}`, e);
          }
        });
      });
    },
    error: (error) => {
      console.log("error al obtener clientes", error);
    }
  });
}



}