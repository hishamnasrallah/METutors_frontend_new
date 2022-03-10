import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  TutorComponent,
  TutorFaqComponent,
  TutorHelpComponent,
  TutorInboxComponent,
  TutorBadgesComponent,
  TutorClassesComponent,
  TutorSettingsComponent,
  TutorSyllabusComponent,
  TutorDashboardComponent,
  TutorClassroomsComponent,
  TutorCreateTicketComponent,
  TutorSupportTicketComponent,
  TutorTicketDetailsComponent,
  TutorPaymentRecordsComponent,
  TutorClassDashboardComponent,
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
        path: 'classrooms',
        children: [
          {
            path: '',
            component: TutorClassroomsComponent,
            data: {
              layout: {
                title: 'Tutor Classrooms - Metutors',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'syllabus/:id',
            component: TutorSyllabusComponent,
            data: {
              layout: {
                title: 'Tutor Syllabus - Metutors',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'classes',
            component: TutorClassesComponent,
            data: {
              layout: {
                title: 'Tutor Classes - Metutors',
                showHeader: false,
                showFooter: false,
                hideSidebar: true,
              },
            },
            children: [
              {
                path: 'dashboard/:id',
                component: TutorClassDashboardComponent,
                data: {
                  layout: {
                    title: 'Tutor Class Dashboard - Metutors',
                    showHeader: false,
                    showFooter: false,
                    hideSidebar: true,
                  },
                },
              },
              {
                path: '',
                redirectTo: 'dashboard/:id',
                pathMatch: 'full',
              },
            ],
          },
        ],
      },
      {
        path: 'help',
        component: TutorHelpComponent,
        data: {
          layout: {
            title: 'Help - Metutors',
            showHeader: false,
            showFooter: false,
            hideSidebar: true,
          },
        },
        children: [
          {
            path: 'faq',
            component: TutorFaqComponent,
            data: {
              layout: {
                title: 'FAQ - Metutors',
                showHeader: false,
                showFooter: false,
                hideSidebar: true,
              },
            },
          },
          {
            path: 'support-ticket',
            children: [
              {
                path: '',
                component: TutorSupportTicketComponent,
                data: {
                  layout: {
                    title: 'My tickets - Metutors',
                    showHeader: false,
                    showFooter: false,
                    hideSidebar: true,
                  },
                },
              },
              {
                path: 'create-ticket',
                component: TutorCreateTicketComponent,
                data: {
                  layout: {
                    title: 'Create ticket - Metutors',
                    showHeader: false,
                    showFooter: false,
                    hideSidebar: true,
                  },
                },
              },
              {
                path: 'ticket-details/:id',
                component: TutorTicketDetailsComponent,
                data: {
                  layout: {
                    title: 'Ticket details - Metutors',
                    showHeader: false,
                    showFooter: false,
                    hideSidebar: true,
                  },
                },
              },
            ],
          },
          {
            path: '',
            redirectTo: '/tutor/help/faq',
            pathMatch: 'full',
          },
        ],
      },
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
        path: 'inbox',
        component: TutorInboxComponent,
        data: {
          layout: {
            title: 'Inbox - Metutors',
            showHeader: false,
            showFooter: false,
          },
        },
      },
      {
        path: 'badges',
        component: TutorBadgesComponent,
        data: {
          layout: {
            title: 'Badges - Metutors',
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
