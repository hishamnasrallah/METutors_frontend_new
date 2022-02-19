import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesSlideComponent } from './languages-slide.component';

describe('LanguagesSlideComponent', () => {
  let component: LanguagesSlideComponent;
  let fixture: ComponentFixture<LanguagesSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguagesSlideComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
