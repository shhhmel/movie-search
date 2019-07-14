import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

import { IMovie } from '../models/movie';
import { EGenre } from '../models/genre';
import { ESortBy } from '../models/sort-by';
import { IOption } from '../models/option';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  searchMovies(query: string): Observable<IMovie[]> {
    return this.http.get('/assets/db/db.json')
      .pipe(
        map((db: any) => db.movies),
        map((movies: IMovie[]) => this.filterByName(query, movies)),
        delay(this.getRandomDelay())
      );
  }

  getMovies(genre?: EGenre, sortBy?: ESortBy): Observable<IMovie[]> {
    return this.http.get('/assets/db/db.json')
      .pipe(
        map((db: any) => db.movies),
        map((movies: IMovie[]) => this.filterAndSortMovies(genre, sortBy, movies)),
        delay(this.getRandomDelay())
      );
  }

  getMovie(id: number): Observable<IMovie | null> {
    return this.http.get('/assets/db/db.json')
      .pipe(
        map((db: any) => db.movies),
        map((movies: IMovie[]) => this.getMovieById(id, movies)),
        delay(this.getRandomDelay())
      );
  }

  getGenres(): Observable<IOption[]> {
    return this.http.get('/assets/db/db.json')
      .pipe(
        map((db: any) => db.genres),
        delay(this.getRandomDelay())
      );
  }

  private filterAndSortMovies(genre: EGenre, sortBy: ESortBy, movies: IMovie[] ): IMovie[] {
    const filtered = this.filterByGenre(genre, movies);
    return this.sortBy(sortBy, filtered);
  }

  private filterByName(query: string, movies: IMovie[]): IMovie[] {
    return query ?
      movies.filter(movie =>
        movie.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      ) :
      movies;
  }

  private filterByGenre(genre: EGenre, movies: IMovie[]): IMovie[] {
    return genre ? movies.filter(movie => movie.genres.includes(genre)) : movies;
  }

  private sortBy(sortBy: ESortBy, movies: IMovie[]): IMovie[] {
    if (sortBy) {
      const [key, order] = sortBy.split(':');
      return movies.sort((a, b) => {
        if (order === 'asc') {
          return a[key] > b[key] ? 1 : a[key] === b[key] ? 0 : -1;
        } else {
          return a[key] < b[key] ? 1 : a[key] === b[key] ? 0 : -1;
        }
      });
    }
    return movies;
  }

  private getMovieById(id: number, movies: IMovie[]): IMovie | null {
    const filtered = movies.filter(movie => movie && movie.id === id);
    if (filtered.length) {
      return filtered[0];
    }
    // Custom movie not found handler
    throw new Error('Movie is not found');
  }

  private getRandomDelay(): number {
    return Math.floor(Math.random() * 400) + 100;
  }
}
