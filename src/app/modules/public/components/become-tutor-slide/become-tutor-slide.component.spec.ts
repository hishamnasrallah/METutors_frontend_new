import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeTutorSlideComponent } from './become-tutor-slide.component';

describe('BecomeTutorSlideComponent', () => {
  let component: BecomeTutorSlideComponent;
  let fixture: ComponentFixture<BecomeTutorSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BecomeTutorSlideComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeTutorSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
