import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorCompleteProfileFirstScreenComponent } from './tutor-complete-profile-first-screen.component';

describe('TutorCompleteProfileFirstScreenComponent', () => {
  let component: TutorCompleteProfileFirstScreenComponent;
  let fixture: ComponentFixture<TutorCompleteProfileFirstScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorCompleteProfileFirstScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorCompleteProfileFirstScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
