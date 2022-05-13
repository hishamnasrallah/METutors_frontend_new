import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTutorsListModalComponent } from './admin-tutors-list-modal.component';

describe('AdminTutorsListModalComponent', () => {
  let component: AdminTutorsListModalComponent;
  let fixture: ComponentFixture<AdminTutorsListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTutorsListModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTutorsListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
