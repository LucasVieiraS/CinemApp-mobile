import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieDataPage } from './movie-data.page';

const routes: Routes = [
  {
    path: '',
    component: MovieDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieDataPageRoutingModule {}
