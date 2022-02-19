import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FounderTeamComponent } from './founder-team.component';

describe('FounderTeamComponent', () => {
  let component: FounderTeamComponent;
  let fixture: ComponentFixture<FounderTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FounderTeamComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FounderTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
