import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsAcademicTutoringComponent } from './benefits-academic-tutoring.component';

describe('BenefitsAcademicTutoringComponent', () => {
  let component: BenefitsAcademicTutoringComponent;
  let fixture: ComponentFixture<BenefitsAcademicTutoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BenefitsAcademicTutoringComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitsAcademicTutoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
