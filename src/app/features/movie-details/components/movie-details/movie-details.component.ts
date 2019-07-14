import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { IMovie } from 'src/app/models/movie';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailsComponent {
  @Input() movie: IMovie;
}
