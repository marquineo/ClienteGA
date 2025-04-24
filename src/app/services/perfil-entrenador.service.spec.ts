import { TestBed } from '@angular/core/testing';

import { PerfilEntrenadorService } from './perfil-entrenador.service';

describe('PerfilEntrenadorService', () => {
  let service: PerfilEntrenadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilEntrenadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
