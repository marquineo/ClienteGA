import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilEntrenadorService {

  //urlApi = "http://127.0.0.1:8000/users";  // URL base de la API LOCAL
  urlApi = "https://api.gymbroanalytics.xyz/users";  // URL base de la API LOCAL

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private http: HttpClient) { }

  updateEntrenador($usuario_id: number, formData: FormData): Observable<any> {
    const URLUPDATE = `${this.urlApi}/${$usuario_id}/actualizar/entrenador`
    return this.http.post<any>(URLUPDATE, formData).pipe(
      //tap(response => //console.log("Respuesta del servidor", response))
    )
  }
}
