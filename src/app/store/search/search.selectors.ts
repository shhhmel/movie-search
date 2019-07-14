import { createSelector, createFeatureSelector } from '@ngrx/store';

import { SearchState } from './search.reducers';


export const getSearchState = createFeatureSelector<SearchState>('search');

export const getMovies = createSelector(
  getSearchState,
  (state: SearchState) => state.movies
);

export const getSearchLoading = createSelector(
  getSearchState,
  (state: SearchState) => state.loading
);

export const getSearchLoaded = createSelector(
  getSearchState,
  (state: SearchState) => state.loaded
);

export const getSearchError = createSelector(
  getSearchState,
  (state: SearchState) => state.error
);

export const fromSearchSelectors = {
  getMovies,
  getSearchLoading,
  getSearchLoaded,
  getSearchError
};
