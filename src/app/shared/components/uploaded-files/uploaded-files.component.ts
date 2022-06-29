import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'metutors-uploaded-files',
  templateUrl: './uploaded-files.component.html',
  styleUrls: ['./uploaded-files.component.scss'],
})
export class UploadedFilesComponent implements OnInit {
  @Input() files: any;

  constructor() {}

  ngOnInit(): void {}
}
