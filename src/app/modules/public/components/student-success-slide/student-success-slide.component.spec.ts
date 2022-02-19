import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSuccessSlideComponent } from './student-success-slide.component';

describe('StudentSuccessSlideComponent', () => {
  let component: StudentSuccessSlideComponent;
  let fixture: ComponentFixture<StudentSuccessSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentSuccessSlideComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSuccessSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
