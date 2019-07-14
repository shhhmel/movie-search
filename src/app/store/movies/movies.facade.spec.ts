import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/nx';
import { readFirst } from '@nrwl/nx/testing';


import { fromMoviesActions } from './movies.actions';
import { MoviesEffects } from './movies.effects';
import { MoviesFacade } from './movies.facade';
import { MoviesState, moviesReducer } from './movies.reducers';
import { IMovie } from '../../models/movie';
import { EGenre } from 'src/app/models/genre';
import { ESortBy } from 'src/app/models/sort-by';


interface TestSchema {
  'movies': MoviesState;
}

describe('CarsFacade', () => {
  let facade: MoviesFacade;
  let store: Store<TestSchema>;
  let createMovie;

  beforeEach(() => {
    createMovie = (name: string, id: number) => (
      { name, id } as IMovie
    );
  });

  describe('used in NgModule', async () => {

    beforeEach(() => {
      @NgModule({
        imports: [
          HttpClientTestingModule,
          StoreModule.forFeature('movies', moviesReducer),
          EffectsModule.forFeature([MoviesEffects])
        ],
        providers: [MoviesFacade]
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
      facade = TestBed.get(MoviesFacade);
    });

    it('getMovies() should return empty list with loaded == false and loading == true', async (done) => {
      try {
        facade.getMovies();

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

    it('getMovie() should return empty with loaded == false and loading == true', async (done) => {
      try {
        facade.getMovie(1);

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

    it('"movies$" should return the current list', async (done) => {
      try {
        store.dispatch(fromMoviesActions.getMoviesSuccess({
          movies: [createMovie('AAA', 1)]
        }));

        let list = await readFirst(facade.movies$);
        let isLoaded = await readFirst(facade.moviesLoaded$);
        let isLoading = await readFirst(facade.moviesLoading$);
        let isError = await readFirst(facade.moviesError$);

        expect(list.length).toBe(1);
        expect(isLoaded).toBe(true);
        expect(isLoading).toBe(false);
        expect(isError).toBe(null);

        store.dispatch(fromMoviesActions.getMoviesError({ error: 'AAA' }));

        list = await readFirst(facade.movies$);
        isLoaded = await readFirst(facade.moviesLoaded$);
        isLoading = await readFirst(facade.moviesLoading$);
        isError = await readFirst(facade.moviesError$);

        expect(list.length).toBe(1);
        expect(isLoaded).toBe(false);
        expect(isLoading).toBe(false);
        expect(isError).toBe('AAA');

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('"breadcrumbs$" should return the current list', async (done) => {
      try {
        store.dispatch(fromMoviesActions.getMovieSuccess({ movie: createMovie('AAA', 1) }));

        const list = await readFirst(facade.movieBreadcrumbs$);

        expect(list).toEqual([
          { text: 'Films', url: '/movies', active: false },
          { text: 'AAA', url: null, active: true }
        ]);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('"filterValues$" should return the current genre and order', async (done) => {
      try {
        store.dispatch(fromMoviesActions.selectGenre({ genre: EGenre.Action }));
        store.dispatch(fromMoviesActions.selectOrder({ sortBy: ESortBy.NameAsc }));

        const values = await readFirst(facade.filterValues$);

        expect(values).toEqual({
          genre: EGenre.Action,
          order: ESortBy.NameAsc
        });

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
