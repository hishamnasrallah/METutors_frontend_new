import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTutorProfilePersonalInformationComponent } from './complete-tutor-profile-personal-information.component';

describe('CompleteTutorProfilePersonalInformationComponent', () => {
  let component: CompleteTutorProfilePersonalInformationComponent;
  let fixture: ComponentFixture<CompleteTutorProfilePersonalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteTutorProfilePersonalInformationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CompleteTutorProfilePersonalInformationComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
