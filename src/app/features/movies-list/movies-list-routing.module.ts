import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesListPageComponent } from './pages/movies-list-page/movies-list-page.component';
import { MoviesListResolver } from './resolvers/movies-list.resolver';


const routes: Routes = [
  {
    path: '',
    component: MoviesListPageComponent,
    data: { animation: 'movies' },
    resolve: { loaded: MoviesListResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [MoviesListResolver]
})
export class MoviesListRoutingModule { }
