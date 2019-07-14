import { createAction, props } from '@ngrx/store';
import { IMovie } from 'src/app/models/movie';

export enum ESearchActions {
  Search = '[Search] Search',
  SearchSuccess = '[Search] Search Success',
  SearchError = '[Search] Search Error',
  ClearSearch = '[Search] Clear Search'
}

export const search = createAction(
  ESearchActions.Search,
  props<{ query: string }>()
);

export const searchSuccess = createAction(
  ESearchActions.SearchSuccess,
  props<{ movies: IMovie[] }>()
);

export const searchError = createAction(
  ESearchActions.SearchError,
  props<{ error: any }>()
);

export const clearSearch = createAction(
  ESearchActions.ClearSearch
);

export const fromSearchActions = {
  search,
  searchSuccess,
  searchError,
  clearSearch
};
