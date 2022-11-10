import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProgramStudyingDialogComponent } from './select-program-studying-dialog.component';

describe('SelectProgramStudyingDialogComponent', () => {
  let component: SelectProgramStudyingDialogComponent;
  let fixture: ComponentFixture<SelectProgramStudyingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectProgramStudyingDialogComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProgramStudyingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
