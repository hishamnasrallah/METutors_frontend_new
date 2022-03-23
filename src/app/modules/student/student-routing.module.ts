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
  StudentClassroomsComponent,
  StudentCreateTicketComponent,
  StudentCertificatesComponent,
  StudentSupportTicketComponent,
  StudentTicketDetailsComponent,
  StudentClassDashboardComponent,
} from './containers';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    data: {
      layout: {
        title: 'Student - Metutors',
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
                title: 'Student Classroom - Metutors',
                navbarTitle: 'Classroom',
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
                title: 'Student Classes - Metutors',
                navbarTitle: 'Classes Dashboard',
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
                    title: 'Student Syllabus - Metutors',
                    navbarTitle: 'Syllabus',
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
                    title: 'Student Classes - Metutors',
                    navbarTitle: 'Classes Dashboard',
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
            component: StudentFaqComponent,
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
                component: StudentSupportTicketComponent,
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
                component: StudentCreateTicketComponent,
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
                component: StudentTicketDetailsComponent,
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
            title: 'Dashboard - Metutors',
            navbarTitle: "Student's Dashboard",
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
            title: 'Certificates - Metutors',
            navbarTitle: 'Earned certificates',
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
            title: 'Settings - Metutors',
            navbarTitle: 'Settings',
            showHeader: false,
            showFooter: false,
          },
        },
      },
      {
        path: '',
        redirectTo: '/student/classrooms',
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
