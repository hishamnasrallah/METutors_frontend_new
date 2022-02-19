import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTutorProfileComponent } from './complete-tutor-profile.component';

describe('CompleteTutorProfileComponent', () => {
  let component: CompleteTutorProfileComponent;
  let fixture: ComponentFixture<CompleteTutorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteTutorProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteTutorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
