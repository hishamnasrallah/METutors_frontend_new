import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionalOpportunitiesComponent } from './exceptional-opportunities.component';

describe('ExceptionalOpportunitiesComponent', () => {
  let component: ExceptionalOpportunitiesComponent;
  let fixture: ComponentFixture<ExceptionalOpportunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExceptionalOpportunitiesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceptionalOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
