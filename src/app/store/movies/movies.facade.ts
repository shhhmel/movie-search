import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { Observable, of, combineLatest } from 'rxjs';

import { MoviesState } from './movies.reducers';
import { fromMoviesSelectors } from './movies.selectors';
import { EGenre } from 'src/app/models/genre';
import { ESortBy } from 'src/app/models/sort-by';
import { fromMoviesActions } from './movies.actions';
import { IBreadcrumb } from 'src/app/models/breadcrumb';
import { GenresFacade } from '../genres/genres.facade';

const SORT_OPTIONS = [
  { label: 'By name ↑', value: ESortBy.NameDesc },
  { label: 'By name ↓', value: ESortBy.NameAsc },
  { label: 'By rating ↑', value: ESortBy.RatingDesc },
  { label: 'By rating ↓', value: ESortBy.RatingAsc },
  { label: 'By year ↑', value: ESortBy.YearDesc },
  { label: 'By year ↓', value: ESortBy.YearAsc }
];

@Injectable({
  providedIn: 'root'
})
export class MoviesFacade {
  movies$ = this.store.select(fromMoviesSelectors.getMovies);

  moviesLoading$ = this.store.select(fromMoviesSelectors.getMoviesLoading);

  moviesLoaded$ = this.store.select(fromMoviesSelectors.getMoviesLoaded);

  moviesError$ = this.store.select(fromMoviesSelectors.getMoviesError);

  moviesSlectedGenre$ = this.store.select(fromMoviesSelectors.getMoviesSelectedGenre);

  moviesSlectedOrder$ = this.store.select(fromMoviesSelectors.getMoviesSelectedOrder);

  selectedMovie$ = this.store.select(fromMoviesSelectors.getSelectedMovie);

  sortOptions$ = of(SORT_OPTIONS);

  movieBreadcrumbs$: Observable<IBreadcrumb[]> = this.selectedMovie$.pipe(
    filter(movie => !!movie),
    map(movie => [
      { text: 'Films', url: '/movies', active: false },
      { text: movie.name, url: null, active: true }
    ])
  );

  filterValues$ = combineLatest(
    this.moviesSlectedGenre$,
    this.moviesSlectedOrder$
  ).pipe(map(([genre, order]) => ({ genre, order })));

  filterOptions$ = combineLatest(
    this.genresFacade.genres$,
    this.sortOptions$
  )
  .pipe(map(([genres, order]) => ({ genres, order })));

  constructor(
    private store: Store<MoviesState>,
    private genresFacade: GenresFacade
  ) { }

  getMovies(genre: EGenre = null, sortBy: ESortBy = null): void {
    this.store.dispatch(fromMoviesActions.selectGenre({ genre }));
    this.store.dispatch(fromMoviesActions.selectOrder({ sortBy }));
    this.store.dispatch(fromMoviesActions.getMovies({ genre, sortBy }));
  }

  getMovie(id: number): void {
    this.store.dispatch(fromMoviesActions.getMovie({ id }));
  }
}
