import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTermsConditionsComponent } from './student-terms-conditions.component';

describe('StudentTermsConditionsComponent', () => {
  let component: StudentTermsConditionsComponent;
  let fixture: ComponentFixture<StudentTermsConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentTermsConditionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTermsConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
