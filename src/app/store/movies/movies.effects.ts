import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';

import { fromMoviesActions, EMoviesActions } from './movies.actions';
import { ApiService } from 'src/app/api/api.service';


@Injectable()
export class MoviesEffects {

  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType(EMoviesActions.GetMovies),
    mergeMap((action: any) => this.apiService.getMovies(action.genre, action.sortBy)
      .pipe(
        map(movies => (fromMoviesActions.getMoviesSuccess({ movies }))),
        catchError(error => of(fromMoviesActions.getMoviesError({ error })))
      ))
    )
  );

  loadMovie$ = createEffect(() => this.actions$.pipe(
    ofType(EMoviesActions.GetMovie),
    mergeMap((action: any) => this.apiService.getMovie(action.id)
      .pipe(
        map(movie => (fromMoviesActions.getMovieSuccess({ movie }))),
        catchError(error => of(fromMoviesActions.getMovieError({ error })))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) { }
}
