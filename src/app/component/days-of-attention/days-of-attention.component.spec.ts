import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysOfAttentionComponent } from './days-of-attention.component';

describe('DaysOfAttentionComponent', () => {
  let component: DaysOfAttentionComponent;
  let fixture: ComponentFixture<DaysOfAttentionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaysOfAttentionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysOfAttentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
