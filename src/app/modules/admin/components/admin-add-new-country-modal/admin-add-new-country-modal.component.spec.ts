import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddNewCountryModalComponent } from './admin-add-new-country-modal.component';

describe('AdminAddNewCountryModalComponent', () => {
  let component: AdminAddNewCountryModalComponent;
  let fixture: ComponentFixture<AdminAddNewCountryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAddNewCountryModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddNewCountryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
