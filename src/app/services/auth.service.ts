import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Simulación de verificación de sesión
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken'); // Comprueba si hay un token en localStorage
  }

  login(token: string): void {
    localStorage.setItem('userToken', token); // Guarda el token al iniciar sesión
  }

  logout(): void {
    localStorage.removeItem('userToken'); // Elimina el token al cerrar sesión
  }
}
