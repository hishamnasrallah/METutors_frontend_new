import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTutorListComponent } from './admin-tutor-list.component';

describe('AdminTutorListComponent', () => {
  let component: AdminTutorListComponent;
  let fixture: ComponentFixture<AdminTutorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTutorListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTutorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
