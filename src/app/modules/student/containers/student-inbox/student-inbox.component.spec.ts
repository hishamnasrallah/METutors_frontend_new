import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInboxComponent } from './student-inbox.component';

describe('StudentInboxComponent', () => {
  let component: StudentInboxComponent;
  let fixture: ComponentFixture<StudentInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentInboxComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
