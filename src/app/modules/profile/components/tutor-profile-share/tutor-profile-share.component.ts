import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertNotificationService } from 'src/app/core/components';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'metutors-tutor-profile-share',
  templateUrl: './tutor-profile-share.component.html',
  styleUrls: ['./tutor-profile-share.component.scss'],
})
export class TutorProfileShareComponent implements OnInit {
  defaultUrl?: string;
  clientUrl = environment.clientUrl;

  constructor(
    private _router: Router,
    private _alertNotificationService: AlertNotificationService
  ) {}

  ngOnInit(): void {
    this.defaultUrl = this._router.url;
  }

  cloneText(inputElement: {
    select: () => void;
    setSelectionRange: (arg0: number, arg1: number) => void;
  }) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this._alertNotificationService.info('Copied to clipboard');
  }
}
