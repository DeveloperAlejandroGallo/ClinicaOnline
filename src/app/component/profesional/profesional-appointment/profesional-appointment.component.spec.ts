import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalAppointmentComponent } from './profesional-appointment.component';

describe('ProfesionalAppointmentComponent', () => {
  let component: ProfesionalAppointmentComponent;
  let fixture: ComponentFixture<ProfesionalAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
