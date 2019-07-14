import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieDetailsRoutingModule } from './movie-details-routing.module';
import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';


@NgModule({
  declarations: [MovieDetailsPageComponent, MovieDetailsComponent],
  imports: [
    CommonModule,
    MovieDetailsRoutingModule,
    SharedModule
  ]
})
export class MovieDetailsModule { }
