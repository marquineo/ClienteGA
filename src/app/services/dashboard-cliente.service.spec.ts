import { TestBed } from '@angular/core/testing';

import { DashboardClienteService } from './dashboard-cliente.service';

describe('DashboardClienteService', () => {
  let service: DashboardClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
