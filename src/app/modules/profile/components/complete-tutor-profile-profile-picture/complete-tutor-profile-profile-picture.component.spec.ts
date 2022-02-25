import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTutorProfileProfilePictureComponent } from './complete-tutor-profile-profile-picture.component';

describe('CompleteTutorProfileProfilePictureComponent', () => {
  let component: CompleteTutorProfileProfilePictureComponent;
  let fixture: ComponentFixture<CompleteTutorProfileProfilePictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteTutorProfileProfilePictureComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CompleteTutorProfileProfilePictureComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
