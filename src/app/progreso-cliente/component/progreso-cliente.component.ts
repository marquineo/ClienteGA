// src/app/progreso-cliente/progreso-cliente.component.ts

import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ProgresoService } from '../progreso.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-progreso-cliente',
  standalone: true,
  imports: [CommonModule, NgChartsModule, RouterModule],
  templateUrl: './progreso-cliente.component.html',
  styleUrls: ['./progreso-cliente.component.css']
})
export class ProgresoClienteComponent implements OnInit {
  clienteId = 0;
  rol = sessionStorage.getItem("rol");

  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: { legend: { display: true, position: 'top' } }
  };
  // radarChartData y tipo
  radarChartData: ChartConfiguration<'radar'>['data'] = {
    labels: ['Peso (kg)', 'Grasa Corporal (%)'],
    datasets: []
  };
  radarChartType: ChartType = 'radar';


  // Gráficos
  lineChartDataPeso: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  lineChartDataGrasa: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  barChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [] };

  // Tipos
  lineChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';

  constructor(
    private __progresoService: ProgresoService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.clienteId = Number(sessionStorage.getItem('id')) || 0;
    if (this.rol == "entrenador") this.clienteId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.cargarProgresos();
  }

  cargarProgresos() {
    //console.log("clienteID", this.clienteId);
    this.__progresoService.getProgresos(this.clienteId).subscribe(progresos => {
      //console.log("progresos", progresos);
      const fechas = progresos.map(p => p.fecha);
      const pesos = progresos.map(p => p.peso);
      const grasas = progresos.map(p => p.grasa_corporal);

      this.lineChartDataPeso = {
        labels: fechas,
        datasets: [{
          data: pesos,
          label: 'Peso (kg)',
          fill: false,
          tension: 0.4,
          borderColor: 'blue',
          backgroundColor: 'blue'
        }]
      };

      this.lineChartDataGrasa = {
        labels: fechas,
        datasets: [{
          data: grasas,
          label: 'Grasa Corporal (%)',
          fill: false,
          tension: 0.4,
          borderColor: 'red',
          backgroundColor: 'red'
        }]
      };

      this.barChartData = {
        labels: fechas,
        datasets: [
          { label: 'Peso', data: pesos, backgroundColor: 'blue' },
          { label: 'Grasa', data: grasas, backgroundColor: 'red' }
        ]
      };
      this.radarChartData = {
        labels: fechas,
        datasets: [{
          label: 'Peso (kg)',
          data: pesos,
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)'
        }, {
          label: 'Grasa Corporal (%)',
          data: grasas,
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)'
        }]
      };
    });
  }

  logoClick() {
    if (this.rol == "entrenador") {
      this.route.navigate(["/dashboard-entrenador"]);
    } else {
      this.route.navigate(["/dashboard-cliente"]);
    }

  }
}
