import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqStillHaveQuestionsComponent } from './faq-still-have-questions.component';

describe('FaqStillHaveQuestionsComponent', () => {
  let component: FaqStillHaveQuestionsComponent;
  let fixture: ComponentFixture<FaqStillHaveQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaqStillHaveQuestionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqStillHaveQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
