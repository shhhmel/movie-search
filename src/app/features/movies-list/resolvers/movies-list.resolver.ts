import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { take, filter, map } from 'rxjs/operators';

import { MoviesFacade, GenresFacade } from 'src/app/store';


@Injectable()
export class MoviesListResolver implements Resolve<boolean> {
  constructor(
    private moviesFacade: MoviesFacade,
    private genresFacade: GenresFacade
  ) { }

  resolve(): Observable<boolean> {
    this.initGenres();
    this.initMovies();

    return this.waitForAllDataToLoad();
  }

  private initGenres(): void {
    this.genresFacade.genres$
    .pipe(take(1))
    .subscribe(genres => !genres.length && this.genresFacade.getGenres());
  }

  private initMovies(): void {
    combineLatest(
      this.moviesFacade.moviesSlectedGenre$,
      this.moviesFacade.moviesSlectedOrder$,
    )
    .pipe(take(1))
    .subscribe(([genre, order]) => this.moviesFacade.getMovies(genre, order));
  }

  private waitForAllDataToLoad(): Observable<boolean> {
    return combineLatest(
      this.waitForGenresToLoad(),
      this.waitForMoviDetailsToLoad()
    )
    .pipe(
      filter(([genresLoaded, moviesLoaded]) => genresLoaded && moviesLoaded),
      map(([genresLoaded, moviesLoaded]) => genresLoaded && moviesLoaded),
      take(1)
    );
  }

  private waitForGenresToLoad(): Observable<boolean> {
    return combineLatest(
      this.genresFacade.genresLoaded$,
      this.genresFacade.genresLoading$,
      this.genresFacade.genresError$
    )
    .pipe(
      filter(([loaded, loading, error]) => loaded && !loading && !error),
      map(([loaded]) => loaded),
      take(1)
    );
  }

  private waitForMoviDetailsToLoad(): Observable<boolean> {
    return combineLatest(
      this.moviesFacade.moviesLoaded$,
      this.moviesFacade.moviesLoading$,
      this.moviesFacade.moviesError$
    )
    .pipe(
      filter(([loaded, loading, error]) => loaded && !loading && !error),
      map(([loaded]) => loaded),
      take(1)
    );
  }

}
