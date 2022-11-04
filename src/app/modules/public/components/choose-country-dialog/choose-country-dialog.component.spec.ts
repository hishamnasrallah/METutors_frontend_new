import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCountryDialogComponent } from './choose-country-dialog.component';

describe('ChooseCountryDialogComponent', () => {
  let component: ChooseCountryDialogComponent;
  let fixture: ComponentFixture<ChooseCountryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseCountryDialogComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCountryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
