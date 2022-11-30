import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreHeadingComponent } from './explore-heading.component';

describe('ExploreHeadingComponent', () => {
  let component: ExploreHeadingComponent;
  let fixture: ComponentFixture<ExploreHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreHeadingComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
