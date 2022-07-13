import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramFieldOfStudyComponent } from './program-field-of-study.component';

describe('ProgramFieldOfStudyComponent', () => {
  let component: ProgramFieldOfStudyComponent;
  let fixture: ComponentFixture<ProgramFieldOfStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramFieldOfStudyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramFieldOfStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
