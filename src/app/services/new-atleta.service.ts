import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable, tap } from 'rxjs';

interface Atleta {
  nombre: string,
  username: string,
  password: string,
  email: string,
  fotoURL: string,
  peso: GLfloat,
  altura: GLfloat,
  role_id: number
}
@Injectable({
  providedIn: 'root'
})
export class NewAtletaService {

  //urlApi = "http://192.168.0.13:8000/api/cuentas";  // URL base de la API SERVER
  urlApi = "http://3.64.53.199:8000/users";  // URL base de la API LOCAL

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private http: HttpClient) { }


  nuevoAtleta(formData: FormData): Observable<any> {
    console.log("entrando en nuevoAtleta");
    for (const pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }
    return this.http.post<any>(this.urlApi, formData).pipe(
      tap(response => console.log("Respuesta del servidor:", response))
    );
  }

  eliminarAtleta(atletaID: number): Observable<any> {
    console.log("entrando a eliminarAtleta");
    const URLDELETE = this.urlApi + "/" + atletaID;
    return this.http.delete<any>(URLDELETE).pipe(
      tap(response => console.log("Respuesta del servidor:", response))
    );
  }
}
