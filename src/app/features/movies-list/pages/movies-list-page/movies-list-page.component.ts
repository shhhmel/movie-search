import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { IMovie } from '../../../../models/movie';
import { MoviesFacade } from 'src/app/store';
import { IFilterValues } from 'src/app/models/filter-values';
import { IFilterOptions } from 'src/app/models/filter-options';


@Component({
  selector: 'app-movies-list-page',
  templateUrl: './movies-list-page.component.html',
  styleUrls: ['./movies-list-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListPageComponent implements OnInit {
  filterOptions$: Observable<IFilterOptions>;
  filterValues$: Observable<IFilterValues>;
  movies$: Observable<IMovie[]>;

  constructor(private moviesFacade: MoviesFacade) { }

  ngOnInit() {
    // --- Initial data comes from a resolver ---
    this.initSubscribtions();
  }

  onFilterChange({ genre, order }: IFilterValues): void {
    this.moviesFacade.getMovies(genre, order);
  }

  private initSubscribtions(): void {
    this.movies$ = this.moviesFacade.movies$;
    this.filterOptions$ = this.moviesFacade.filterOptions$;
    this.filterValues$ = this.moviesFacade.filterValues$;
  }
}
