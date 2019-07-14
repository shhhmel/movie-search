import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { take, filter, map, tap } from 'rxjs/operators';

import { MoviesFacade } from 'src/app/store';


@Injectable()
export class MovieDetailsResolver implements Resolve<boolean> {
  constructor(
    private moviesFacade: MoviesFacade,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    this.moviesFacade.getMovie(+route.paramMap.get('id'));
    return this.waitForMoviDetailsToLoad();
  }

  private waitForMoviDetailsToLoad(): Observable<boolean> {
    return combineLatest(
      this.moviesFacade.moviesLoaded$,
      this.moviesFacade.moviesLoading$,
      this.moviesFacade.moviesError$
    )
    .pipe(
      // Custom not found movie handler
      tap(([loaded, loading, error]) => error && this.router.navigate(['/404'])),
      filter(([loaded, loading, error]) => loaded && !loading && !error),
      map(([loaded]) => loaded),
      take(1)
    );
  }

}
