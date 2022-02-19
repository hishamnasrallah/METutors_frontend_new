import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { TicketStatus, TicketUserType } from 'src/app/config';
import { AlertNotificationService } from 'src/app/core/components';
import { ITicket, ITicketReply } from 'src/app/core/models';
import { AuthService, SupportService } from 'src/app/core/services';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgxAutoScroll } from 'ngx-auto-scroll';

@Component({
  selector: 'metutors-student-ticket-details',
  templateUrl: './student-ticket-details.component.html',
  styleUrls: ['./student-ticket-details.component.scss'],
  animations: [
    trigger('dropMenuAnimate', [
      transition('void => *', [
        style({ transform: 'translateY(20PX)' }),
        animate(700, style({ transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class StudentTicketDetailsComponent implements OnInit {
  @ViewChild(NgxAutoScroll) ngxAutoScroll?: NgxAutoScroll;

  loading = false;
  ticket?: ITicket;
  messageForm: FormGroup;
  ticketStatus = TicketStatus;
  getTicketSub?: Subscription;
  ticketUserType = TicketUserType;

  constructor(
    private _title: Title,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    public authService: AuthService,
    private _supportService: SupportService,
    private _alertNotificationService: AlertNotificationService
  ) {
    this.messageForm = this._fb.group({
      reply: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe((res: ParamMap) => {
      const id = res.get('id') || '';
      this.getTicketSub = this._supportService
        .getTicketDetailsById(id)
        .subscribe((response) => {
          this.ticket = response;
          this._title.setTitle(this.ticket?.title || '');
          this.forceScrollDown();
        });
    });
  }

  onSubmit({ valid, value }: any): void {
    if (valid) {
      this.loading = true;
      const message = {
        ...value,
        ticket: this.ticket?.id,
      };
      this._supportService.submitMessage(message).subscribe(
        (response) => {
          this.loading = false;
          this.messageForm.reset();
          this.ticket?.replies.push(new ITicketReply(false, response));
        },
        (error) => {
          this.loading = false;
          this._alertNotificationService.error(
            error.error.detail || 'Error in sending message'
          );
        }
      );
    }
  }

  forceScrollDown(): void {
    this.ngxAutoScroll?.forceScrollDown();
  }

  ngOnDestroy(): void {
    this.getTicketSub?.unsubscribe();
  }
}
