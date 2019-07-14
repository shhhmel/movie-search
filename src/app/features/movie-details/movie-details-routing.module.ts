import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page.component';
import { MovieDetailsResolver } from './resolvers/movie-details.resolver';


const routes: Routes = [
  {
    path: '',
    component: MovieDetailsPageComponent,
    data: { animation: 'movie' },
    resolve: { loaded: MovieDetailsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MovieDetailsResolver]
})
export class MovieDetailsRoutingModule { }
