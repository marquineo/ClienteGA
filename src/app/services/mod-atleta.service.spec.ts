import { TestBed } from '@angular/core/testing';

import { ModAtletaService } from './services/mod-atleta.service';

describe('ModAtletaService', () => {
  let service: ModAtletaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModAtletaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
