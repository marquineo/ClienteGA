import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgresoService {
  //private apiUrl = 'http://localhost:8000/progresos';
  private apiUrl = "https://api.gymbroanalytics.xyz/progresos";  // URL base de la API SERVER

  constructor(private http: HttpClient) { }

  getProgresos(clienteId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/clientes/${clienteId}/progresos`);
  }
}