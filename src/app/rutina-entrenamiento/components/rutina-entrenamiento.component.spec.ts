import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaEntrenamientoComponent } from './rutina-entrenamiento.component';

describe('RutinaEntrenamientoComponent', () => {
  let component: RutinaEntrenamientoComponent;
  let fixture: ComponentFixture<RutinaEntrenamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutinaEntrenamientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutinaEntrenamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
