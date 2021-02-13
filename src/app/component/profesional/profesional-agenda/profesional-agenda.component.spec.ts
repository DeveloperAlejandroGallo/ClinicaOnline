import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalAgendaComponent } from './profesional-agenda.component';

describe('ProfesionalAgendaComponent', () => {
  let component: ProfesionalAgendaComponent;
  let fixture: ComponentFixture<ProfesionalAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalAgendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
