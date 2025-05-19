import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresoClienteComponent } from './progreso-cliente.component';

describe('ProgresoClienteComponent', () => {
  let component: ProgresoClienteComponent;
  let fixture: ComponentFixture<ProgresoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgresoClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgresoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
