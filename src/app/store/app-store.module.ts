import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { searchReducer } from './search/search.reducers';
import { SearchEffects } from './search/search.effects';
import { moviesReducer } from './movies/movies.reducers';
import { MoviesEffects } from './movies/movies.effects';
import { genresReducer } from './genres/genres.reducers';
import { GenresEffects } from './genres/genres.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('movies', moviesReducer),
    StoreModule.forFeature('genres', genresReducer),
    StoreModule.forFeature('search', searchReducer),
    EffectsModule.forRoot([ SearchEffects, MoviesEffects, GenresEffects ]),
  ]
})
export class AppStoreModule { }
