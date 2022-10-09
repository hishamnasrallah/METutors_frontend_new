import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorResourcesUploadDocumentModalComponent } from './tutor-resources-upload-document-modal.component';

describe('TutorResourcesUploadDocumentModalComponent', () => {
  let component: TutorResourcesUploadDocumentModalComponent;
  let fixture: ComponentFixture<TutorResourcesUploadDocumentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorResourcesUploadDocumentModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      TutorResourcesUploadDocumentModalComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
