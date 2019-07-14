import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { SearchFacade } from 'src/app/store';
import { IMovie } from 'src/app/models/movie';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  movies$: Observable<IMovie[]>;

  constructor(private searchFacade: SearchFacade) { }

  ngOnInit() {
    this.movies$ = this.searchFacade.movies$;
  }

  onQueryChange(query: string): void {
    query ? this.searchFacade.search(query) : this.searchFacade.clearSearch();
  }
}
