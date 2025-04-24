import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEntrenadorComponent } from './dashboard-entrenador.component';

describe('DashboardEntrenadorComponent', () => {
  let component: DashboardEntrenadorComponent;
  let fixture: ComponentFixture<DashboardEntrenadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEntrenadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEntrenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
