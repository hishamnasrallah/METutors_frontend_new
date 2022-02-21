import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IFAQ } from 'src/app/core/models';
import { SupportService } from 'src/app/core/services';

@Component({
  selector: 'metutors-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  listFAQs: IFAQ[] = [];
  tempListFAQs: IFAQ[] = [];
  fetchListFaqSub?: Subscription;

  constructor(private supportService: SupportService) {}

  ngOnInit(): void {
    this.fetchListFaqSub = this.supportService.fetchListFaq().subscribe(
      (response) => {
        this.listFAQs = response.results;
        this.tempListFAQs = response.results;
      },
      () => {}
    );
  }

  ngOnDestroy(): void {
    this.fetchListFaqSub?.unsubscribe();
  }
}
