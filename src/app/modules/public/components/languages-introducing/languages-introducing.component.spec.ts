import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesIntroducingComponent } from './languages-introducing.component';

describe('LanguagesIntroducingComponent', () => {
  let component: LanguagesIntroducingComponent;
  let fixture: ComponentFixture<LanguagesIntroducingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguagesIntroducingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesIntroducingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
