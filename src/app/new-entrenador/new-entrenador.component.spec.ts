import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEntrenadorComponent } from './new-entrenador.component';

describe('NewEntrenadorComponent', () => {
  let component: NewEntrenadorComponent;
  let fixture: ComponentFixture<NewEntrenadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEntrenadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEntrenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
