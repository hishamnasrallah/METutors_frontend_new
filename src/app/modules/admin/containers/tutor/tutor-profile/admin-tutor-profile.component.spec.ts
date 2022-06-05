import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTutorProfileComponent } from './admin-tutor-profile.component';

describe('AdminTutorProfileComponent', () => {
  let component: AdminTutorProfileComponent;
  let fixture: ComponentFixture<AdminTutorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTutorProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTutorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
