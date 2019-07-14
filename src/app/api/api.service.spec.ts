import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { IMovie } from '../models/movie';
import { EGenre } from '../models/genre';
import { ESortBy } from '../models/sort-by';


describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  beforeEach(() => {
    service = TestBed.get(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('filterAndSortMovies() should return filtered and sorted list', () => {
    const movies = [
      { name: 'ABC', year: '2010', genres: [EGenre.Action, EGenre.Adventure] },
      { name: 'BCD', year: '2000', genres: [EGenre.Action, EGenre.Biography] },
      { name: 'CDE', year: '2020', genres: [EGenre.Comedy, EGenre.Adventure] }
    ] as IMovie[];
    const expected = [
      { name: 'ABC', year: '2010', genres: [EGenre.Action, EGenre.Adventure] },
      { name: 'BCD', year: '2000', genres: [EGenre.Action, EGenre.Biography] },
    ] as IMovie[];
    // tslint:disable-next-line
    expect(service['filterAndSortMovies'](EGenre.Action, ESortBy.NameAsc, movies)).toEqual(expected)
    // tslint:disable-next-line
    expect(service['filterAndSortMovies'](null, null, movies)).toEqual(movies)
  });

  it('filterByName() should return filtered list', () => {
    const movies = [
      { name: 'ABC' },
      { name: 'BCD' },
      { name: 'CDE' }
    ] as IMovie[];
    const expected = [{ name: 'ABC' }, { name: 'BCD' }] as IMovie[];
    // tslint:disable-next-line
    expect(service['filterByName']('B', movies)).toEqual(expected)
    // tslint:disable-next-line
    expect(service['filterByName']('', movies)).toEqual(movies)
  });

  it('filterByGenre() should return filtered list', () => {
    const movies = [
      { genres: [EGenre.Action, EGenre.Adventure] },
      { genres: [EGenre.Action, EGenre.Biography] },
      { genres: [EGenre.Comedy, EGenre.Adventure] }
    ] as IMovie[];
    const expected = [
      { genres: [EGenre.Action, EGenre.Adventure] },
      { genres: [EGenre.Action, EGenre.Biography] }
    ] as IMovie[];
    // tslint:disable-next-line
    expect(service['filterByGenre'](EGenre.Action, movies)).toEqual(expected)
    // tslint:disable-next-line
    expect(service['filterByName'](undefined, movies)).toEqual(movies)
  });

  it('sortBy() should return sorted list', () => {
    const movies = [
      { name: 'CCC', year: '2010' },
      { name: 'BBB', year: '2000'  },
      { name: 'AAA', year: '2020' }
    ] as IMovie[];
    let expected = [
      { name: 'AAA', year: '2020' },
      { name: 'BBB', year: '2000'  },
      { name: 'CCC', year: '2010' }
    ] as IMovie[];

    // tslint:disable-next-line
    expect(service['sortBy'](undefined, movies)).toEqual(movies)
    // tslint:disable-next-line
    expect(service['sortBy'](ESortBy.NameAsc, movies)).toEqual(expected)

    expected = [
      { name: 'AAA', year: '2020' },
      { name: 'CCC', year: '2010' },
      { name: 'BBB', year: '2000'  }
    ] as IMovie[];

    // tslint:disable-next-line
    expect(service['sortBy'](ESortBy.YearDesc, movies)).toEqual(expected)
  });

  it('getMovieById() should return movie', () => {
    const movies = [
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ] as IMovie[];
    // tslint:disable-next-line
    expect(service['getMovieById'](1, movies)).toEqual({ id: 1 } as IMovie)
    // tslint:disable-next-line
    expect(() => service['getMovieById'](4, movies)).toThrowError('Movie is not found')
  });
});
