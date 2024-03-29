import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  RequestTutorComponent,
  InvoiceDetailsComponent,
  RequestFreeTutorComponent,
  PaymentProcessingComponent
} from './containers';

const routes: Routes = [
  {
    path: 'request-tutor',
    component: RequestTutorComponent,
    data: {
      layout: {
        title: 'COURSE_BOOKING'
      }
    }
  },
  {
    path: 'request-free-tutor',
    component: RequestFreeTutorComponent,
    data: {
      layout: {
        title: 'BOOK_FREE_TRIAL_CLASS'
      }
    }
  },
  {
    path: 'invoice-details',
    component: InvoiceDetailsComponent,
    data: {
      layout: {
        title: 'INVOICE_DETAILS'
      }
    }
  },
  {
    path: 'invoice-details/:id',
    component: InvoiceDetailsComponent,
    data: {
      layout: {
        title: 'INVOICE_DETAILS'
      }
    }
  },
  {
    path: 'payment-processing',
    component: PaymentProcessingComponent,
    data: {
      layout: {
        title: 'PAYMENT_PROCESSING'
      }
    }
  },
  {
    path: '',
    redirectTo: '/requests/request-tutor',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule {}
