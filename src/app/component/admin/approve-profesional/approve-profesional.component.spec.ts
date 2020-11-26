import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveProfesionalComponent } from './approve-profesional.component';

describe('ApproveProfesionalComponent', () => {
  let component: ApproveProfesionalComponent;
  let fixture: ComponentFixture<ApproveProfesionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveProfesionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
