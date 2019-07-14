import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { IMovie } from 'src/app/models/movie';
import { fromMoviesActions } from './movies.actions';
import { EGenre } from 'src/app/models/genre';
import { ESortBy } from 'src/app/models/sort-by';


export interface MoviesState extends EntityState<IMovie> {
  selectedMovieId: number;
  selectedGenre: EGenre;
  selectedOrder: ESortBy;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const moviesAdapter: EntityAdapter<IMovie> = createEntityAdapter<IMovie>();

export const moviesInitialState: MoviesState = moviesAdapter.getInitialState({
  selectedMovieId: null,
  selectedGenre: null,
  selectedOrder: null,
  loading: false,
  loaded: false,
  error: null
});

const reducer = createReducer(
  moviesInitialState,
  on(
    fromMoviesActions.getMovies,
    (state) => ({ ...state, loading: true, loaded: false, error: null })
  ),
  on(
    fromMoviesActions.getMoviesSuccess,
    (state, { movies }) => {
      const newState = moviesAdapter.removeAll({ ...state, loading: false, loaded: true, error: null });
      return moviesAdapter.addMany(movies, newState);
    }
  ),
  on(
    fromMoviesActions.getMoviesError,
    (state, { error }) => ({ ...state, loading: false, loaded: false, error })
  ),
  on(
    fromMoviesActions.getMovie,
    (state) => ({ ...state, loading: true, loaded: false, error: null })
  ),
  on(
    fromMoviesActions.getMovieSuccess,
    (state, { movie }) => {
      const newState = { ...state, selectedMovieId: movie.id, loading: false, loaded: true, error: null };
      return moviesAdapter.upsertOne(movie, newState);
    }
  ),
  on(
    fromMoviesActions.getMovieError,
    (state, { error }) => ({ ...state, loading: false, loaded: false, error })
  ),
  on(
    fromMoviesActions.selectGenre,
    (state, { genre }) => ({ ...state, selectedGenre: genre })
  ),
  on(
    fromMoviesActions.selectOrder,
    (state, { sortBy }) => ({ ...state, selectedOrder: sortBy })
  ),
);

export function moviesReducer(state: MoviesState | undefined, action: Action) {
  return reducer(state, action);
}
