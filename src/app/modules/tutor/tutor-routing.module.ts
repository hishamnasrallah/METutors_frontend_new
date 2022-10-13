import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorAuthorizeGuard, TutorSettingsGuard } from '@metutor/core/guards';
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
        title: 'TEACHER',
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
                title: 'CLASSROOMS',
                navbarTitle: 'CLASSROOMS',
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
                title: 'Tutor Classes',
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
                    title: 'SYLLABUS',
                    navbarTitle: 'SYLLABUS',
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
                    title: 'RESOURCES',
                    navbarTitle: 'RESOURCES',
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
                    title: 'ASSIGNMENTS',
                    navbarTitle: 'ASSIGNMENTS',
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
                    title: 'CLASSES_DASHBOARD',
                    navbarTitle: 'CLASSES_DASHBOARD',
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
            title: 'HELP',
            navbarTitle: 'HELP',
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
                title: 'FAQS',
                navbarTitle: 'FREQUENTLY_ASKED_QUESTIONS',
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
                    title: 'SUPPORT_TICKET',
                    navbarTitle: 'SUPPORT_TICKET',
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
                    title: 'CREATE_TICKET',
                    navbarTitle: 'CREATE_TICKET',
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
                    title: 'TICKET_DETAILS',
                    navbarTitle: 'TICKET_DETAILS',
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
            icon: 'slide-show-black',
            title: 'DASHBOARD',
            navbarTitle: 'TUTOR_DASHBOARD',
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
            title: 'BADGES',
            navbarTitle: 'BADGES',
            showHeader: false,
            showFooter: false,
          },
        },
      },
      {
        path: 'settings',
        canActivate: [TutorSettingsGuard],
        component: TutorSettingsComponent,
        data: {
          layout: {
            icon: 'settings-black',
            title: 'SETTINGS',
            navbarTitle: 'SETTINGS',
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
            title: 'PAYMENT_RECORDS',
            navbarTitle: 'PAYMENT_RECORDS',
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
