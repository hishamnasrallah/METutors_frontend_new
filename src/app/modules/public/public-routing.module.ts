import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { layout: { title: 'METutors' } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
