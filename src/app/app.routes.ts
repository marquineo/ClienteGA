import { Routes } from '@angular/router';
import { LoginComponent } from './login/components/login.component';
import { DashboardEntrenadorComponent } from './dashboard-entrenador/dashboard-entrenador.component';
import { NewAtletaComponent } from './new-atleta/new-atleta.component';

export const routes: Routes = [
  // Login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },

  // Dashboard Entrenador
  {
    path: 'dashboard-entrenador',
    component: DashboardEntrenadorComponent
  },
    // Formulario Atletas
    {
      path: 'form-atletas',
      component: NewAtletaComponent
    },

  // Wildcard debe ir al final
  {
    path: '**',
    redirectTo: 'login'
  }
];

