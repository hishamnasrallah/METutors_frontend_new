import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTutorInterviewComponent } from './admin-tutor-interview.component';

describe('AdminTutorInterviewComponent', () => {
  let component: AdminTutorInterviewComponent;
  let fixture: ComponentFixture<AdminTutorInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTutorInterviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTutorInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
