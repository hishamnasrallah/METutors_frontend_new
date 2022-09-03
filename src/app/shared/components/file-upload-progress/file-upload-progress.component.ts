import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-file-upload-progress',
  templateUrl: './file-upload-progress.component.html',
  styleUrls: ['./file-upload-progress.component.scss'],
})
export class FileUploadProgressComponent implements OnInit {
  @Input() fileType = 'file';
  @Input() fileName: string;
  @Input() cancelUpload: boolean;
  @Input() uploadedPercentage = 0;

  @Output() onCancelUpload: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
