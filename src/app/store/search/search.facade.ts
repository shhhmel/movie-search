import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { SearchState } from './search.reducers';
import { fromSearchSelectors } from './search.selectors';
import { fromSearchActions } from './search.actions';


@Injectable({
  providedIn: 'root'
})
export class SearchFacade {
  movies$ = this.store.select(fromSearchSelectors.getMovies);
  moviesLoading$ = this.store.select(fromSearchSelectors.getSearchLoading);
  moviesLoaded$ = this.store.select(fromSearchSelectors.getSearchLoaded);
  moviesError$ = this.store.select(fromSearchSelectors.getSearchError);

  constructor(private store: Store<SearchState>) { }

  search(query: string): void {
    this.store.dispatch(fromSearchActions.search({ query }));
  }

  clearSearch(): void {
    this.store.dispatch(fromSearchActions.clearSearch());
  }
}
