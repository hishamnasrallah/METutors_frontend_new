import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent implements OnInit {
  @Input() width = 25;
  @Input() height = 25;
  @Input() name?: string;
  @Input() rating: number;
  @Input() avatar: string;
  @Input() routerLink: any[] | null;
  @Input() type: 'small' | 'medium' | 'large' = 'small';

  constructor() {}

  ngOnInit(): void {}
}
