import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFieldOfStudyComponent } from './admin-field-of-study.component';

describe('AdminFieldOfStudyComponent', () => {
  let component: AdminFieldOfStudyComponent;
  let fixture: ComponentFixture<AdminFieldOfStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFieldOfStudyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFieldOfStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
