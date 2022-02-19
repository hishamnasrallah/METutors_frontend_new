import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorProfileHeaderComponent } from './tutor-profile-header.component';

describe('TutorProfileHeaderComponent', () => {
  let component: TutorProfileHeaderComponent;
  let fixture: ComponentFixture<TutorProfileHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorProfileHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorProfileHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
