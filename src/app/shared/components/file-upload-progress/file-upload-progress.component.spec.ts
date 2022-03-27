import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadProgressComponent } from '@metutor/shared/components';

describe('FileUploadProgressComponent', () => {
  let component: FileUploadProgressComponent;
  let fixture: ComponentFixture<FileUploadProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileUploadProgressComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
