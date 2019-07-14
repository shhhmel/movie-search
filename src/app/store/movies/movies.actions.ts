import { createAction, props } from '@ngrx/store';

import { EGenre } from '../../models/genre';
import { ESortBy } from '../../models/sort-by';
import { IMovie } from '../../models/movie';


export enum EMoviesActions {
  GetMovies = '[Movies] Get Movies',
  GetMoviesSuccess = '[Movies] Get Movies Success',
  GetMoviesError = '[Movies] Get Movies Error',

  GetMovie = '[Movies] Get Movie',
  GetMovieSuccess = '[Movies] Get Movie Success',
  GetMovieError = '[Movies] Get Movie Error',

  SelectGenre = '[Movies] Select Genre',
  SelectOrder = '[Movies] Select Order'
}

export const getMovies = createAction(
  EMoviesActions.GetMovies,
  props<{ genre?: EGenre, sortBy?: ESortBy }>()
);

export const getMoviesSuccess = createAction(
  EMoviesActions.GetMoviesSuccess,
  props<{ movies: IMovie[] }>()
);

export const getMoviesError = createAction(
  EMoviesActions.GetMoviesError,
  props<{ error: any }>()
);

export const getMovie = createAction(
  EMoviesActions.GetMovie,
  props<{ id: number }>()
);

export const getMovieSuccess = createAction(
  EMoviesActions.GetMovieSuccess,
  props<{ movie: IMovie }>()
);

export const getMovieError = createAction(
  EMoviesActions.GetMovieError,
  props<{ error: any }>()
);

export const selectGenre = createAction(
  EMoviesActions.SelectGenre,
  props<{ genre: EGenre }>()
);

export const selectOrder = createAction(
  EMoviesActions.SelectOrder,
  props<{ sortBy: ESortBy }>()
);

export const fromMoviesActions = {
  getMovies,
  getMoviesSuccess,
  getMoviesError,
  getMovie,
  getMovieSuccess,
  getMovieError,
  selectGenre,
  selectOrder
};
