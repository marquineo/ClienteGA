import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardAdministradorService {
  apiUrl = 'https://api.gymbroanalytics.xyz'; //URL Producción
  //apiUrl = "http://127.0.0.1:8000";  // URL base de la API LOCAL

  constructor(private http: HttpClient) { } // ✅ Inyección correcta

  getEntrenadores():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/users/entrenadores`);
  }
}