import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorTermsComponent } from './tutor-terms.component';

describe('TutorTermsComponent', () => {
  let component: TutorTermsComponent;
  let fixture: ComponentFixture<TutorTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorTermsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
