import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityTermsComponent } from './community-terms.component';

describe('CommunityTermsComponent', () => {
  let component: CommunityTermsComponent;
  let fixture: ComponentFixture<CommunityTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommunityTermsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
