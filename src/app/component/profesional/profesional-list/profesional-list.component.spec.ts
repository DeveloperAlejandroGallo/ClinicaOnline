import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionalListComponent } from './profesional-list.component';

describe('ProfesionalListComponent', () => {
  let component: ProfesionalListComponent;
  let fixture: ComponentFixture<ProfesionalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesionalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
