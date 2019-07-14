import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { ApiService } from 'src/app/api/api.service';
import { ESearchActions, fromSearchActions } from './search.actions';


@Injectable()
export class SearchEffects {

  loadGenres$ = createEffect(() => this.actions$.pipe(
    ofType(ESearchActions.Search),
    mergeMap((action: any) => this.apiService.searchMovies(action.query)
      .pipe(
        map(movies => (fromSearchActions.searchSuccess({ movies }))),
        catchError(error => of(fromSearchActions.searchError({ error })))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) { }
}
