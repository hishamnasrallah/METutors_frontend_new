import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportFiltersComponent } from './support-filters.component';

describe('SupportFiltersComponent', () => {
  let component: SupportFiltersComponent;
  let fixture: ComponentFixture<SupportFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportFiltersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
