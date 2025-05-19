import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgresoService {
  private apiUrl = 'http://localhost:8000/api/progreso';

  constructor(private http: HttpClient) { }

  getProgreso(clienteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${clienteId}`);
  }
}