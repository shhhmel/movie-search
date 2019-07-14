import { createAction, props } from '@ngrx/store';

import { IOption } from 'src/app/models/option';

export enum EGenresActions {
  GetGenres = '[Genres] Get Genres',
  GetGenresSuccess = '[Genres] Get Genres Success',
  GetGenresError = '[Genres] Get Genres Error',
}

export const getGenres = createAction(
  EGenresActions.GetGenres
);

export const getGenresSuccess = createAction(
  EGenresActions.GetGenresSuccess,
  props<{ genres: IOption[] }>()
);

export const getGenresError = createAction(
  EGenresActions.GetGenresError,
  props<{ error: any }>()
);

export const fromGenresActions = {
  getGenres,
  getGenresSuccess,
  getGenresError,
};
