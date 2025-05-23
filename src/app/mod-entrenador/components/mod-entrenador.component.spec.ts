import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModEntrenadorComponent } from './mod-entrenador.component';

describe('ModEntrenadorComponent', () => {
  let component: ModEntrenadorComponent;
  let fixture: ComponentFixture<ModEntrenadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModEntrenadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModEntrenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
