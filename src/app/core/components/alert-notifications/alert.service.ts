import { Subject } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import {
  IIcons,
  defaultIcons,
  INotification,
  INotificationEvent,
} from './alert.model';

@Injectable({ providedIn: 'root' })
export class AlertNotificationService {
  private emitter: Subject<INotificationEvent> =
    new Subject<INotificationEvent>();
  private icons: IIcons = defaultIcons;

  set(notification: INotification, to: boolean) {
    notification.id =
      notification.override && notification.override.id
        ? notification.override.id
        : Math.random().toString(36).substring(3);
    notification.click = new EventEmitter<{}>();
    this.emitter.next({ command: 'set', notification: notification, add: to });

    return notification;
  }

  getChangeEmitter(): any {
    return this.emitter;
  }

  success(title: string, content?: string, override?: any) {
    return this.set(
      {
        title,
        content: content || '',
        type: 'success',
        icon: this.icons.success,
        override,
      },
      true
    );
  }

  error(title: string, content?: string, override?: any) {
    return this.set(
      {
        title,
        content: content || '',
        type: 'error',
        icon: this.icons.error,
        override,
      },
      true
    );
  }

  alert(title: string, content?: string, override?: any) {
    return this.set(
      {
        title,
        content: content || '',
        type: 'alert',
        icon: this.icons.alert,
        override,
      },
      true
    );
  }

  info(title: string, content?: string, override?: any) {
    return this.set(
      {
        title,
        content: content || '',
        type: 'info',
        icon: this.icons.info,
        override,
      },
      true
    );
  }

  bare(title: string, content?: string, override?: any) {
    return this.set(
      {
        title,
        content: content || '',
        type: 'bare',
        icon: 'bare',
        override,
      },
      true
    );
  }

  create(title: string, content: string, type: string, override?: any) {
    return this.set(
      {
        title,
        content: content,
        type,
        icon: 'bare',
        override,
      },
      true
    );
  }

  html(html: any, type: string, override?: any) {
    return this.set({ html, type, icon: 'bare', override }, true);
  }

  remove(id?: string) {
    if (id) this.emitter.next({ command: 'clean', id: id });
    else this.emitter.next({ command: 'cleanAll' });
  }
}
