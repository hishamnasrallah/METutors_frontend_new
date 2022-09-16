import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportStatsCardComponent } from './support-stats-card.component';

describe('SupportStatsCardComponent', () => {
  let component: SupportStatsCardComponent;
  let fixture: ComponentFixture<SupportStatsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupportStatsCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportStatsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
