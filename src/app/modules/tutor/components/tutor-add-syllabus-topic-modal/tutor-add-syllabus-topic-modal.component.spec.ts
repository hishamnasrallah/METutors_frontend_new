import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorAddSyllabusTopicModalComponent } from './tutor-add-syllabus-topic-modal.component';

describe('TutorAddSyllabusTopicModalComponent', () => {
  let component: TutorAddSyllabusTopicModalComponent;
  let fixture: ComponentFixture<TutorAddSyllabusTopicModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorAddSyllabusTopicModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorAddSyllabusTopicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
