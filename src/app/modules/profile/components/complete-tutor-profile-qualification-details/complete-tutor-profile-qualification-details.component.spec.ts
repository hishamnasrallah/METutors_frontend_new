import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTutorProfileQualificationDetailsComponent } from '@metutor/modules/profile/components';

describe('CompleteTutorProfileQualificationDetailsComponent', () => {
  let component: CompleteTutorProfileQualificationDetailsComponent;
  let fixture: ComponentFixture<CompleteTutorProfileQualificationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteTutorProfileQualificationDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CompleteTutorProfileQualificationDetailsComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
