import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWorkforceCapacityComponent } from './admin-workforce-capacity.component';

describe('AdminWorkforceCapacityComponent', () => {
  let component: AdminWorkforceCapacityComponent;
  let fixture: ComponentFixture<AdminWorkforceCapacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminWorkforceCapacityComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWorkforceCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
