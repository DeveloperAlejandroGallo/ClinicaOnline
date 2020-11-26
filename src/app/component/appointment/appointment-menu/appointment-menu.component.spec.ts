import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentMenuComponent } from './appointment-menu.component';

describe('AppointmentMenuComponent', () => {
  let component: AppointmentMenuComponent;
  let fixture: ComponentFixture<AppointmentMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
