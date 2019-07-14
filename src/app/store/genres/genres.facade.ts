import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { fromGenresSelectors } from './genres.selectors';
import { GenresState } from './genres.reducers';
import { fromGenresActions } from './genres.actions';


@Injectable({
  providedIn: 'root'
})
export class GenresFacade {
  genres$ = this.store.select(fromGenresSelectors.getGenres);
  genresLoading$ = this.store.select(fromGenresSelectors.getGenresLoading);
  genresLoaded$ = this.store.select(fromGenresSelectors.getGenresLoaded);
  genresError$ = this.store.select(fromGenresSelectors.getGenresError);

  constructor(private store: Store<GenresState>) { }

  getGenres(): void {
    this.store.dispatch(fromGenresActions.getGenres());
  }
}
