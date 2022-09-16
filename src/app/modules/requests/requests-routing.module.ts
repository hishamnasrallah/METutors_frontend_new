import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  RequestTutorComponent,
  InvoiceDetailsComponent,
  PaymentProcessingComponent,
} from './containers';

const routes: Routes = [
  {
    path: 'request-tutor',
    component: RequestTutorComponent,
    data: {
      layout: {
        title: 'Request Academic Tutoring - MEtutors',
      },
    },
  },
  {
    path: 'invoice-details',
    component: InvoiceDetailsComponent,
    data: {
      layout: {
        title: 'Invoice details - MEtutors',
      },
    },
  },
  {
    path: 'invoice-details/:id',
    component: InvoiceDetailsComponent,
    data: {
      layout: {
        title: 'Invoice details - MEtutors',
      },
    },
  },
  {
    path: 'payment-processing',
    component: PaymentProcessingComponent,
    data: {
      layout: {
        title: 'Payment Processing - MEtutors',
      },
    },
  },
  {
    path: '',
    redirectTo: '/requests/request-tutor',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsRoutingModule {}
