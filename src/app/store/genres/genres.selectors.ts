import { createSelector, createFeatureSelector } from '@ngrx/store';

import { GenresState } from './genres.reducers';


export const getGenresState = createFeatureSelector<GenresState>('genres');

export const getGenres = createSelector(
  getGenresState,
  (state: GenresState) => state.genres
);

export const getGenresLoading = createSelector(
  getGenresState,
  (state: GenresState) => state.loading
);

export const getGenresLoaded = createSelector(
  getGenresState,
  (state: GenresState) => state.loaded
);

export const getGenresError = createSelector(
  getGenresState,
  (state: GenresState) => state.error
);

export const fromGenresSelectors = {
  getGenres,
  getGenresLoading,
  getGenresLoaded,
  getGenresError
};
