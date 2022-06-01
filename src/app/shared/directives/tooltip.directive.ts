import {
  Input,
  Directive,
  Renderer2,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[meTutorsTooltip]',
})
export class TooltipDirective {
  @Input() delay: number;
  @Input() placement = 'bottom';
  @Input() tooltipText: string;

  tooltip: HTMLElement | null;
  // Distance between host element and tooltip element
  offset = 10;

  constructor(private _el: ElementRef, private _renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter(): void {
    if (!this.tooltip && this.tooltipText) {
      this.show();
    }
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    if (this.tooltip && this.tooltipText) {
      this.hide();
    }
  }

  show(): void {
    this.create();
    this.setPosition();
    this._renderer.addClass(this.tooltip, 'tooltip-show');
  }

  hide(): void {
    this._renderer.removeClass(this.tooltip, 'tooltip-show');
    window.setTimeout(() => {
      this._renderer.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    }, this.delay);
  }

  create(): void {
    this.tooltip = this._renderer.createElement('span');

    this._renderer.appendChild(
      this.tooltip,
      this._renderer.createText(this.tooltipText) // textNode
    );

    this._renderer.appendChild(document.body, this.tooltip);
    // this._renderer.appendChild(this.el.nativeElement, this.tooltip);

    this._renderer.addClass(this.tooltip, 'tooltip');
    this._renderer.addClass(this.tooltip, `tooltip-${this.placement}`);

    // delay settings
    this._renderer.setStyle(
      this.tooltip,
      '-webkit-transition',
      `opacity ${this.delay}ms`
    );
    this._renderer.setStyle(
      this.tooltip,
      '-moz-transition',
      `opacity ${this.delay}ms`
    );
    this._renderer.setStyle(
      this.tooltip,
      '-o-transition',
      `opacity ${this.delay}ms`
    );
    this._renderer.setStyle(
      this.tooltip,
      'transition',
      `opacity ${this.delay}ms`
    );
  }

  setPosition(): void {
    // Host element size and location information
    const hostPos: any = this._el.nativeElement.getBoundingClientRect();

    // tooltip element size and position information
    const tooltipPos: any = this.tooltip?.getBoundingClientRect();

    // window of scroll top
    // getBoundingClientRect method returns the relative position in the viewport.
    // If scrolling occurs, the vertical scroll coordinate value should be reflected on the top of the tooltip element..
    const scrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    let top = 0;
    let left = 0;

    if (this.placement === 'top') {
      top = hostPos.top - tooltipPos.height - this.offset;
      left = +hostPos.left + (hostPos.width - tooltipPos?.width) / 2;
    }

    if (this.placement === 'bottom') {
      top = +hostPos.bottom + this.offset;
      left = +hostPos?.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'left') {
      top = +hostPos.top + (hostPos.height - tooltipPos?.height) / 2;
      left = hostPos.left - tooltipPos.width - this.offset;
    }

    if (this.placement === 'right') {
      top = +hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = +hostPos.right + this.offset;
    }

    // If scrolling occurs, the vertical scroll coordinate value should be reflected on the top of the tooltip element..
    this._renderer.setStyle(this.tooltip, 'top', `${+top + scrollPos}px`);
    this._renderer.setStyle(this.tooltip, 'left', `${+left}px`);
  }
}
