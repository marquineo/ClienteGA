import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {
  private apiUrl = 'https://api.gymbroanalytics.xyz/users';

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${this.apiUrl}/dashboard`, { headers });
  }

  getClientes(entrenadorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${entrenadorId}/clientes`);
  }

  getEntrenador(entrenadorId:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/${entrenadorId}/indexUserByID`)
  }
}