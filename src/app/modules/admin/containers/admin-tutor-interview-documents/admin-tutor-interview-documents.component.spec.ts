import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTutorInterviewDocumentsComponent } from './admin-tutor-interview-documents.component';

describe('AdminTutorInterviewDocumentsComponent', () => {
  let component: AdminTutorInterviewDocumentsComponent;
  let fixture: ComponentFixture<AdminTutorInterviewDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTutorInterviewDocumentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTutorInterviewDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
