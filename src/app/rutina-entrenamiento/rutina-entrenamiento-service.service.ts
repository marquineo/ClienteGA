import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutinaEntrenamientoService {

  private apiUrl = 'http://localhost:8000/rutinas';

  constructor(private http: HttpClient) { }

  // Obtener la rutina de un atleta
  getRutinaPorCliente(clienteId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${clienteId}`);
  }

  // Actualizar rutina de un atleta
  actualizarRutina(clienteId: number, rutina: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/cliente/${clienteId}`, rutina);
  }

  // Añadir ejercicio a la rutina
  agregarEjercicio(clienteId: number, ejercicio: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/cliente/${clienteId}/ejercicio`, ejercicio);
  }

  // Eliminar ejercicio de la rutina
  eliminarEjercicio(clienteId: number, ejercicioId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cliente/${clienteId}/ejercicio/${ejercicioId}`);
  }
  eliminarRutinas(nombreRutinas: string[],clienteId: number) {
  return this.http.post(`${this.apiUrl}/clientes/${clienteId}/rutinas/eliminar`, { nombres: nombreRutinas });
}

//dashboard-entrenador
getRutinasConEjercicios(clienteId: number) {
  return this.http.get<any[]>(`${this.apiUrl}/clientes/${clienteId}/rutinas-con-ejercicios`);
}


}
