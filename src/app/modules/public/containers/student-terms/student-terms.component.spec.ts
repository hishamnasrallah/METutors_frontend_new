import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTermsComponent } from './student-terms.component';

describe('StudentTermsComponent', () => {
  let component: StudentTermsComponent;
  let fixture: ComponentFixture<StudentTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentTermsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
