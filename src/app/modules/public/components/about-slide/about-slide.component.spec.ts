import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSlideComponent } from './about-slide.component';

describe('AboutSlideComponent', () => {
  let component: AboutSlideComponent;
  let fixture: ComponentFixture<AboutSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutSlideComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
