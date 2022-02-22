import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestTutorComponent } from './containers';

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
