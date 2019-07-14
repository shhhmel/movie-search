import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { MoviesFacade } from 'src/app/store';
import { IMovie } from 'src/app/models/movie';
import { IBreadcrumb } from 'src/app/models/breadcrumb';


@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsPageComponent implements OnInit {
  movie$: Observable<IMovie>;
  breadcrumbs$: Observable<IBreadcrumb[]>;

  constructor(private moviesFacade: MoviesFacade) { }

  ngOnInit() {
    // --- Initial data comes from a resolver ---
    this.movie$ = this.moviesFacade.selectedMovie$;
    this.breadcrumbs$ = this.moviesFacade.movieBreadcrumbs$;
  }
}
