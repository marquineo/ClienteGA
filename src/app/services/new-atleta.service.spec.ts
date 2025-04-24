import { TestBed } from '@angular/core/testing';

import { NewAtletaService } from './new-atleta.service';

describe('NewAtletaService', () => {
  let service: NewAtletaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewAtletaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
