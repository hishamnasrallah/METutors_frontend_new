import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'metutors-uploaded-files',
  templateUrl: './uploaded-files.component.html',
  styleUrls: ['./uploaded-files.component.scss'],
})
export class UploadedFilesComponent implements OnInit {
  @Input() files: any;
  @Input() showDeleteFile = false;
  @Input() showDownloadFile = true;
  @Input() extraClasses = 'col-md-4';

  @Output() deleteFile: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}
}
