import { createReducer, on, Action } from '@ngrx/store';

import { IOption } from 'src/app/models/option';
import { fromGenresActions } from './genres.actions';


export interface GenresState {
  genres: IOption[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const genresInitialState: GenresState = {
  genres: [],
  loading: false,
  loaded: false,
  error: null
};

const reducer = createReducer(
  genresInitialState,
  on(
    fromGenresActions.getGenres,
    (state) => ({ ...state, loading: true, loaded: false, error: null })
  ),
  on(
    fromGenresActions.getGenresSuccess,
    (state, { genres }) => ({...state, loading: false, loaded: true, error: null, genres })
  ),
  on(
    fromGenresActions.getGenresError,
    (state, { error }) => ({ ...state, loading: false, loaded: false, error })
  )
);

export function genresReducer(state: GenresState | undefined, action: Action) {
  return reducer(state, action);
}
