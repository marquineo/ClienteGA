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
import { NewEntrenadorComponent } from './new-entrenador/new-entrenador.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard-entrenador',
    component: DashboardEntrenadorComponent,
    canActivate: [authGuard]
  },
  {
    path: 'dashboard-cliente',
    component: DashboardClienteComponent,
    canActivate: [authGuard]
  },
  {
    path: 'form-atletas',
    component: NewAtletaComponent,
    canActivate: [authGuard]
  },
  {
    path: 'mod-atletas/:id',
    component: ModAtletaComponent,
    canActivate: [authGuard]
  },
  {
    path: 'perfil-entrenador',
    component: PerfilEntrenadorComponent,
    canActivate: [authGuard]
  },
  {
    path: 'rutina-entrenamiento',
    component: RutinaEntrenamientoComponent,
    canActivate: [authGuard]
  },
  {
    path: 'rutina-entrenamiento/:id',
    component: RutinaEntrenamientoComponent,
    canActivate: [authGuard]
  },
  {
    path: 'progreso',
    component: ProgresoClienteComponent,
    canActivate: [authGuard]
  },
  {
    path: 'progreso/:id',
    component: ProgresoClienteComponent,
    canActivate: [authGuard]
  },
  {
    path: 'dashboard-administrador',
    component: DashboardAdministradorComponent,
    canActivate: [authGuard]
  },
  {
    path: 'mod-entrenador/:id',
    component: ModEntrenadorComponent,
    canActivate: [authGuard]
  },
  {
    path: 'new-entrenador',
    component: NewEntrenadorComponent,
    canActivate: [authGuard]
  },

  // RUTA WILDCARD
  { path: '**', redirectTo: 'login' }
];
