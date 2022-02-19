import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  StudentComponent,
  StudentFaqComponent,
  StudentHelpComponent,
  StudentClassesComponent,
  StudentSyllabusComponent,
  StudentClassroomsComponent,
  StudentCreateTicketComponent,
  StudentSupportTicketComponent,
  StudentTicketDetailsComponent,
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
                title: 'Student Classrooms - Metutors',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'syllabus/:id',
            component: StudentSyllabusComponent,
            data: {
              layout: {
                title: 'Student Syllabus - Metutors',
                showHeader: false,
                showFooter: false,
              },
            },
          },
          {
            path: 'classes/:id',
            component: StudentClassesComponent,
            data: {
              layout: {
                title: 'Student Classes - Metutors',
                showHeader: false,
                showFooter: false,
              },
            },
          },
        ],
      },
      {
        path: 'help',
        component: StudentHelpComponent,
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
            component: StudentFaqComponent,
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
                component: StudentSupportTicketComponent,
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
                component: StudentCreateTicketComponent,
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
                component: StudentTicketDetailsComponent,
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
            redirectTo: '/student/help/faq',
            pathMatch: 'full',
          },
        ],
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
