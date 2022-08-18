import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-file-upload-progress',
  templateUrl: './file-upload-progress.component.html',
  styleUrls: ['./file-upload-progress.component.scss'],
})
export class FileUploadProgressComponent implements OnInit {
  @Input() fileType = 'file';
  @Input() fileName: string;
  @Input() uploadedPercentage = 0;

  constructor() {}

  ngOnInit(): void {}
}
