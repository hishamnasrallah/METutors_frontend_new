import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorProfileSpecializationComponent } from './tutor-profile-specialization.component';

describe('TutorProfileSpecializationComponent', () => {
  let component: TutorProfileSpecializationComponent;
  let fixture: ComponentFixture<TutorProfileSpecializationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorProfileSpecializationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorProfileSpecializationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
