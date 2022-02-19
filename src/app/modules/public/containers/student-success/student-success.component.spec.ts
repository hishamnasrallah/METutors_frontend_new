import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSuccessComponent } from './student-success.component';

describe('StudentSuccessComponent', () => {
  let component: StudentSuccessComponent;
  let fixture: ComponentFixture<StudentSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentSuccessComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
