import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/nx';
import { readFirst } from '@nrwl/nx/testing';

import { fromSearchActions } from './search.actions';
import { SearchEffects } from './search.effects';
import { SearchFacade } from './search.facade';
import { SearchState, searchReducer } from './search.reducers';
import { IMovie } from 'src/app/models/movie';


interface TestSchema {
  'search': SearchState;
}

describe('SearchFacade', () => {
  let facade: SearchFacade;
  let store: Store<TestSchema>;
  let createMovie;

  beforeEach(() => {
    createMovie = (name: string) => ({ name } as IMovie);
  });

  describe('used in NgModule', async () => {

    beforeEach(() => {
      @NgModule({
        imports: [
          HttpClientTestingModule,
          StoreModule.forFeature('search', searchReducer),
          EffectsModule.forFeature([SearchEffects])
        ],
        providers: [SearchFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(SearchFacade);
    });

    it('search() should return empty list with loaded == false and loading == true', async (done) => {
      try {
        facade.search('AAA');

        const list = await readFirst(facade.movies$);
        const isLoaded = await readFirst(facade.moviesLoaded$);
        const isLoading = await readFirst(facade.moviesLoading$);
        const isError = await readFirst(facade.moviesError$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);
        expect(isLoading).toBe(true);
        expect(isError).toBe(null);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('clearSearch() should return empty list', async (done) => {
      try {
        store.dispatch(fromSearchActions.searchSuccess({
          movies: [createMovie('AAA'), createMovie('BBB')]
        }));

        let list = await readFirst(facade.movies$);
        let isLoaded = await readFirst(facade.moviesLoaded$);
        let isLoading = await readFirst(facade.moviesLoading$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);
        expect(isLoading).toBe(false);

        facade.clearSearch();

        list = await readFirst(facade.movies$);
        isLoaded = await readFirst(facade.moviesLoaded$);
        isLoading = await readFirst(facade.moviesLoading$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);
        expect(isLoading).toBe(false);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('movies$ should return the current list', async (done) => {
      try {
        store.dispatch(fromSearchActions.searchSuccess({
          movies: [createMovie('AAA'), createMovie('BBB')]
        }));

        let list = await readFirst(facade.movies$);
        let isLoaded = await readFirst(facade.moviesLoaded$);
        let isLoading = await readFirst(facade.moviesLoading$);
        let isError = await readFirst(facade.moviesError$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);
        expect(isLoading).toBe(false);
        expect(isError).toBe(null);

        store.dispatch(fromSearchActions.searchError({ error: 'AAA' }));

        list = await readFirst(facade.movies$);
        isLoaded = await readFirst(facade.moviesLoaded$);
        isLoading = await readFirst(facade.moviesLoading$);
        isError = await readFirst(facade.moviesError$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(false);
        expect(isLoading).toBe(false);
        expect(isError).toBe('AAA');

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
