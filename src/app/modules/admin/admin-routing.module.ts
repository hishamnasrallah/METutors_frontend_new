import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '@metutor/core/guards';

import {
  AdminComponent,
  AdminSupportTicketComponent,
  AdminTicketDetailsComponent,
  AdminTutorInterviewComponent,
  AdminTutorListComponent,
} from './containers';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminAuthGuard],
    data: {
      layout: {
        title: 'Admin - MEtutors',
        showHeader: false,
        showFooter: false,
      },
    },
    children: [
      {
        path: 'tutor',
        children: [
          {
            path: 'interview',
            component: AdminTutorInterviewComponent,
            data: {
              layout: {
                title: 'Tutor interview - Metutors',
                navbarTitle: 'Interview requests',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'list',
            component: AdminTutorListComponent,
            data: {
              layout: {
                title: 'Tutor list - Metutors',
                navbarTitle: 'Tutor list',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'support-ticket',
        children: [
          {
            path: '',
            component: AdminSupportTicketComponent,
            data: {
              layout: {
                title: 'Support ticket - Metutors',
                navbarTitle: 'Support ticket',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'ticket-details/:id',
            component: AdminTicketDetailsComponent,
            data: {
              layout: {
                title: 'Ticket details - Metutors',
                navbarTitle: 'Ticket details',
                showHeader: false,
                showFooter: false,
              },
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
