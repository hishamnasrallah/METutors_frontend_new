import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAddHighlightedTopicModalComponent } from './student-add-highlighted-topic-modal.component';

describe('StudentAddHighlightedTopicModalComponent', () => {
  let component: StudentAddHighlightedTopicModalComponent;
  let fixture: ComponentFixture<StudentAddHighlightedTopicModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentAddHighlightedTopicModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAddHighlightedTopicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
