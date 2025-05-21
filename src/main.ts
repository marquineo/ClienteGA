import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { DateAdapter } from 'angular-calendar';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), //para los servicios
    provideRouter(routes), //enrutamiento habilitado
    provideAnimations(),
        { provide: DateAdapter, useFactory: adapterFactory },
        { provide: LOCALE_ID, useValue: 'es' }
  ]
});
