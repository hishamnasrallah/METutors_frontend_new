import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { INotification } from './alert.model';
import { AlertNotificationService } from './alert.service';

@Component({
  selector: 'alert-item',
  templateUrl: 'alert-item.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('enterLeave', [
      state('fromRight', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('* => fromRight', [
        style({ opacity: 0, transform: 'translateX(5%)' }),
        animate('400ms ease-in-out'),
      ]),
      state(
        'fromRightOut',
        style({ opacity: 0, transform: 'translateX(-5%)' })
      ),
      transition('fromRight => fromRightOut', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate('300ms ease-in-out'),
      ]),

      state('fromLeft', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('* => fromLeft', [
        style({ opacity: 0, transform: 'translateX(-5%)' }),
        animate('400ms ease-in-out'),
      ]),
      state('fromLeftOut', style({ opacity: 0, transform: 'translateX(5%)' })),
      transition('fromLeft => fromLeftOut', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate('300ms ease-in-out'),
      ]),

      state('scale', style({ opacity: 1, transform: 'scale(1)' })),
      transition('* => scale', [
        style({ opacity: 0, transform: 'scale(0)' }),
        animate('400ms ease-in-out'),
      ]),
      state('scaleOut', style({ opacity: 0, transform: 'scale(0)' })),
      transition('scale => scaleOut', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('400ms ease-in-out'),
      ]),

      state('rotate', style({ opacity: 1, transform: 'rotate(0deg)' })),
      transition('* => rotate', [
        style({ opacity: 0, transform: 'rotate(5deg)' }),
        animate('400ms ease-in-out'),
      ]),
      state('rotateOut', style({ opacity: 0, transform: 'rotate(-5deg)' })),
      transition('rotate => rotateOut', [
        style({ opacity: 1, transform: 'rotate(0deg)' }),
        animate('400ms ease-in-out'),
      ]),
    ]),
  ],
})
export class AlertItemComponent implements OnInit, OnDestroy {
  @Input() rtl?: boolean;
  @Input() animate?: string;
  @Input() timeOut!: number;
  @Input() position!: number;
  @Input() theClass!: string;
  @Input() maxLength!: number;
  @Input() item!: INotification;
  @Input() pauseOnHover?: boolean;
  @Input() clickToClose?: boolean;
  @Input() showProgressBar?: boolean;

  progressWidth = 0;
  private _count = 0;
  private _diff: any;
  private _start: any;
  private _icon?: string;
  private _steps!: number;
  private _speed!: number;
  private _stopTime = false;
  private _safeSvg?: SafeHtml;
  private _timer: any = 5000000;

  constructor(
    private _notificationService: AlertNotificationService,
    private _domSanitizer: DomSanitizer,
    private _zone: NgZone
  ) {}

  ngOnInit(): void {
    if (this.animate) {
      this.item.state = this.animate;
    }

    if (this.item?.override) {
      this.attachOverrides();
    }

    if (this.timeOut !== 0) {
      this.startTimeOut();
    }

    this._safeSvg = this._domSanitizer.bypassSecurityTrustHtml(
      this._icon || this.item.icon
    );
  }

  startTimeOut(): void {
    this._steps = this.timeOut / 10;
    this._speed = this.timeOut / this._steps;
    this._start = new Date().getTime();
    this._zone.runOutsideAngular(
      () => (this._timer = setTimeout(this.instance, this._speed))
    );
  }

  onEnter(): void {
    if (this.pauseOnHover) {
      this._stopTime = true;
    }
  }

  onLeave(): void {
    if (this.pauseOnHover) {
      this._stopTime = false;
      setTimeout(this.instance, this._speed - this._diff);
    }
  }

  setPosition(): number {
    return this.position !== 0 ? this.position * 90 : 0;
  }

  onClick($e: MouseEvent): void {
    this.item.click!.emit($e);

    if (this.clickToClose) {
      this.remove();
    }
  }

  attachOverrides(): void {
    Object.keys(this.item.override).forEach((a) => {
      if (this.hasOwnProperty(a)) {
        (<any>this)[a] = this.item.override[a];
      }
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this._timer);
  }

  private instance = () => {
    this._zone.runOutsideAngular(() => {
      this._zone.run(
        () =>
          (this._diff =
            new Date().getTime() - this._start - this._count * this._speed)
      );

      if (this._count++ === this._steps) this._zone.run(() => this.remove());
      else if (!this._stopTime) {
        if (this.showProgressBar)
          this._zone.run(() => (this.progressWidth += 100 / this._steps));

        this._timer = setTimeout(this.instance, this._speed - this._diff);
      }
    });
  };

  private remove(): void {
    if (this.animate) {
      this.item.state = this.animate + 'Out';
      this._zone.runOutsideAngular(() => {
        setTimeout(() => {
          this._zone.run(() => this._notificationService.set(this.item, false));
        }, 310);
      });
    } else {
      this._notificationService.set(this.item, false);
    }
  }
}
