import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocViewerModalComponent } from '@metutor/shared/modals';

describe('DocViewerModalComponent', () => {
  let component: DocViewerModalComponent;
  let fixture: ComponentFixture<DocViewerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocViewerModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocViewerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
