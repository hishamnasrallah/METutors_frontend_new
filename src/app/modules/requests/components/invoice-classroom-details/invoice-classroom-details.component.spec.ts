import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceClassroomDetailsComponent } from './invoice-classroom-details.component';

describe('InvoiceClassroomDetailsComponent', () => {
  let component: InvoiceClassroomDetailsComponent;
  let fixture: ComponentFixture<InvoiceClassroomDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceClassroomDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceClassroomDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
