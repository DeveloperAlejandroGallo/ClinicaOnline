import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityMenuComponent } from './speciality-menu.component';

describe('SpecialityMenuComponent', () => {
  let component: SpecialityMenuComponent;
  let fixture: ComponentFixture<SpecialityMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialityMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialityMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
