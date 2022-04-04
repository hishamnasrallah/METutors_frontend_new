import {
  Inject,
  Input,
  OnInit,
  Output,
  Component,
  OnDestroy,
  TemplateRef,
  EventEmitter,
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
export class ModalComponent implements OnInit, OnDestroy {
  @Input() status = '';
  @Input() heading = '';
  @Input() subHeading = '';
  @Input() size = 'medium';
  @Input() showHeader = true;
  @Input() showModal: boolean;
  @Input() showEditIcon = false;
  @Input() showDeleteIcon = false;
  @Input() template: TemplateRef<any>;
  @Input() isDeletingAssignment = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() editClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.showModal) {
      const dialogRef = this.dialog.open(ModalComponentTemplate, {
        disableClose: true,
        width: modalSize[this.size],
        data: {
          status: this.status,
          heading: this.heading,
          template: this.template,
          showHeader: this.showHeader,
          subHeading: this.subHeading,
          showEditIcon: this.showEditIcon,
          showDeleteIcon: this.showDeleteIcon,
          isDeletingAssignment: this.isDeletingAssignment,
        },
      });

      dialogRef.afterClosed().subscribe(() => {
        this.closeModal.emit();
      });

      dialogRef.componentInstance.editClicked.subscribe(() => {
        this.editClicked.emit();
      });

      dialogRef.componentInstance.deleteClicked.subscribe(() => {
        this.deleteClicked.emit();
      });
    } else {
      this.dialog.closeAll();
    }
  }

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
  showEditIcon: boolean;
  showDeleteIcon: boolean;
  template: TemplateRef<any>;
  isDeletingAssignment: boolean;

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
    this.showEditIcon = this.data.showEditIcon;
    this.showDeleteIcon = this.data.showDeleteIcon;
    this.isDeletingAssignment = this.data.isDeletingAssignment;
  }
}
