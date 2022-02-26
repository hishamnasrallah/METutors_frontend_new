import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupUploadDocumentsComponent } from './signup-upload-documents.component';

describe('SignupUploadDocumentsComponent', () => {
  let component: SignupUploadDocumentsComponent;
  let fixture: ComponentFixture<SignupUploadDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupUploadDocumentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupUploadDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
