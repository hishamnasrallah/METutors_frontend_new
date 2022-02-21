import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactHelpToHereComponent } from './contact-help-to-here.component';

describe('ContactHelpToHereComponent', () => {
  let component: ContactHelpToHereComponent;
  let fixture: ComponentFixture<ContactHelpToHereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactHelpToHereComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactHelpToHereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
