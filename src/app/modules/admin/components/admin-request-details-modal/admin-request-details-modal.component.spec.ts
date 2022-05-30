import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestDetailsModalComponent } from './admin-request-details-modal.component';

describe('AdminRequestDetailsModalComponent', () => {
  let component: AdminRequestDetailsModalComponent;
  let fixture: ComponentFixture<AdminRequestDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRequestDetailsModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRequestDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
