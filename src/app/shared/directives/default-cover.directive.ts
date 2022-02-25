import { Directive, Input } from '@angular/core';
import { generalConstants } from 'src/app/config';

@Directive({
  selector: '[meTutorsDefaultCover]',
  // eslint-disable-next-line @typescript-eslint/tslint/config
  host: {
    '[src]': 'checkPath(src)',
    '(error)': 'onError()',
  },
})
export class DefaultCoverDirective {
  @Input() src?: string;

  defaultImg = generalConstants.defaultCoverPath;

  onError(): void {
    this.src = this.defaultImg;
  }

  checkPath(src: string): string {
    return src ? src : this.defaultImg;
  }
}
