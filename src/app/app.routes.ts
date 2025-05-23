import { Routes } from '@angular/router';
import { LoginComponent } from './login/components/login.component';
import { DashboardEntrenadorComponent } from './dashboard-entrenador/dashboard-entrenador.component';
import { NewAtletaComponent } from './new-atleta/new-atleta.component';
import { PerfilEntrenadorComponent } from './perfil-entrenador/perfil-entrenador.component';
import { RutinaEntrenamientoComponent } from './rutina-entrenamiento/components/rutina-entrenamiento.component';
import { ProgresoClienteComponent } from './progreso-cliente/component/progreso-cliente.component';
import { ModAtletaComponent } from './mod-atleta/mod-atleta.component';
import { DashboardClienteComponent } from './dashboard-cliente/dashboard-cliente.component';
import { DashboardAdministradorComponent } from './dashboard-administrador/components/dashboard-administrador.component';
import { ModEntrenadorComponent } from './mod-entrenador/components/mod-entrenador.component';

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
    // Dashboard Cliente
  {
    path: 'dashboard-cliente',
    component: DashboardClienteComponent
  },
  // Formulario Atletas
  {
    path: 'form-atletas',
    component: NewAtletaComponent
  },
    // Formulario Atletas modificar
  {
    path: 'mod-atletas/:id',
    component: ModAtletaComponent
  },
  // Perfil entrenador
  {
    path: 'perfil-entrenador',
    component: PerfilEntrenadorComponent
  },
    // rutinaEnrenamiento
  {
    path: 'rutina-entrenamiento',
    component: RutinaEntrenamientoComponent
  },
    {
    path: 'rutina-entrenamiento/:id',
    component: RutinaEntrenamientoComponent
  },
   {
    path: 'progreso',
    component: ProgresoClienteComponent,
  },
     {
    path: 'progreso/:id',
    component: ProgresoClienteComponent,
  },
    {
    path: 'dashboard-administrador',
    component: DashboardAdministradorComponent
  },
    {
    path: 'mod-entrenador/:id',
    component: ModEntrenadorComponent
  },

  // Wildcard debe ir al final
  {
    path: '**',
    redirectTo: 'login'
  }
];

