import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStudyMetutorsComponent } from './home-study-metutors.component';

describe('HomeStudyMetutorsComponent', () => {
  let component: HomeStudyMetutorsComponent;
  let fixture: ComponentFixture<HomeStudyMetutorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeStudyMetutorsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeStudyMetutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
