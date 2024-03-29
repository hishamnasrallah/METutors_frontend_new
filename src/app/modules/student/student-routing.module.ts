import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  StudentComponent,
  StudentFaqComponent,
  StudentHelpComponent,
  StudentClassesComponent,
  StudentSyllabusComponent,
  StudentSettingsComponent,
  StudentDashboardComponent,
  StudentResourcesComponent,
  StudentClassroomsComponent,
  StudentAssignmentsComponent,
  StudentCreateTicketComponent,
  StudentCertificatesComponent,
  StudentSupportTicketComponent,
  StudentTicketDetailsComponent,
  StudentClassDashboardComponent,
  StudentViewCertificateComponent,
} from './containers';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    data: {
      layout: {
        title: 'STUDENT',
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
            component: StudentClassroomsComponent,
            data: {
              layout: {
                icon: 'home',
                title: 'CLASSROOMS',
                navbarTitle: 'CLASSROOMS',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'classes',
            component: StudentClassesComponent,
            data: {
              layout: {
                title: 'CLASSES_DASHBOARD',
                navbarTitle: 'CLASSES_DASHBOARD',
                showHeader: false,
                showFooter: false,
                hideSidebar: true,
              },
            },
            children: [
              {
                path: 'syllabus/:id',
                component: StudentSyllabusComponent,
                data: {
                  layout: {
                    title: 'MY_SYLLABUS',
                    navbarTitle: 'SYLLABUS',
                    showHeader: false,
                    showFooter: false,
                    hideSidebar: true,
                  },
                },
              },
              {
                path: 'resources/:id',
                component: StudentResourcesComponent,
                data: {
                  layout: {
                    title: 'MY_RESOURCES',
                    navbarTitle: 'RESOURCES',
                    showHeader: false,
                    showFooter: false,
                    hideSidebar: true,
                  },
                },
              },

              {
                path: 'assignments/:id',
                component: StudentAssignmentsComponent,
                data: {
                  layout: {
                    title: 'MY_ASSIGNMENTS',
                    navbarTitle: 'ASSIGNMENTS',
                    showHeader: false,
                    showFooter: false,
                    hideSidebar: true,
                  },
                },
              },
              {
                path: 'dashboard/:id',
                component: StudentClassDashboardComponent,
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
        component: StudentHelpComponent,
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
            component: StudentFaqComponent,
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
                component: StudentSupportTicketComponent,
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
                component: StudentCreateTicketComponent,
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
                component: StudentTicketDetailsComponent,
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
            redirectTo: '/student/help/faq',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'dashboard',
        component: StudentDashboardComponent,
        data: {
          layout: {
            icon: 'slide-show',
            title: 'DASHBOARD',
            navbarTitle: 'STUDENT_DASHBAORD',
            showHeader: false,
            showFooter: false,
          },
        },
      },
      {
        path: 'certificates',
        component: StudentCertificatesComponent,
        data: {
          layout: {
            icon: 'certificate',
            title: 'CERTIFICATES',
            navbarTitle: 'CERTIFICATES',
            showHeader: false,
            showFooter: false,
          },
        },
      },
      {
        path: 'view-certificate/:id',
        component: StudentViewCertificateComponent,
        data: {
          layout: {
            icon: 'certificate',
            title: 'CERTIFICATES',
            navbarTitle: 'CERTIFICATES',
            showHeader: false,
            showFooter: false,
          },
        },
      },
      {
        path: 'settings',
        component: StudentSettingsComponent,
        data: {
          layout: {
            icon: 'settings',
            title: 'SETTINGS',
            navbarTitle: 'SETTINGS',
            showHeader: false,
            showFooter: false,
          },
        },
      },
      {
        path: '',
        redirectTo: '/student/dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
