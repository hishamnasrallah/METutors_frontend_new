import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPricesDialogComponent } from './view-prices-dialog.component';

describe('ViewPricesDialogComponent', () => {
  let component: ViewPricesDialogComponent;
  let fixture: ComponentFixture<ViewPricesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPricesDialogComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPricesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
