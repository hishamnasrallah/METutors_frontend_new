import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreTutorsComponent } from './explore-tutors.component';

describe('ExploreTutorsComponent', () => {
  let component: ExploreTutorsComponent;
  let fixture: ComponentFixture<ExploreTutorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreTutorsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreTutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
