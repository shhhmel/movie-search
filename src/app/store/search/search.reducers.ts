import { createReducer, on, Action } from '@ngrx/store';

import { IMovie } from 'src/app/models/movie';
import { fromSearchActions } from './search.actions';


export interface SearchState {
  movies: IMovie[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const searchInitialState: SearchState = {
  movies: [],
  loading: false,
  loaded: false,
  error: null
};

const reducer = createReducer(
  searchInitialState,
  on(
    fromSearchActions.search,
    (state) => ({ ...state, loading: true, loaded: false, error: null })
  ),
  on(
    fromSearchActions.searchSuccess,
    (state, { movies }) => ({...state, loading: false, loaded: true, error: null, movies })
  ),
  on(
    fromSearchActions.searchError,
    (state, { error }) => ({ ...state, loading: false, loaded: false, error })
  ),
  on(
    fromSearchActions.clearSearch,
    (state) => ({...state, loading: false, loaded: true, error: null, movies: [] })
  ),
);

export function searchReducer(state: SearchState | undefined, action: Action) {
  return reducer(state, action);
}

