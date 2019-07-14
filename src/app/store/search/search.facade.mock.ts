import { Injectable } from '@angular/core';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchFacadeMock {
  movies$ = of([]);
  moviesLoading$ = of(false);
  moviesLoaded$ = of(false);
  moviesError$ = of({});

  search(query: string): void { }

  clearSearch(): void { }
}
