import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTutorInterviewDetailsComponent } from './admin-tutor-interview-details.component';

describe('AdminTutorInterviewDetailsComponent', () => {
  let component: AdminTutorInterviewDetailsComponent;
  let fixture: ComponentFixture<AdminTutorInterviewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTutorInterviewDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTutorInterviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
