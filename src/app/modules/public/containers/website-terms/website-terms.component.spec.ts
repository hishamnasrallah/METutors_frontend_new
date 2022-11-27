import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteTermsComponent } from './website-terms.component';

describe('WebsiteTermsComponent', () => {
  let component: WebsiteTermsComponent;
  let fixture: ComponentFixture<WebsiteTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebsiteTermsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
