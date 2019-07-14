import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenresFacadeMock {
  genres$ = of([]);
  genresLoading$ = of(false);
  genresLoaded$ = of(false);
  genresError$ = of({});

  getGenres(): void { }
}
