import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
// import { UserType } from '@ureed/config';
// import * as fromCore from '@ureed/core/state';
import { DOCUMENT, Location } from '@angular/common';
// import { CometChatService } from '@ureed/core/services';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-comet-chat',
  templateUrl: './comet-chat.component.html',
  styleUrls: ['./comet-chat.component.scss']
})
export class CometChatComponent implements OnInit, OnDestroy {
  group: any = null;

  constructor(
    private _store: Store,
    private _location: Location,
    // private _cometChatService: CometChatService,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  async ngOnInit(): Promise<void> {
    // this._store.dispatch(
    //   fromCore.setMetaTags({
    //     tags: {
    //       title: 'Inbox',
    //     },
    //   })
    // );
    /*
    this._document.getElementsByTagName('html')[0].classList.add('cometchat');
    const state: any = this._location.getState();

    if (state && state.project && state.freelancer) {
      const user = await this._store
        .select(fromCore.selectCurrentLoggedInUser)
        .pipe(take(1))
        .toPromise();

      if (user) {
        const isEmployer = user?.userType === UserType.employer;

        const receiverID = isEmployer
          ? state.freelancer.user.id
          : state.project.employer.user.id;

        const conversation =
          await this._cometChatService.getOrCreateConversation(receiverID);

        if (conversation) {
          this.group = conversation.getConversationWith();
        }
      }
    }

    if (state && state.service && state.freelancer) {
      const user = await this._store
        .select(fromCore.selectCurrentLoggedInUser)
        .pipe(take(1))
        .toPromise();

      const employer = await this._store
        .select(fromCore.selectEmployer)
        .pipe(take(1))
        .toPromise();

      if (user) {
        const group = await this._cometChatService.getOrCreateServiceGroup(
          state.service,
          state.freelancer,
          user
        );

        if (group) {
          this.group = group;

          if (employer?.hasCompany) {
            this._store.dispatch(
              fromCore.addCompanyMemberCometChat({
                serviceId: state.service?.id,
              })
            );
          }
        }
      }
    }*/
  }

  ngOnDestroy(): void {
    this._document
      .getElementsByTagName('html')[0]
      .classList.remove('cometchat');
  }
}
