import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangeStatusModalComponent } from './admin-change-status-modal.component';

describe('ChangeTicketStatusModalComponent', () => {
  let component: AdminChangeStatusModalComponent;
  let fixture: ComponentFixture<AdminChangeStatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminChangeStatusModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChangeStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
