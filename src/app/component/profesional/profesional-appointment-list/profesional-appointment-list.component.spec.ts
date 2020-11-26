import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalAppointmentListComponent } from './profesional-appointment-list.component';

describe('ProfesionalAppointmentListComponent', () => {
  let component: ProfesionalAppointmentListComponent;
  let fixture: ComponentFixture<ProfesionalAppointmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalAppointmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalAppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
