import * as enums from '../../../../utils/enums';
import { logger } from '../../../../utils/common';
import { COMETCHAT_CONSTANTS } from '../../../../utils/messageConstants';
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
  selector: 'cometchat-user-details',
  templateUrl: './cometchat-user-details.component.html',
  styleUrls: ['./cometchat-user-details.component.css']
})
export class CometChatUserDetailsComponent implements OnInit, OnChanges {
  @Input() item = null;
  @Input() type: string = '';

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  blockUserText: string = '';
  OPTIONS: String = COMETCHAT_CONSTANTS.OPTIONS;
  DETAILS: String = COMETCHAT_CONSTANTS.DETAILS;

  constructor() {}

  ngOnChanges(change: SimpleChanges) {
    try {
      if (change[enums.ITEM]) {
        this.getBlockStatus(change[enums.ITEM].currentValue);
      }
    } catch (error) {
      logger(error);
    }
  }
  ngOnInit() {}

  /**
   * Gets Status If user is Blocked/Unblocked
   * @param
   */
  getBlockStatus(item: any) {
    try {
      if (item.blockedByMe) {
        this.blockUserText = COMETCHAT_CONSTANTS.UNBLOCK_USER;
      } else {
        this.blockUserText = COMETCHAT_CONSTANTS.BLOCK_USER;
      }
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Toggle Block/Unblock
   */
  toggleBlockUser() {
    try {
      if (this.blockUserText === COMETCHAT_CONSTANTS.BLOCK_USER) {
        this.actionGenerated.emit({
          type: enums.BLOCK_USER
        });
      } else if (this.blockUserText === COMETCHAT_CONSTANTS.UNBLOCK_USER) {
        this.actionGenerated.emit({
          type: enums.UNBLOCK_USER
        });
      }
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Close thread when opened in small screen
   */
  closeThreadView() {
    try {
      this.actionGenerated.emit({
        type: enums.CLOSE_DETAIL_CLICKED
      });
    } catch (error) {
      logger(error);
    }
  }
}
