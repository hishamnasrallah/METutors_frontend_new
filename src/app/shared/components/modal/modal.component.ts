import {
  Inject,
  Input,
  OnInit,
  Output,
  Component,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
  TemplateRef,
} from '@angular/core';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export const modalSize = {
  small: '250px',
  medium: '500px',
  large: '1000px',
};

@Component({
  selector: 'metutors-modal',
  template: '',
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() heading = '';
  @Input() subHeading = '';
  @Input() size = 'medium';
  @Input() showModal: boolean;
  @Input() template: TemplateRef<any>;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showModal'] && changes['showModal']?.currentValue) {
      const dialogRef = this.dialog.open(ModalComponentTemplate, {
        disableClose: true,
        width: modalSize[this.size],
        data: {
          heading: this.heading,
          template: this.template,
          subHeading: this.subHeading,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.closeModal.emit();
      });
    } else {
      this.dialog.closeAll();
    }
  }
}

@Component({
  selector: 'metutors-modal-template',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponentTemplate implements OnInit {
  heading: string;
  subHeading: string;
  template: TemplateRef<any>;

  constructor(
    public dialogRef: MatDialogRef<ModalComponentTemplate>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.heading = this.data.heading;
    this.template = this.data.template;
    this.subHeading = this.data.subHeading;
  }
}
