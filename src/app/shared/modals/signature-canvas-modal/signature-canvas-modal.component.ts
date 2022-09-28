import { SignaturePad } from 'angular2-signaturepad';

import {
  OnInit,
  Input,
  Output,
  Inject,
  Component,
  OnChanges,
  ViewChild,
  EventEmitter,
  AfterViewInit,
  SimpleChanges,
} from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'metutors-signature-canvas-modal',
  template: '',
})
export class SignatureCanvasModalComponent implements OnInit, OnChanges {
  @Input() url = '';
  @Input() showModal = false;

  @Output() closeModal = new EventEmitter();
  @Output() signature: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showModal'] && changes['showModal']?.currentValue) {
      const dialogRef = this.dialog.open(SignatureCanvasTemplateComponent, {
        width: '500px',
        data: this.url,
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.closeModal.emit();
        this.signature.emit(dialogRef.componentInstance.signature);
      });
    }
  }
}

@Component({
  selector: 'metutors-signature-canvas-template',
  templateUrl: './signature-canvas-modal.component.html',
  styleUrls: ['./signature-canvas-modal.component.scss'],
})
export class SignatureCanvasTemplateComponent implements OnInit, AfterViewInit {
  url: string;
  signature: string;

  constructor(
    public dialogRef: MatDialogRef<SignatureCanvasTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.url = data;
    }
  }

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  signaturePadOptions: Object = {
    minWidth: 5,
    canvasWidth: 400,
    canvasHeight: 300,
  };

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.signaturePad?.set('minWidth', 2);
    this.signaturePad?.clear();
  }

  onInsertSignature(): void {
    this.signature = this.signaturePad.toDataURL();
    this.dialogRef.close();
  }
}
