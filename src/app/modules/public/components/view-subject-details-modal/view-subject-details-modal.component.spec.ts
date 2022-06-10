import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubjectDetailsModalComponent } from './view-subject-details-modal.component';

describe('ViewSubjectDetailsModalComponent', () => {
  let component: ViewSubjectDetailsModalComponent;
  let fixture: ComponentFixture<ViewSubjectDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSubjectDetailsModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubjectDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
