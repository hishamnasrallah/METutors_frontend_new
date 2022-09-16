import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeServicesFeaturesComponent } from './home-services-features.component';

describe('HomeServicesFeaturesComponent', () => {
  let component: HomeServicesFeaturesComponent;
  let fixture: ComponentFixture<HomeServicesFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeServicesFeaturesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeServicesFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
