import { Routes } from '@angular/router';
import { LoginComponent } from './login/components/login.component';
import { DashboardEntrenadorComponent } from './dashboard-entrenador/dashboard-entrenador.component';
import { NewAtletaComponent } from './new-atleta/new-atleta.component';
import { PerfilEntrenadorComponent } from './perfil-entrenador/perfil-entrenador.component';

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
  // Perfil entrenador
  {
    path: 'perfil-entrenador',
    component: PerfilEntrenadorComponent
  },

  // Wildcard debe ir al final
  {
    path: '**',
    redirectTo: 'login'
  }
];

