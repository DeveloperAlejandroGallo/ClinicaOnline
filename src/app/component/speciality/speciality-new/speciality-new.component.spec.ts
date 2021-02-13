import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityNewComponent } from './speciality-new.component';

describe('SpecialityNewComponent', () => {
  let component: SpecialityNewComponent;
  let fixture: ComponentFixture<SpecialityNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialityNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialityNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
