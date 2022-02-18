import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeaturedTutorsComponent } from './home-featured-tutors.component';

describe('HomeFeaturedTutorsComponent', () => {
  let component: HomeFeaturedTutorsComponent;
  let fixture: ComponentFixture<HomeFeaturedTutorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeFeaturedTutorsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFeaturedTutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
