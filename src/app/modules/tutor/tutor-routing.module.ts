import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  TutorComponent,
  TutorBadgesComponent,
  TutorClassesComponent,
  TutorSettingsComponent,
  TutorSyllabusComponent,
  TutorDashboardComponent,
  TutorClassroomsComponent,
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
            path: 'classes/:id',
            component: TutorClassesComponent,
            data: {
              layout: {
                title: 'Tutor Classes - Metutors',
                showHeader: false,
                showFooter: false,
              },
            },
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
