import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMakeupClassModalComponent } from './student-makeup-class-modal.component';

describe('StudentMakeupClassModalComponent', () => {
  let component: StudentMakeupClassModalComponent;
  let fixture: ComponentFixture<StudentMakeupClassModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentMakeupClassModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMakeupClassModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
