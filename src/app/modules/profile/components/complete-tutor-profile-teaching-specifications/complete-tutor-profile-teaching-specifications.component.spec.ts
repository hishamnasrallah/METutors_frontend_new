import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTutorProfileTeachingSpecificationsComponent } from './complete-tutor-profile-teaching-specifications.component';

describe('CompleteTutorProfileTeachingSpecificationsComponent', () => {
  let component: CompleteTutorProfileTeachingSpecificationsComponent;
  let fixture: ComponentFixture<CompleteTutorProfileTeachingSpecificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteTutorProfileTeachingSpecificationsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CompleteTutorProfileTeachingSpecificationsComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
