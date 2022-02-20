import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  TutorComponent,
  TutorSettingsComponent,
  TutorDashboardComponent,
  TutorPaymentRecordsComponent,
} from './containers';

const routes: Routes = [
  {
    path: '',
    component: TutorComponent,
    data: {
      layout: {
        title: 'Tutor - Metutors',
        showHeader: false,
        showFooter: false,
      },
    },
    children: [
      {
        path: 'dashboard',
        component: TutorDashboardComponent,
        data: {
          layout: {
            title: 'Dashboard - Metutors',
            showHeader: false,
            showFooter: false,
          },
        },
      },
      {
        path: 'settings',
        component: TutorSettingsComponent,
        data: {
          layout: {
            title: 'Settings - Metutors',
            showHeader: false,
            showFooter: false,
          },
        },
      },
      {
        path: 'payment-records',
        component: TutorPaymentRecordsComponent,
        data: {
          layout: {
            title: 'Payment records - Metutors',
            showHeader: false,
            showFooter: false,
          },
        },
      },
      {
        path: '',
        redirectTo: '/tutor/dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorRoutingModule {}
