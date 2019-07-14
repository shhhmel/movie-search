import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IMovie } from 'src/app/models/movie';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieCardComponent {
  @Input() movie: IMovie;
}
