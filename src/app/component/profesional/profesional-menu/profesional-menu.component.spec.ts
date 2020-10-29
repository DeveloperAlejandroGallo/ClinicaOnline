import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalMenuComponent } from './profesional-menu.component';

describe('ProfesionalMenuComponent', () => {
  let component: ProfesionalMenuComponent;
  let fixture: ComponentFixture<ProfesionalMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
