import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorTermsConditionsComponent } from './tutor-terms-conditions.component';

describe('TutorTermsConditionsComponent', () => {
  let component: TutorTermsConditionsComponent;
  let fixture: ComponentFixture<TutorTermsConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorTermsConditionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorTermsConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
