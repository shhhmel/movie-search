import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { GenresPipe } from './pipes/genres.pipe';


@NgModule({
  declarations: [SearchBoxComponent, BreadcrumbsComponent, GenresPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [SearchBoxComponent, BreadcrumbsComponent, GenresPipe]
})
export class SharedModule { }
