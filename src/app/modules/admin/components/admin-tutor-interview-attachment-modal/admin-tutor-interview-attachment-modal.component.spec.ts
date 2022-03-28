import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTutorInterviewAttachmentModalComponent } from './admin-tutor-interview-attachment-modal.component';

describe('AdminTutorInterviewAttachmentModalComponent', () => {
  let component: AdminTutorInterviewAttachmentModalComponent;
  let fixture: ComponentFixture<AdminTutorInterviewAttachmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTutorInterviewAttachmentModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      AdminTutorInterviewAttachmentModalComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
