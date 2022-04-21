import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorAuthorizeGuard } from '@metutor/core/guards';
import {
  TutorComponent,
  TutorFaqComponent,
  TutorHelpComponent,
  TutorBadgesComponent,
  TutorClassesComponent,
  TutorSettingsComponent,
  TutorSyllabusComponent,
  TutorDashboardComponent,
  TutorResourcesComponent,
  TutorAssignmentComponent,
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
        canActivate: [TutorAuthorizeGuard],
        children: [
          {
            path: '',
            component: TutorClassroomsComponent,
            data: {
              layout: {
                title: 'Tutor Classrooms - Metutors',
                navbarTitle: 'Classrooms',
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
                navbarTitle: 'Classes',
                showHeader: false,
                showFooter: false,
                hideSidebar: true,
              },
            },
            children: [
              {
                path: 'syllabus/:id',
                component: TutorSyllabusComponent,
                data: {
                  layout: {
                    title: 'Tutor Syllabus - Metutors',
                    navbarTitle: 'Syllabus',
                    showHeader: false,
                    showFooter: false,
                    hideSidebar: true,
                  },
                },
              },
              {
                path: 'resources/:id',
                component: TutorResourcesComponent,
                data: {
                  layout: {
                    title: 'Tutor Resources - Metutors',
                    navbarTitle: 'Resources',
                    showHeader: false,
                    showFooter: false,
                    hideSidebar: true,
                  },
                },
              },
              {
                path: 'assignment/:id',
                component: TutorAssignmentComponent,
                data: {
                  layout: {
                    title: 'Tutor Assignment - Metutors',
                    navbarTitle: 'Assignment Dashboard',
                    showHeader: false,
                    showFooter: false,
                    hideSidebar: true,
                  },
                },
              },
              {
                path: 'dashboard/:id',
                component: TutorClassDashboardComponent,
                data: {
                  layout: {
                    title: 'Tutor Class Dashboard - Metutors',
                    navbarTitle: 'Classes dashboard',
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
            navbarTitle: 'Help',
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
                navbarTitle: 'FAQ',
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
                    navbarTitle: 'Support ticket',
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
                    navbarTitle: 'Create ticket',
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
                    navbarTitle: 'Ticket details',
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
        canActivate: [TutorAuthorizeGuard],
        component: TutorDashboardComponent,
        data: {
          layout: {
            title: 'Dashboard - Metutors',
            navbarTitle: 'Dashboard',
            showHeader: false,
            showFooter: false,
          },
        },
      },
      {
        path: 'badges',
        canActivate: [TutorAuthorizeGuard],
        component: TutorBadgesComponent,
        data: {
          layout: {
            title: 'Badges - Metutors',
            navbarTitle: 'Badges',
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
            navbarTitle: 'Settings',
            showHeader: false,
            showFooter: false,
          },
        },
      },
      {
        path: 'payment-records',
        canActivate: [TutorAuthorizeGuard],
        component: TutorPaymentRecordsComponent,
        data: {
          layout: {
            title: 'Payment records - Metutors',
            navbarTitle: 'Payment records',
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
