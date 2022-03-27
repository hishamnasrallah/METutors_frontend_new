import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedFilesListComponent } from '@metutor/shared/components';

describe('UploadedFilesListComponent', () => {
  let component: UploadedFilesListComponent;
  let fixture: ComponentFixture<UploadedFilesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadedFilesListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedFilesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
