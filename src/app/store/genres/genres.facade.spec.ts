import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/nx';
import { readFirst } from '@nrwl/nx/testing';

import { fromGenresActions } from './genres.actions';
import { GenresEffects } from './genres.effects';
import { GenresFacade } from './genres.facade';
import { GenresState, genresReducer } from './genres.reducers';
import { IOption } from '../../models/option';


interface TestSchema {
  'genres': GenresState;
}

describe('GenresFacade', () => {
  let facade: GenresFacade;
  let store: Store<TestSchema>;
  let createGenre;

  beforeEach(() => {
    createGenre = (label: string) => ({ label } as IOption);
  });

  describe('used in NgModule', async () => {

    beforeEach(() => {
      @NgModule({
        imports: [
          HttpClientTestingModule,
          StoreModule.forFeature('genres', genresReducer),
          EffectsModule.forFeature([GenresEffects])
        ],
        providers: [GenresFacade]
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
      facade = TestBed.get(GenresFacade);
    });

    it('getGenres() should return empty list with loaded == false and loading == true', async (done) => {
      try {
        facade.getGenres();

        const list = await readFirst(facade.genres$);
        const isLoaded = await readFirst(facade.genresLoaded$);
        const isLoading = await readFirst(facade.genresLoading$);
        const isError = await readFirst(facade.genresError$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);
        expect(isLoading).toBe(true);
        expect(isError).toBe(null);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('genres$ should return the current list', async (done) => {
      try {
        store.dispatch(fromGenresActions.getGenresSuccess({
          genres: [createGenre('AAA'), createGenre('BBB')]
        }));

        let list = await readFirst(facade.genres$);
        let isLoaded = await readFirst(facade.genresLoaded$);
        let isLoading = await readFirst(facade.genresLoading$);
        let isError = await readFirst(facade.genresError$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);
        expect(isLoading).toBe(false);
        expect(isError).toBe(null);

        store.dispatch(fromGenresActions.getGenresError({ error: 'AAA' }));

        list = await readFirst(facade.genres$);
        isLoaded = await readFirst(facade.genresLoaded$);
        isLoading = await readFirst(facade.genresLoading$);
        isError = await readFirst(facade.genresError$);

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
