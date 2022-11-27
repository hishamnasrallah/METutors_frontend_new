import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsSidebarComponent } from './terms-sidebar.component';

describe('TermsSidebarComponent', () => {
  let component: TermsSidebarComponent;
  let fixture: ComponentFixture<TermsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TermsSidebarComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
