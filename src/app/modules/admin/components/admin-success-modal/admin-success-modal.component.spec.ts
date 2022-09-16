import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSuccessModalComponent } from './admin-success-modal.component';

describe('AdminSuccessModalComponent', () => {
  let component: AdminSuccessModalComponent;
  let fixture: ComponentFixture<AdminSuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSuccessModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
