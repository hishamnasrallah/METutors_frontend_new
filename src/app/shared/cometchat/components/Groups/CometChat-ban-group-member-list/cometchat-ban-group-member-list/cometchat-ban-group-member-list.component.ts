import { BAN_ICON } from './resources/banIcon';
import * as enums from '../../../../utils/enums';
import { logger } from '../../../../utils/common';
import {
  Input,
  OnInit,
  Output,
  Component,
  OnChanges,
  EventEmitter,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'cometchat-ban-group-member-list',
  templateUrl: './cometchat-ban-group-member-list.component.html',
  styleUrls: ['./cometchat-ban-group-member-list.component.css']
})
export class CometChatBanGroupMemberListComponent implements OnInit, OnChanges {
  @Input() item = null;
  @Input() member: any = null;
  @Input() loggedInUser = null;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  name: string = '';
  banIcon = BAN_ICON;

  constructor() {}
  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit() {}

  /**
   * propagates and action to unaban the current member
   */
  unbanMember() {
    try {
      this.actionGenerated.emit({
        type: enums.UNBAN,
        payLoad: { member: this.member }
      });
    } catch (error) {
      logger(error);
    }
  }
}
