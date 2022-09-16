import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'metutors-support-filters',
  templateUrl: './support-filters.component.html',
  styleUrls: ['./support-filters.component.scss'],
})
export class SupportFiltersComponent implements OnInit {
  @Input() view: any;

  @Output() onFilter: EventEmitter<any> = new EventEmitter<unknown>();

  priority = '';
  category = '';
  constructor() {}

  doFilter(search: string): void {
    this.onFilter.emit({
      search,
      priority: this.priority,
      category: this.category,
    });
  }

  ngOnInit(): void {}
}
