import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAtletaComponent } from './new-atleta.component';

describe('NewAtletaComponent', () => {
  let component: NewAtletaComponent;
  let fixture: ComponentFixture<NewAtletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAtletaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAtletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
