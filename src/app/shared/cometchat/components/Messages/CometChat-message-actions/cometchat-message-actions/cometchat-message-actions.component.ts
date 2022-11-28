import { CometChat } from '@cometchat-pro/chat';
import * as enums from '../../../../utils/enums';
import { logger } from '../../../../utils/common';
import { REACTION_ICON } from './resources/reaction';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cometchat-message-actions',
  templateUrl: './cometchat-message-actions.component.html',
  styleUrls: ['./cometchat-message-actions.component.css']
})
export class CometChatMessageActionsComponent implements OnInit {
  @Input() pollView: boolean = false;
  @Input() messageDetails: any = null;
  @Input() showToolTip: boolean = true;

  @Output() actionGenerated: EventEmitter<any> = new EventEmitter();

  loggedInUser: any;
  DIRECT_CALL = 'DIRECT_CALL';
  threadView: boolean = false;
  reactionIcon = REACTION_ICON;
  showReplyOption: boolean = true;
  receivedMessage: boolean = false;
  showOnlyReplyButton: boolean = false;
  MESSAGE_TYPE_TEXT: String = CometChat.MESSAGE_TYPE.TEXT;

  constructor() {}

  ngOnInit() {
    try {
      if (this.messageDetails.hasOwnProperty(enums.PARENT_MESSAGE_ID)) {
        //you cannot reply any message inside thread window
        this.showReplyOption = false;
        this.threadView = true;
      }

      let user = CometChat.getLoggedinUser().then(user => {
        this.loggedInUser = user;

        //for the message that is received , only show the reply button in tooltip
        if (this.messageDetails.sender.uid !== this.loggedInUser.uid) {
          this.showOnlyReplyButton = true;
          this.receivedMessage = true;
        }
      });
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Generates an action to reply to the current message
   *
   */
  replyToMessage() {
    try {
      this.actionGenerated.emit({
        type: enums.VIEW_MESSAGE_THREAD,
        payLoad: this.messageDetails
      });
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Generates an action to edit  the current message
   *
   */
  editMessage() {
    try {
      this.actionGenerated.emit({
        type: enums.EDIT_MESSAGE,
        payLoad: this.messageDetails
      });
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Generates an action to Delete  the current message
   *
   */
  deleteMessage() {
    try {
      this.actionGenerated.emit({
        type: enums.DELETE_MESSAGE,
        payLoad: this.messageDetails
      });
    } catch (error) {
      logger(error);
    }
  }

  /**
   * Generates an action to send Regular Reactions the current message
   *
   */
  sendReaction() {
    try {
      this.actionGenerated.emit({
        type: enums.REACT_TO_MESSAGE,
        payLoad: this.messageDetails
      });
    } catch (error) {
      logger(error);
    }
  }
}
