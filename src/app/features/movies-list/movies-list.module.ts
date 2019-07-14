import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { MoviesListRoutingModule } from './movies-list-routing.module';
import { MoviesListPageComponent } from './pages/movies-list-page/movies-list-page.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MoviesFiltersComponent } from './components/movies-filters/movies-filters.component';


@NgModule({
  declarations: [MoviesListPageComponent, MovieCardComponent, MoviesFiltersComponent],
  imports: [
    CommonModule,
    MoviesListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class MoviesListModule { }
