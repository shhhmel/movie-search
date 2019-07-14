import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { fromGenresActions, EGenresActions } from './genres.actions';
import { ApiService } from 'src/app/api/api.service';


@Injectable()
export class GenresEffects {

  loadGenres$ = createEffect(() => this.actions$.pipe(
    ofType(EGenresActions.GetGenres),
    mergeMap((action: any) => this.apiService.getGenres()
      .pipe(
        map(genres => (fromGenresActions.getGenresSuccess({ genres }))),
        catchError(error => of(fromGenresActions.getGenresError({ error })))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) { }
}
