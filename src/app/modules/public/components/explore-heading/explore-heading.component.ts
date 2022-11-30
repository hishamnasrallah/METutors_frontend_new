import {
  Input,
  OnInit,
  Output,
  ViewChild,
  Component,
  ElementRef,
  EventEmitter
} from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'metutors-explore-heading',
  templateUrl: './explore-heading.component.html',
  styleUrls: ['./explore-heading.component.scss']
})
export class ExploreHeadingComponent implements OnInit {
  @ViewChild('searchInput') set searchInput(input: ElementRef) {
    if (input) {
      fromEvent(input.nativeElement, 'keyup')
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

  @Input() name: string;
  @Input() title: string;
  @Input() image: string;
  @Input() btnText: string;
  @Input() searchText: string;
  @Input() description: string;
  @Input() placeholderText: string;
  @Input() loading: boolean = false;

  @Output() filter = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
