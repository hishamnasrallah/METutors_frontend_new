import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorProfileLanguagesComponent } from './tutor-profile-languages.component';

describe('TutorProfileLanguagesComponent', () => {
  let component: TutorProfileLanguagesComponent;
  let fixture: ComponentFixture<TutorProfileLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorProfileLanguagesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorProfileLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
