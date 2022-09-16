import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorProfileVideoPreviewComponent } from './tutor-profile-video-preview.component';

describe('TutorProfileVideoPreviewComponent', () => {
  let component: TutorProfileVideoPreviewComponent;
  let fixture: ComponentFixture<TutorProfileVideoPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorProfileVideoPreviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorProfileVideoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
