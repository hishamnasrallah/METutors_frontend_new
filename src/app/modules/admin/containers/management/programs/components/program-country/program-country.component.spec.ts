import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramCountryComponent } from './program-country.component';

describe('ProgramCountryComponent', () => {
  let component: ProgramCountryComponent;
  let fixture: ComponentFixture<ProgramCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramCountryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
