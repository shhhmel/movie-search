import { createSelector, createFeatureSelector } from '@ngrx/store';

import { moviesAdapter, MoviesState } from './movies.reducers';


const {
  selectEntities,
  selectAll
} = moviesAdapter.getSelectors();

export const getMoviesState = createFeatureSelector<MoviesState>('movies');

export const getMovies = createSelector(
  getMoviesState,
  selectAll
);

export const getMoviesLoading = createSelector(
  getMoviesState,
  state => state.loading
);

export const getMoviesLoaded = createSelector(
  getMoviesState,
  state => state.loaded
);

export const getMoviesError = createSelector(
  getMoviesState,
  state => state.error
);

export const getMoviesSelectedGenre = createSelector(
  getMoviesState,
  state => state.selectedGenre
);

export const getMoviesSelectedOrder = createSelector(
  getMoviesState,
  state => state.selectedOrder
);

export const getMoviesEntities = createSelector(
  getMoviesState,
  selectEntities
);

export const getSelectedMovieId = createSelector(
  getMoviesState,
  state => state.selectedMovieId
);

export const getSelectedMovie = createSelector(
  getMoviesEntities,
  getSelectedMovieId,
  (entities, id) => id ? entities[id] : null
);

export const fromMoviesSelectors = {
  getMovies,
  getMoviesLoading,
  getMoviesLoaded,
  getMoviesError,
  getMoviesSelectedGenre,
  getMoviesSelectedOrder,
  getSelectedMovie
};
