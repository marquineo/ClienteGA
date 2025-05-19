import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-progreso-cliente',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './progreso-cliente.component.html',
  styleUrls: ['./progreso-cliente.component.css']
})
export class ProgresoClienteComponent {

  // Opcional: configuración general para todos los gráficos
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };

  // Gráfico de línea – Peso
  public lineChartDataPeso: ChartConfiguration<'line'>['data'] = {
    labels: ['2025-05-01', '2025-05-08', '2025-05-15'],
    datasets: [
      {
        data: [70, 68.5, 67.9],
        label: 'Peso (kg)',
        fill: false,
        tension: 0.4,
        borderColor: 'blue',
        backgroundColor: 'blue'
      }
    ]
  };
  public lineChartType: ChartType = 'line';

  // Gráfico de línea – Grasa corporal
  public lineChartDataGrasa: ChartConfiguration<'line'>['data'] = {
    labels: ['2025-05-01', '2025-05-08', '2025-05-15'],
    datasets: [
      {
        data: [20, 19, 18.5],
        label: 'Grasa Corporal (%)',
        fill: false,
        tension: 0.4,
        borderColor: 'red',
        backgroundColor: 'red'
      }
    ]
  };

  // Gráfico de barras
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Mayo 1', 'Mayo 8', 'Mayo 15'],
    datasets: [
      {
        label: 'Peso',
        data: [70, 68.5, 67.9],
        backgroundColor: 'blue'
      },
      {
        label: 'Grasa',
        data: [20, 19, 18.5],
        backgroundColor: 'red'
      }
    ]
  };
  public barChartType: ChartType = 'bar';

  // Gráfico Doughnut
  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Piernas', 'Pecho', 'Espalda', 'Brazos'],
    datasets: [
      {
        data: [30, 25, 25, 20],
        backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9'],
      }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  // Gráfico Radar
  public radarChartData: ChartConfiguration<'radar'>['data'] = {
    labels: ['Fuerza', 'Resistencia', 'Velocidad', 'Movilidad', 'Potencia'],
    datasets: [
      {
        label: 'Antes',
        data: [60, 65, 70, 50, 55],
        fill: true,
        backgroundColor: 'rgba(0,123,255,0.3)',
        borderColor: 'blue'
      },
      {
        label: 'Ahora',
        data: [75, 70, 80, 65, 60],
        fill: true,
        backgroundColor: 'rgba(40,167,69,0.3)',
        borderColor: 'green'
      }
    ]
  };
  public radarChartType: ChartType = 'radar';

  // Gráfico Scatter
  public scatterChartData: ChartConfiguration<'scatter'>['data'] = {
    datasets: [
      {
        label: 'Peso vs Grasa',
        data: [
          { x: 70, y: 20 },
          { x: 68.5, y: 19 },
          { x: 67.9, y: 18.5 },
        ],
        backgroundColor: 'purple'
      }
    ]
  };
  public scatterChartType: ChartType = 'scatter';
}
