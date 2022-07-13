import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramSubjectComponent } from './program-subject.component';

describe('ProgramSubjectComponent', () => {
  let component: ProgramSubjectComponent;
  let fixture: ComponentFixture<ProgramSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramSubjectComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
