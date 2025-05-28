import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  //urlApi = "http://127.0.0.1:8000";  // URL base de la API LOCAL
  urlApi = "https://api.gymbroanalytics.xyz";  // URL base de la API SERVER

  currentUsername: string = '';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`${this.urlApi}/users`, this.httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error al obtener usuarios', error);
          throw error;
        })
      );
  }
  

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.urlApi}/users/${id}`, this.httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error al obtener usuario', error);
          throw error;
        })
      );
  }

  login(username: string, password: string): Observable<any> {
    const body = {
      "Usuarioname": username,
      "password": password
    };
    return this.http.post<any>(`${this.urlApi}/users/login`, body, this.httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error al autenticar', error);
          throw error;
        })
      );
  } 
}