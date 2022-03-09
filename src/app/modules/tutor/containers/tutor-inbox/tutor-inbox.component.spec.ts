import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorInboxComponent } from './tutor-inbox.component';

describe('TutorInboxComponent', () => {
  let component: TutorInboxComponent;
  let fixture: ComponentFixture<TutorInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorInboxComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
