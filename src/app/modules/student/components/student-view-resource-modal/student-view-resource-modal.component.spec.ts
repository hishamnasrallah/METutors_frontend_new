import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewResourceModalComponent } from './student-view-resource-modal.component';

describe('StudentViewResourceModalComponent', () => {
  let component: StudentViewResourceModalComponent;
  let fixture: ComponentFixture<StudentViewResourceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentViewResourceModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentViewResourceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
