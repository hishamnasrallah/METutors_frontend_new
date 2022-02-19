import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovingOpportunitiesComponent } from './loving-opportunities.component';

describe('LovingOpportunitiesComponent', () => {
  let component: LovingOpportunitiesComponent;
  let fixture: ComponentFixture<LovingOpportunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LovingOpportunitiesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LovingOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
