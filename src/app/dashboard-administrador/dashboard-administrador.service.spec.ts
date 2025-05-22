import { TestBed } from '@angular/core/testing';

import { DashboardAdministradorService } from './dashboard-administrador.service';

describe('DashboardAdministradorService', () => {
  let service: DashboardAdministradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardAdministradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
