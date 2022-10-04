import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySlideComponent } from './study-slide.component';

describe('StudySlideComponent', () => {
  let component: StudySlideComponent;
  let fixture: ComponentFixture<StudySlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudySlideComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudySlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
