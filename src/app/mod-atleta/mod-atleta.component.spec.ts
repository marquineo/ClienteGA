import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModAtletaComponent } from './mod-atleta.component';

describe('ModAtletaComponent', () => {
  let component: ModAtletaComponent;
  let fixture: ComponentFixture<ModAtletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModAtletaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModAtletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
