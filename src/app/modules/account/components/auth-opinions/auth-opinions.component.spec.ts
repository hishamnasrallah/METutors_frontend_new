import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthOpinionsComponent } from './auth-opinions.component';

describe('AuthOpinionsComponent', () => {
  let component: AuthOpinionsComponent;
  let fixture: ComponentFixture<AuthOpinionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthOpinionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthOpinionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
