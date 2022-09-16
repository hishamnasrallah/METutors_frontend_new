import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStudyMoreReadMoreComponent } from './home-study-more-read-more.component';

describe('HomeStudyMoreReadMoreComponent', () => {
  let component: HomeStudyMoreReadMoreComponent;
  let fixture: ComponentFixture<HomeStudyMoreReadMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeStudyMoreReadMoreComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeStudyMoreReadMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
