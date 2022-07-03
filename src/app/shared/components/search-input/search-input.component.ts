import {
  Input,
  OnInit,
  Output,
  Component,
  ViewChild,
  ElementRef,
  EventEmitter,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

@Component({
  selector: 'metutors-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
  @Input() placeholder = 'Search...';
  @Output() searchedText: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  @Input() set resetInput(value: boolean) {
    console.log(value);
    if (value) {
      this.name = '';
    }
  }

  name: string;

  constructor() {}

  ngOnInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((text: string) => {
        this.searchedText.emit(text);
      });
  }
}
