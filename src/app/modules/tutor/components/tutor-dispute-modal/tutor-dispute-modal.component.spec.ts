import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorDisputeModalComponent } from './tutor-dispute-modal.component';

describe('TutorDisputeModalComponent', () => {
  let component: TutorDisputeModalComponent;
  let fixture: ComponentFixture<TutorDisputeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorDisputeModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorDisputeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
