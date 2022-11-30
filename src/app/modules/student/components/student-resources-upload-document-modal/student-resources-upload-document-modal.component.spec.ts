import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentResourcesUploadDocumentModalComponent } from './student-resources-upload-document-modal.component';

describe('StudentResourcesUploadDocumentModalComponent', () => {
  let component: StudentResourcesUploadDocumentModalComponent;
  let fixture: ComponentFixture<StudentResourcesUploadDocumentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentResourcesUploadDocumentModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      StudentResourcesUploadDocumentModalComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
