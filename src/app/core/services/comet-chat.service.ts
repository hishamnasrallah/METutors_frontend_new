/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { CometChat } from '@cometchat-pro/chat';
import { Inject, Injectable } from '@angular/core';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class CometChatService {
  user: any;

  constructor(@Inject(DOCUMENT) private _document: Document) {}

  connect(accessToken: string): void {
    CometChat.login(accessToken, environment.cometchat.authKey).then(
      user => {
        this.user = user;
      },
      error => {
        console.log('Login failed with exception:', { error });
      }
    );
  }

  // async getOrCreateConversation(
  //   receiverID: string,
  //   type = 'user'
  // ): Promise<CometChat.Conversation | undefined> {
  //   try {
  //     const result = await this.chatCheckUser(receiverID, 'pitch');

  //     if (result.success) {
  //       const conversation = await CometChat.getConversation(receiverID, type);

  //       if (conversation) {
  //         return conversation;
  //       }
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     const textMessage = new CometChat.TextMessage(
  //       receiverID,
  //       String.fromCodePoint(0x1f44b),
  //       CometChat.RECEIVER_TYPE.USER
  //     );
  //     const metadata = {
  //       receiverID,
  //       type: 'project',
  //       action: 'pitch'
  //     };

  //     textMessage.setMetadata(metadata);
  //     const sendMessage = await CometChat.sendMessage(textMessage);

  //     if (sendMessage) {
  //       const conversation = CometChat.getConversation(receiverID, type);

  //       return conversation;
  //     }
  //   }
  // }

  disconnect(): void {
    CometChat.logout().then(
      () => {
        console.log('Logout completed successfully');
      },
      error => {
        console.log('Logout failed with exception:', { error });
      }
    );
  }

  addGroupMember(
    guid: string,
    receiverID: string,
    scope = CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT
  ): void {
    const membersList = [new CometChat.GroupMember(receiverID, scope)];

    CometChat.addMembersToGroup(guid, membersList, []).then(
      () => {},
      error => {
        console.log('Something went wrong', error);
      }
    );
  }

  // chatCheckUser(userId: string, action?: string): Promise<any> {
  //   return this._chatServiceGql
  //     .checkUser(userId, action)
  //     .pipe(take(1))
  //     .toPromise();
  // }

  chatConnectUser(): Observable<any> {
    // return this._chatServiceGql.connectChat();
    return of(null);
  }

  async getUnreadMessageCount(): Promise<any> {
    return CometChat.getUnreadMessageCount();
  }
}
