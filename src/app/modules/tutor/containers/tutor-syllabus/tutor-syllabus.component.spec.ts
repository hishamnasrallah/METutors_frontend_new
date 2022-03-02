import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorSyllabusComponent } from './tutor-syllabus.component';

describe('TutorSyllabusComponent', () => {
  let component: TutorSyllabusComponent;
  let fixture: ComponentFixture<TutorSyllabusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorSyllabusComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorSyllabusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
