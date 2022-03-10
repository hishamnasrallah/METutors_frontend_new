import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorFaqComponent } from './tutor-faq.component';

describe('TutorFaqComponent', () => {
  let component: TutorFaqComponent;
  let fixture: ComponentFixture<TutorFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorFaqComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
