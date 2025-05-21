import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModAtletaService {

  constructor(private http: HttpClient) { }

  //apiUrl = 'https://api.gymbroanalytics.xyz/users'; //URL Producción
  apiUrl = "http://127.0.0.1:8000/users";  // URL base de la API LOCAL


  getUser(clienteId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${clienteId}/indexUserByID`);
  }
  getClienteByUsuarioId(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/clientes/${usuarioId}/getClienteByUsuarioId`);
  }
  
  actualizarAtleta(id: number, formData: FormData) {
    console.log("principio");
    for (const pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }
    console.log("fin");
    return this.http.post<any>(`${this.apiUrl}/clientes/atletas/${id}/actualizar`, formData);
  }

  eliminarAtleta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clientes/atletas/${id}/eliminar`);
  }

}