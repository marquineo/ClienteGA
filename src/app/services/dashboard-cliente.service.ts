import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

// Define las interfaces si aún no lo has hecho
export interface EntrenamientoDia {
  ejercicios: any[]; // Reemplaza "any" con tu modelo real si ya lo tienes
  fecha: string;
}

export interface RegistroProgreso {
  id: number;
  clienteId: number;
  fecha: string;
  peso: number;
  grasaCorporal: number;
  repeticiones: number;
  tiempoEntrenamiento: number;
  creadoEn: string;
}


@Injectable({
  providedIn: 'root'
})
export class DashboardClienteService {

  //apiUrl = 'https://api.gymbroanalytics.xyz/'; //URL Producción
  apiUrl = "http://127.0.0.1:8000/";  // URL base de la API LOCAL

  constructor(private http: HttpClient) {} // ✅ Inyección correcta

  // Obtener entrenamiento del día
  getEntrenamientoPorFecha(clienteId: number, fecha: string): Observable<EntrenamientoDia> {
    return this.http.get<EntrenamientoDia>(`${this.apiUrl}/entrenamientos/${clienteId}?fecha=${fecha}`);
  }

  // Obtener registros de progreso
getRegistrosProgreso(clienteId: number): Observable<RegistroProgreso[]> {
  return this.http.get<any[]>(`${this.apiUrl}/progresos/${clienteId}`).pipe(
    map(data =>
      data.map(item => ({
        id: item.id,
        clienteId: item.cliente_id,
        fecha: item.fecha,
        peso: item.peso,
        grasaCorporal: item.grasa_corporal,
        repeticiones: item.repeticiones,
        tiempoEntrenamiento: item.tiempo_entrenamiento,
        creadoEn: item.creado_en
      }))
    )
  );
}


  // Guardar nuevo progreso
  guardarProgreso(progreso: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/progresos/guardar`, progreso);
  }
}
