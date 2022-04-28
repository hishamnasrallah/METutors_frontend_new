import {
  Inject,
  Input,
  OnInit,
  Output,
  Component,
  OnDestroy,
  OnChanges,
  TemplateRef,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export const modalSize = {
  small: '250px',
  medium: '500px',
  xmedium: '750px',
  large: '1000px',
};

@Component({
  selector: 'metutors-modal',
  template: '',
})
export class ModalComponent implements OnInit, OnDestroy, OnChanges {
  @Input() status = '';
  @Input() heading = '';
  @Input() subHeading = '';
  @Input() size = 'medium';
  @Input() showHeader = true;
  @Input() showModal: boolean;
  @Input() template: TemplateRef<any>;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes?.['showModal'] && changes?.['showModal']?.currentValue) ||
      (changes?.['heading'] && changes?.['heading']?.currentValue) ||
      (changes?.['subHeading'] && changes?.['subHeading']?.currentValue)
    ) {
      const dialogRef = this.dialog.open(ModalComponentTemplate, {
        disableClose: true,
        width: modalSize[this.size],
        data: {
          status: this.status,
          heading: this.heading,
          template: this.template,
          showHeader: this.showHeader,
          subHeading: this.subHeading,
        },
      });

      dialogRef.afterClosed().subscribe(() => {
        this.closeModal.emit();
      });
    }
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.dialog.closeAll();
  }
}

@Component({
  selector: 'metutors-modal-template',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponentTemplate implements OnInit {
  status: string;
  heading: string;
  subHeading: string;
  showHeader: boolean;
  template: TemplateRef<any>;

  @Output() editClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<ModalComponentTemplate>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.status = this.data.status;
    this.heading = this.data.heading;
    this.template = this.data.template;
    this.subHeading = this.data.subHeading;
    this.showHeader = this.data.showHeader;
  }
}
