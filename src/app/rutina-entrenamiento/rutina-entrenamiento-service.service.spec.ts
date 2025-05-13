import { TestBed } from '@angular/core/testing';

import { RutinaEntrenamientoServiceService } from './rutina-entrenamiento-service.service';

describe('RutinaEntrenamientoServiceService', () => {
  let service: RutinaEntrenamientoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutinaEntrenamientoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
