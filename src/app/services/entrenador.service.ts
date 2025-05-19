import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {
    //urlApi = 'https://api.gymbroanalytics.xyz/users'; //URL Producción
    urlApi = "http://127.0.0.1:8000/users";  // URL base de la API LOCAL

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${this.urlApi}/dashboard`, { headers });
  }

  getClientes(entrenadorId: number): Observable<any> {
    return this.http.get(`${this.urlApi}/${entrenadorId}/clientes`);
  }

  getEntrenador(entrenadorId:number):Observable<any>{
    return this.http.get(`${this.urlApi}/${entrenadorId}/indexEntrenadorByID`)
  }
}