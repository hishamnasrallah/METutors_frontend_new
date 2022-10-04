import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureCanvasModalComponent } from './signature-canvas-modal.component';

describe('SignatureCanvasModalComponent', () => {
  let component: SignatureCanvasModalComponent;
  let fixture: ComponentFixture<SignatureCanvasModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignatureCanvasModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatureCanvasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
