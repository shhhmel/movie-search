import { Injectable } from '@angular/core';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MoviesFacadeMock {
  movies$ = of([]);
  moviesLoading$ = of(false);
  moviesLoaded$ = of(false);
  moviesError$ = of({});
  moviesTotal$ = of(0);
  movie$ = of({});

  getMovies(): void { }

  getMovie(): void { }
}
