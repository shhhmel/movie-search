import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { PageUnderConstructionComponent } from './layout/page-under-construction/page-under-construction.component';


const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'tv-series', component: PageUnderConstructionComponent, data: { animation: 'movie' } },
  { path: 'cartoons', component: PageUnderConstructionComponent, data: { animation: 'movie' } },
  {
    path: 'movies',
    loadChildren: () => import('./features/movies-list/movies-list.module').then(mod => mod.MoviesListModule)
  },
  {
    path: 'movies/:id',
    loadChildren: () => import('./features/movie-details/movie-details.module').then(mod => mod.MovieDetailsModule)
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
