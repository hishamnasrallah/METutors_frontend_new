import {
  Input,
  OnInit,
  Output,
  ViewChild,
  Component,
  ElementRef,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'metutors-explore-heading',
  templateUrl: './explore-heading.component.html',
  styleUrls: ['./explore-heading.component.scss']
})
export class ExploreHeadingComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;

  @Input() name: string;
  @Input() title: string;
  @Input() image: string;
  @Input() btnText: string;
  @Input() description: string;
  @Input() placeholderText: string;
  @Input() loading: boolean = false;

  @Output() filter = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        // get value
        map((event: any) => event.target.value),

        // Time in milliseconds between key events
        debounceTime(1000),

        // If previous query is diffent from current
        distinctUntilChanged()

        // subscription for response
      )
      .subscribe((value: string) => {
        this.filter.emit(value);
      });
  }
}
