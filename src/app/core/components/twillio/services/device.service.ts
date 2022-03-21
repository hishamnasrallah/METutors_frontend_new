import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

export type Devices = MediaDeviceInfo[] | any;

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  $devicesUpdated: Observable<Promise<Devices>>;

  private deviceBroadcast = new ReplaySubject<Promise<Devices>>();

  constructor() {
    if (navigator && navigator.mediaDevices) {
      navigator.mediaDevices.ondevicechange = (_: Event) => {
        this.deviceBroadcast.next(this.getDeviceOptions());
      };
    }

    this.$devicesUpdated = this.deviceBroadcast.asObservable();
    this.deviceBroadcast.next(this.getDeviceOptions());
  }

  private async isGrantedMediaPermissions() {
    if (
      navigator &&
      navigator.userAgent &&
      navigator.userAgent.indexOf('Chrome') < 0
    ) {
      return true; // Follows standard workflow for non-Chrome browsers.
    }

    if (navigator && navigator['permissions']) {
      try {
        const result: any = await navigator.permissions.query({
          name: 'notifications',
        });
        const permissionName = 'camera' as PermissionName;
        navigator.permissions.query({ name: permissionName });

        if (result) {
          if (result.state === 'granted') {
            return true;
          } else {
            const isGranted = await new Promise<boolean>((resolve) => {
              result.onchange = (_: any) => {
                const granted = _.target['state'] === 'granted';
                if (granted) {
                  resolve(true);
                }
              };
            });

            return isGranted;
          }
        }
      } catch (e) {
        // This is only currently supported in Chrome.
        // https://stackoverflow.com/a/53155894/2410379
        return true;
      }
    }

    return false;
  }

  private async getDeviceOptions(): Promise<Devices> {
    const isGranted = await this.isGrantedMediaPermissions();
    if (navigator && navigator.mediaDevices && isGranted) {
      let devices = await this.tryGetDevices();
      if (devices.every((d: any) => !d.label)) {
        devices = await this.tryGetDevices();
      }

      return devices.filter((d: any) => !!d.label);
    }

    return null;
  }

  private async tryGetDevices() {
    const mediaDevices = await navigator.mediaDevices.enumerateDevices();
    const devices = ['audioinput', 'audiooutput', 'videoinput'].reduce(
      (options, kind) => {
        return (options[kind] = mediaDevices.filter(
          (device) => device.kind === kind
        ));
      },
      [] as Devices
    );

    return devices;
  }
}
