import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {
  urlApi = 'https://api.gymbroanalytics.xyz/users'; //URL Producción
  //urlApi = "http://127.0.0.1:8000/users";  // URL base de la API LOCAL

  constructor(private http: HttpClient) { }

  getDashboard(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${this.urlApi}/dashboard`, { headers });
  }

  getClientes(entrenadorId: number): Observable<any> {
    return this.http.get(`${this.urlApi}/${entrenadorId}/clientes`);
  }

  getEntrenador(entrenadorId: number): Observable<any> {
    return this.http.get(`${this.urlApi}/${entrenadorId}/indexEntrenadorByID`)
  }

  actualizarEntrenador(id: number, formData: FormData) {
    for (const pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }
    return this.http.post<any>(`${this.urlApi}/${id}/actualizar/entrenador`, formData);
  }

  eliminarEntrenador(id: number): Observable<any> {
    return this.http.delete(`${this.urlApi}/entrenador/${id}/eliminar`);
  }
}