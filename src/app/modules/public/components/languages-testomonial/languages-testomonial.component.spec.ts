import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesTestomonialComponent } from './languages-testomonial.component';

describe('LanguagesTestomonialComponent', () => {
  let component: LanguagesTestomonialComponent;
  let fixture: ComponentFixture<LanguagesTestomonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguagesTestomonialComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesTestomonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
