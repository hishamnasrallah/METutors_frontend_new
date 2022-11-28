import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '@metutor/state';
import { IUser } from '@metutor/core/models';
import * as fromCore from '@metutor/core/state';
import { DOCUMENT, Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { CometChatService } from '@metutor/shared/cometchat/utils/cometchat.service';

@Component({
  selector: 'metutors-student-inbox',
  templateUrl: './student-inbox.component.html',
  styleUrls: ['./student-inbox.component.scss']
})
export class StudentInboxComponent implements OnInit {
  layout$: any;
  user$: Observable<IUser | null>;
  group: any = null;

  constructor(
    private _store: Store<any>,
    private _location: Location,
    private _cometChatService: CometChatService,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this._store.dispatch(fromCore.loadStudentCertificates());

    this.layout$ = this._store.select(fromRoot.selectLayout);
    this.user$ = this._store.select(fromCore.selectUser);
  }

  async ngOnInit(): Promise<void> {
    // this._store.dispatch(
    //   fromCore.setMetaTags({
    //     tags: {
    //       title: 'Inbox'
    //     }
    //   })
    // );

    this._document.getElementsByTagName('html')[0].classList.add('cometchat');
    const state: any = this._location.getState();

    // if (state && state.project && state.freelancer) {
    //   const user = await this._store
    //     .select(fromCore.selectCurrentLoggedInUser)
    //     .pipe(take(1))
    //     .toPromise();

    //   if (user) {
    //     const isEmployer = user?.userType === UserType.employer;

    //     const receiverID = isEmployer
    //       ? state.freelancer.user.id
    //       : state.project.employer.user.id;

    //     const conversation = await this._cometChatService.getOrCreateConversation(
    //       receiverID
    //     );

    //     if (conversation) {
    //       this.group = conversation.getConversationWith();
    //     }
    //   }
    // }

    // if (state && state.service && state.freelancer) {
    //   const user = await this._store
    //     .select(fromCore.selectCurrentLoggedInUser)
    //     .pipe(take(1))
    //     .toPromise();

    //   const employer = await this._store
    //     .select(fromCore.selectEmployer)
    //     .pipe(take(1))
    //     .toPromise();

    //   if (user) {
    //     const group = await this._cometChatService.getOrCreateServiceGroup(
    //       state.service,
    //       state.freelancer,
    //       user
    //     );

    //     if (group) {
    //       this.group = group;

    //       if (employer?.hasCompany) {
    //         this._store.dispatch(
    //           fromCore.addCompanyMemberCometChat({
    //             serviceId: state.service?.id
    //           })
    //         );
    //       }
    //     }
    //   }
    // }
  }

  ngOnDestroy(): void {
    this._document
      .getElementsByTagName('html')[0]
      .classList.remove('cometchat');
  }
}
