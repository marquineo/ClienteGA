import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgresoService {
  private apiUrl = 'http://localhost:8000/progresos';

  constructor(private http: HttpClient) { }

  getProgresos(clienteId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/clientes/${clienteId}/progresos`);
  }
}