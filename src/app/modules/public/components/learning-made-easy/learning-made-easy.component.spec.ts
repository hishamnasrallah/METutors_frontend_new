import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningMadeEasyComponent } from './learning-made-easy.component';

describe('LearningMadeEasyComponent', () => {
  let component: LearningMadeEasyComponent;
  let fixture: ComponentFixture<LearningMadeEasyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningMadeEasyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningMadeEasyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
